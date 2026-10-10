// Leaflet Map JavaScript Interop for Spatial Dashboard
let spatialMap = null;
let markers = [];
let polygons = [];

window.initializeLeafletMap = function (mapId, centerLat, centerLng, zoom) {
    try {
        // Remove existing map if it exists
        if (spatialMap) {
            spatialMap.remove();
            markers = [];
            polygons = [];
        }

        // Initialize the map
        spatialMap = L.map(mapId).setView([centerLat, centerLng], zoom);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
        }).addTo(spatialMap);

        console.log('Leaflet map initialized successfully');
        return true;
    } catch (error) {
        console.error('Error initializing Leaflet map:', error);
        return false;
    }
};

window.addLeafletMarker = function (lat, lng, title, iconColor = 'blue') {
    try {
        if (!spatialMap) {
            console.error('Map not initialized');
            return false;
        }

        // Create custom icon based on color
        let markerIcon = L.icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        // Create marker with popup
        let marker = L.marker([lat, lng], { icon: markerIcon })
            .bindPopup(`<b>${title}</b>`)
            .addTo(spatialMap);

        markers.push(marker);
        return true;
    } catch (error) {
        console.error('Error adding marker:', error);
        return false;
    }
};

window.addLeafletPolygon = function (paths, color = '#3388ff', fillColor = '#3388ff', fillOpacity = 0.2) {
    try {
        if (!spatialMap) {
            console.error('Map not initialized');
            return false;
        }

        // Convert paths to Leaflet format
        let latLngs = paths.map(p => [p.lat, p.lng]);

        // Create polygon
        let polygon = L.polygon(latLngs, {
            color: color,
            fillColor: fillColor,
            fillOpacity: fillOpacity,
            weight: 2
        }).addTo(spatialMap);

        polygons.push(polygon);
        return true;
    } catch (error) {
        console.error('Error adding polygon:', error);
        return false;
    }
};

window.addLeafletCircle = function (lat, lng, radius, color = '#3388ff', title = '') {
    try {
        if (!spatialMap) {
            console.error('Map not initialized');
            return false;
        }

        let circle = L.circle([lat, lng], {
            color: color,
            fillColor: color,
            fillOpacity: 0.3,
            radius: radius
        }).addTo(spatialMap);

        if (title) {
            circle.bindPopup(`<b>${title}</b><br>Radius: ${radius}m`);
        }

        return true;
    } catch (error) {
        console.error('Error adding circle:', error);
        return false;
    }
};

window.clearLeafletMarkers = function () {
    try {
        markers.forEach(marker => spatialMap.removeLayer(marker));
        markers = [];
        return true;
    } catch (error) {
        console.error('Error clearing markers:', error);
        return false;
    }
};

window.clearLeafletPolygons = function () {
    try {
        polygons.forEach(polygon => spatialMap.removeLayer(polygon));
        polygons = [];
        return true;
    } catch (error) {
        console.error('Error clearing polygons:', error);
        return false;
    }
};

window.fitMapToBounds = function (bounds) {
    try {
        if (!spatialMap) {
            console.error('Map not initialized');
            return false;
        }

        // bounds should be [[southLat, westLng], [northLat, eastLng]]
        spatialMap.fitBounds(bounds);
        return true;
    } catch (error) {
        console.error('Error fitting bounds:', error);
        return false;
    }
};

window.setMapView = function (lat, lng, zoom) {
    try {
        if (!spatialMap) {
            console.error('Map not initialized');
            return false;
        }

        spatialMap.setView([lat, lng], zoom);
        return true;
    } catch (error) {
        console.error('Error setting map view:', error);
        return false;
    }
};

window.destroyLeafletMap = function () {
    try {
        if (spatialMap) {
            spatialMap.remove();
            spatialMap = null;
            markers = [];
            polygons = [];
        }
        return true;
    } catch (error) {
        console.error('Error destroying map:', error);
        return false;
    }
};

// Add heat map layer support
window.addLeafletHeatmap = function (points, options = {}) {
    try {
        if (!spatialMap) {
            console.error('Map not initialized');
            return false;
        }

        // Points should be array of [lat, lng, intensity]
        if (typeof L.heatLayer !== 'undefined') {
            let heat = L.heatLayer(points, {
                radius: options.radius || 25,
                blur: options.blur || 15,
                maxZoom: options.maxZoom || 17,
                ...options
            }).addTo(spatialMap);
            
            return true;
        } else {
            console.warn('Leaflet.heat plugin not loaded');
            return false;
        }
    } catch (error) {
        console.error('Error adding heatmap:', error);
        return false;
    }
};
