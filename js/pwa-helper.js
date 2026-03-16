// PWA Helper - Service Worker Registration and Installation
// Handles PWA installation, updates, and push notifications

(function () {
    'use strict';

    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
        console.log('[PWA] Service Workers not supported');
        return;
    }

    // PWA Configuration
    const PWA_CONFIG = {
        serviceWorkerUrl: '/service-worker.js',
        scope: '/',
        updateCheckInterval: 60000 // Check for updates every minute
    };

    // State management
    let deferredInstallPrompt = null;
    let isInstalled = false;
    let registration = null;

    // Initialize PWA on page load
    window.addEventListener('load', () => {
        initializePWA();
    });

    // Initialize PWA functionality
    function initializePWA() {
        console.log('[PWA] Initializing...');

        // Register service worker
        registerServiceWorker();

        // Set up install prompt
        setupInstallPrompt();

        // Check if already installed
        checkIfInstalled();

        // Set up push notifications (if supported)
        setupPushNotifications();

        // Set up background sync (if supported)
        setupBackgroundSync();

        // Add connection status listeners
        setupConnectionListeners();

        // Expose PWA API to Blazor
        exposePWAApi();
    }

    // Register Service Worker
    async function registerServiceWorker() {
        try {
            registration = await navigator.serviceWorker.register(
                PWA_CONFIG.serviceWorkerUrl,
                { scope: PWA_CONFIG.scope }
            );

            console.log('[PWA] Service Worker registered:', registration);

            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                console.log('[PWA] New service worker found');

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log('[PWA] New version available');
                        notifyUpdate();
                    }
                });
            });

            // Periodic update check
            setInterval(() => {
                registration.update();
            }, PWA_CONFIG.updateCheckInterval);

        } catch (error) {
            console.error('[PWA] Service Worker registration failed:', error);
        }
    }

    // Set up install prompt
    function setupInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('[PWA] Install prompt available');
            
            // Prevent the default prompt
            e.preventDefault();
            
            // Store the event for later use
            deferredInstallPrompt = e;
            
            // Show custom install UI
            showInstallPrompt();
        });

        // Listen for app installed event
        window.addEventListener('appinstalled', () => {
            console.log('[PWA] App installed successfully');
            isInstalled = true;
            deferredInstallPrompt = null;
            hideInstallPrompt();
        });
    }

    // Show install prompt UI
    function showInstallPrompt() {
        // Create and show install banner
        const banner = createInstallBanner();
        document.body.appendChild(banner);
    }

    // Hide install prompt UI
    function hideInstallPrompt() {
        const banner = document.getElementById('pwa-install-banner');
        if (banner) {
            banner.remove();
        }
    }

    // Create install banner HTML
    function createInstallBanner() {
        const banner = document.createElement('div');
        banner.id = 'pwa-install-banner';
        banner.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px 24px;
            border-radius: 50px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            gap: 16px;
            z-index: 10000;
            animation: slideUp 0.3s ease;
            max-width: 90%;
        `;

        banner.innerHTML = `
            <style>
                @keyframes slideUp {
                    from {
                        transform: translateX(-50%) translateY(100px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }
                }
            </style>
            <span style="flex: 1; font-weight: 600;">Install Council App for quick access</span>
            <button id="pwa-install-button" style="
                background: white;
                color: #667eea;
                border: none;
                padding: 8px 20px;
                border-radius: 20px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            ">Install</button>
            <button id="pwa-dismiss-button" style="
                background: transparent;
                color: white;
                border: 1px solid white;
                padding: 8px 16px;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.2s;
            ">Later</button>
        `;

        // Install button handler
        banner.querySelector('#pwa-install-button').addEventListener('click', async () => {
            if (deferredInstallPrompt) {
                deferredInstallPrompt.prompt();
                const { outcome } = await deferredInstallPrompt.userChoice;
                console.log('[PWA] User choice:', outcome);
                deferredInstallPrompt = null;
            }
            banner.remove();
        });

        // Dismiss button handler
        banner.querySelector('#pwa-dismiss-button').addEventListener('click', () => {
            banner.remove();
            // Don't show again for 7 days
            localStorage.setItem('pwa-install-dismissed', Date.now() + (7 * 24 * 60 * 60 * 1000));
        });

        // Check if user dismissed recently
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (dismissed && Date.now() < parseInt(dismissed)) {
            return document.createElement('div'); // Return empty div
        }

        return banner;
    }

    // Check if app is installed
    function checkIfInstalled() {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('[PWA] App is running in standalone mode');
            isInstalled = true;
        } else if (window.navigator.standalone === true) {
            console.log('[PWA] App is running in iOS standalone mode');
            isInstalled = true;
        }
    }

    // Set up push notifications
    async function setupPushNotifications() {
        if (!('PushManager' in window)) {
            console.log('[PWA] Push notifications not supported');
            return;
        }

        if (!('Notification' in window)) {
            console.log('[PWA] Notifications not supported');
            return;
        }

        console.log('[PWA] Push notifications available');
    }

    // Request notification permission
    async function requestNotificationPermission() {
        if (!('Notification' in window)) {
            return 'unsupported';
        }

        if (Notification.permission === 'granted') {
            return 'granted';
        }

        if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            return permission;
        }

        return Notification.permission;
    }

    // Subscribe to push notifications
    async function subscribeToPushNotifications(vapidPublicKey) {
        try {
            if (!registration) {
                throw new Error('Service worker not registered');
            }

            const permission = await requestNotificationPermission();
            if (permission !== 'granted') {
                throw new Error('Notification permission denied');
            }

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
            });

            console.log('[PWA] Push subscription:', subscription);
            return subscription;
        } catch (error) {
            console.error('[PWA] Push subscription failed:', error);
            throw error;
        }
    }

    // Convert VAPID key
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    // Set up background sync
    function setupBackgroundSync() {
        if (!('sync' in registration)) {
            console.log('[PWA] Background sync not supported');
            return;
        }

        console.log('[PWA] Background sync available');
    }

    // Request background sync
    async function requestBackgroundSync(tag) {
        try {
            if (!registration || !('sync' in registration)) {
                throw new Error('Background sync not available');
            }

            // Additional safety check for sync.register method
            if (!registration.sync || typeof registration.sync.register !== 'function') {
                throw new Error('Background sync register method not available');
            }

            await registration.sync.register(tag);
            console.log('[PWA] Background sync registered:', tag);
        } catch (error) {
            console.error('[PWA] Background sync failed:', error);
            throw error;
        }
    }

    // Set up connection listeners
    function setupConnectionListeners() {
        window.addEventListener('online', () => {
            console.log('[PWA] Connection restored');
            notifyConnectionStatus(true);
        });

        window.addEventListener('offline', () => {
            console.log('[PWA] Connection lost');
            notifyConnectionStatus(false);
        });
    }

    // Notify connection status change
    function notifyConnectionStatus(isOnline) {
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('pwa-connection-change', {
            detail: { isOnline }
        }));

        // Show notification banner
        showConnectionBanner(isOnline);
    }

    // Show connection status banner
    function showConnectionBanner(isOnline) {
        const banner = document.createElement('div');
        banner.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            ${isOnline 
                ? 'background: #10b981;' 
                : 'background: #ef4444;'
            }
        `;

        banner.innerHTML = `
            <style>
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            </style>
            ${isOnline ? '✓ Back Online' : '⚠ You are offline'}
        `;

        document.body.appendChild(banner);

        setTimeout(() => {
            banner.remove();
        }, 3000);
    }

    // Notify about available update
    function notifyUpdate() {
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('pwa-update-available'));

        // Show update banner
        showUpdateBanner();
    }

    // Show update banner
    function showUpdateBanner() {
        const banner = document.createElement('div');
        banner.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #3b82f6;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 16px;
            z-index: 10000;
            max-width: 90%;
        `;

        banner.innerHTML = `
            <span>A new version is available!</span>
            <button id="pwa-update-button" style="
                background: white;
                color: #3b82f6;
                border: none;
                padding: 8px 20px;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
            ">Update Now</button>
        `;

        banner.querySelector('#pwa-update-button').addEventListener('click', () => {
            if (registration && registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
            }
        });

        document.body.appendChild(banner);
    }

    // Expose PWA API to Blazor
    function exposePWAApi() {
        window.PWA = {
            isSupported: 'serviceWorker' in navigator,
            isInstalled: () => isInstalled,
            install: async () => {
                if (deferredInstallPrompt) {
                    deferredInstallPrompt.prompt();
                    const { outcome } = await deferredInstallPrompt.userChoice;
                    deferredInstallPrompt = null;
                    return outcome === 'accepted';
                }
                return false;
            },
            requestNotificationPermission: requestNotificationPermission,
            subscribeToPush: subscribeToPushNotifications,
            requestBackgroundSync: requestBackgroundSync,
            isOnline: () => navigator.onLine,
            getRegistration: () => registration,
            clearCache: async () => {
                if (registration && registration.active) {
                    registration.active.postMessage({ type: 'CLEAR_CACHE' });
                }
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
            }
        };

        console.log('[PWA] API exposed to window.PWA');
    }

    console.log('[PWA] Helper loaded');
})();
