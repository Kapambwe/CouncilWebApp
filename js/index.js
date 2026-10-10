(function () {
    var cacheResetKey = 'council-cache-reset-20260614-asset-paths';

    if (sessionStorage.getItem(cacheResetKey) === '1') {
        return;
    }

    if (!('serviceWorker' in navigator) && !('caches' in window)) {
        sessionStorage.setItem(cacheResetKey, '1');
        return;
    }

    window.stop();

    Promise.all([
        'serviceWorker' in navigator
            ? navigator.serviceWorker.getRegistrations().then(function (registrations) {
                return Promise.all(registrations.map(function (registration) {
                    return registration.unregister();
                }));
            })
            : Promise.resolve(),
        'caches' in window
            ? caches.keys().then(function (cacheNames) {
                return Promise.all(cacheNames
                    .filter(function (name) {
                        return name.indexOf('council-app') === 0 || name.indexOf('blazor') >= 0;
                    })
                    .map(function (name) {
                        return caches.delete(name);
                    }));
            })
            : Promise.resolve()
    ]).finally(function () {
        sessionStorage.setItem(cacheResetKey, '1');
        window.location.reload();
    });
})();

(function () {
    window.addEventListener('load', function () {
        setTimeout(function () {
            try {
                var perfData = performance.getEntriesByType('resource');
                var dllFiles = perfData.filter(function (resource) {
                    return resource.name.includes('.dll') || resource.name.includes('.wasm');
                });
                var jsFiles = perfData.filter(function (resource) {
                    return resource.name.includes('.js') && !resource.name.includes('_framework');
                });

                var totalDllSize = dllFiles.reduce(function (sum, resource) {
                    return sum + (resource.transferSize || 0);
                }, 0);
                var totalJsSize = jsFiles.reduce(function (sum, resource) {
                    return sum + (resource.transferSize || 0);
                }, 0);
                var totalSize = totalDllSize + totalJsSize;

                console.log('CouncilWebApp Performance Metrics');
                console.log('DLLs loaded:', dllFiles.length);
                console.log('Total DLL size:', (totalDllSize / 1024 / 1024).toFixed(2), 'MB');
                console.log('Total JS size:', (totalJsSize / 1024 / 1024).toFixed(2), 'MB');
                console.log('Total download:', (totalSize / 1024 / 1024).toFixed(2), 'MB');

                var navTiming = performance.getEntriesByType('navigation')[0];
                if (navTiming) {
                    console.log('Page Load Time:', (navTiming.loadEventEnd - navTiming.fetchStart).toFixed(0), 'ms');
                    console.log('DOM Content Loaded:', (navTiming.domContentLoadedEventEnd - navTiming.fetchStart).toFixed(0), 'ms');
                    console.log('Time to Interactive:', (navTiming.domInteractive - navTiming.fetchStart).toFixed(0), 'ms');
                }

                window.councilWebAppMetrics = {
                    dllCount: dllFiles.length,
                    dllSizeMB: totalDllSize / 1024 / 1024,
                    jsSizeMB: totalJsSize / 1024 / 1024,
                    totalSizeMB: totalSize / 1024 / 1024,
                    loadTimeMs: navTiming ? (navTiming.loadEventEnd - navTiming.fetchStart) : 0,
                    timestamp: new Date().toISOString()
                };
            } catch (err) {
                console.error('Error collecting performance metrics:', err);
            }
        }, 2000);
    });

    window.trackFeatureAccess = function (featureName) {
        if (!window.featureAccessLog) {
            window.featureAccessLog = [];
        }

        var access = {
            feature: featureName,
            timestamp: new Date().toISOString(),
            url: window.location.pathname
        };

        window.featureAccessLog.push(access);
        console.log('Feature Loaded: ' + featureName, access);
    };
})();

(function () {
    var params = new URLSearchParams(window.location.search);
    var path = params.get('path');

    if (path) {
        window.history.replaceState(null, '', '/CouncilWebApp' + decodeURIComponent(path));
    }
})();

(function () {
    var isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

    if (!isLocalhost || !('serviceWorker' in navigator) || !('caches' in window)) {
        return;
    }

    window.addEventListener('load', async function () {
        try {
            var registrations = await navigator.serviceWorker.getRegistrations();
            for (var registration of registrations) {
                await registration.unregister();
            }

            var cacheNames = await caches.keys();
            var councilCaches = cacheNames.filter(function (name) {
                return name.startsWith('council-app');
            });
            await Promise.all(councilCaches.map(function (name) {
                return caches.delete(name);
            }));

            if (sessionStorage.getItem('council-sw-reset') !== '1') {
                sessionStorage.setItem('council-sw-reset', '1');
                window.location.reload();
            }
        } catch (error) {
            console.warn('Failed to reset local service worker caches', error);
        }
    });
})();
