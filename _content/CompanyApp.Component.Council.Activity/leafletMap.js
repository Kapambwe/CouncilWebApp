// Leaflet Map Integration for Customary Land Management
let map = null;
let markers = [];
let parcels = [];
let chiefdomBoundaries = [];

export function initializeMap(elementId, latitude, longitude, zoom) {
    try {
        // Initialize the map
        map = L.map(elementId).setView([latitude, longitude], zoom);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // Add scale control
        L.control.scale().addTo(map);

        return true;
    } catch (error) {
        console.error('Error initializing map:', error);
        return false;
    }
}

export function addMarker(lat, lng, title, popupContent, color = 'blue') {
    if (!map) return null;

    try {
        const marker = L.marker([lat, lng], {
            title: title,
            icon: createColoredIcon(color)
        }).addTo(map);

        if (popupContent) {
            marker.bindPopup(popupContent);
        }

        markers.push(marker);
        return markers.length - 1; // Return marker index
    } catch (error) {
        console.error('Error adding marker:', error);
        return null;
    }
}

export function addParcel(coordinates, properties) {
    if (!map) return null;

    try {
        // Coordinates should be array of [lat, lng] pairs
        const polygon = L.polygon(coordinates, {
            color: properties.borderColor || '#3388ff',
            fillColor: properties.fillColor || '#3388ff',
            fillOpacity: properties.fillOpacity || 0.4,
            weight: properties.weight || 2
        }).addTo(map);

        // Add popup with parcel information
        if (properties.popupContent) {
            polygon.bindPopup(properties.popupContent);
        }

        // Add click event
        polygon.on('click', function(e) {
            if (window.dotnetReference) {
                window.dotnetReference.invokeMethodAsync('OnParcelClicked', properties.id);
            }
        });

        parcels.push(polygon);
        return parcels.length - 1;
    } catch (error) {
        console.error('Error adding parcel:', error);
        return null;
    }
}

export function addChiefdomBoundary(coordinates, chiefdomName, color = '#ff7800') {
    if (!map) return null;

    try {
        const boundary = L.polygon(coordinates, {
            color: color,
            fillColor: color,
            fillOpacity: 0.1,
            weight: 3,
            dashArray: '10, 10'
        }).addTo(map);

        boundary.bindPopup(`<strong>${chiefdomName}</strong><br>Chiefdom Boundary`);

        chiefdomBoundaries.push(boundary);
        return chiefdomBoundaries.length - 1;
    } catch (error) {
        console.error('Error adding chiefdom boundary:', error);
        return null;
    }
}

export function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}

export function clearParcels() {
    parcels.forEach(parcel => map.removeLayer(parcel));
    parcels = [];
}

export function clearChiefdomBoundaries() {
    chiefdomBoundaries.forEach(boundary => map.removeLayer(boundary));
    chiefdomBoundaries = [];
}

export function clearAll() {
    clearMarkers();
    clearParcels();
    clearChiefdomBoundaries();
}

export function fitBounds(latLngBounds) {
    if (!map) return;

    try {
        // latLngBounds should be [[south, west], [north, east]]
        map.fitBounds(latLngBounds);
    } catch (error) {
        console.error('Error fitting bounds:', error);
    }
}

export function setView(lat, lng, zoom) {
    if (!map) return;

    try {
        map.setView([lat, lng], zoom);
    } catch (error) {
        console.error('Error setting view:', error);
    }
}

export function setDotNetReference(dotnetRef) {
    window.dotnetReference = dotnetRef;
}

function createColoredIcon(color) {
    const markerHtmlStyles = `
        background-color: ${getIconColor(color)};
        width: 2rem;
        height: 2rem;
        display: block;
        left: -1rem;
        top: -1rem;
        position: relative;
        border-radius: 2rem 2rem 0;
        transform: rotate(45deg);
        border: 1px solid #FFFFFF`;

    return L.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 24],
        popupAnchor: [0, -36],
        html: `<span style="${markerHtmlStyles}" />`
    });
}

function getIconColor(colorName) {
    const colors = {
        'blue': '#3b82f6',
        'red': '#ef4444',
        'green': '#10b981',
        'yellow': '#f59e0b',
        'purple': '#8b5cf6',
        'orange': '#f97316',
        'pink': '#ec4899',
        'teal': '#14b8a6'
    };
    return colors[colorName] || colors['blue'];
}

export function disposeMap() {
    if (map) {
        clearAll();
        map.remove();
        map = null;
    }
}
