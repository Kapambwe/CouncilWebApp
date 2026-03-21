// Leaflet Map Wrapper for Blazor Interop
let map = null;
let drawnItems = null;
let drawControl = null;
let miniMapControl = null;
let layerGroup = null;

// Create a map
export function createMap(elementId, lat, lng, zoom) {
    if (map) {
        map.remove();
    }
    
    map = L.map(elementId).setView([lat, lng], zoom);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    layerGroup = L.layerGroup().addTo(map);
}

// Setup map click handler
export function setupMapClick(dotNetReference) {
    if (!map) {
        console.error('Map not initialized');
        return;
    }
    
    map.on('click', function(e) {
        dotNetReference.invokeMethodAsync('OnMapClicked', e.latlng.lat, e.latlng.lng);
    });
}

// Add a marker
export function addMarker(lat, lng, popupText = null) {
    if (!map) {
        console.error('Map not initialized');
        return;
    }
    
    const marker = L.marker([lat, lng]);
    
    if (popupText) {
        marker.bindPopup(popupText);
    }
    
    marker.addTo(layerGroup);
}

// Add a circle
export function addCircle(lat, lng, radius, options = {}) {
    if (!map) {
        console.error('Map not initialized');
        return;
    }
    
    const defaultOptions = {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    };
    
    const circle = L.circle([lat, lng], {
        ...defaultOptions,
        ...options,
        radius: radius
    });
    
    circle.addTo(layerGroup);
}

// Add a polygon
export function addPolygon(latLngs, options = {}) {
    if (!map) {
        console.error('Map not initialized');
        return;
    }
    
    const defaultOptions = {
        color: 'blue',
        fillColor: '#30f',
        fillOpacity: 0.5
    };
    
    const polygon = L.polygon(latLngs, {
        ...defaultOptions,
        ...options
    });
    
    polygon.addTo(layerGroup);
}

// Add a polyline
export function addPolyline(latLngs, options = {}) {
    if (!map) {
        console.error('Map not initialized');
        return;
    }
    
    const defaultOptions = {
        color: 'green',
        weight: 3,
        opacity: 0.7
    };
    
    const polyline = L.polyline(latLngs, {
        ...defaultOptions,
        ...options
    });
    
    polyline.addTo(layerGroup);
}

// Add GeoJSON data
export function addGeoJson(geoJsonData, options = {}) {
    if (!map) {
        console.error('Map not initialized');
        return;
    }
    
    const geoJsonLayer = L.geoJSON(geoJsonData, options);
    geoJsonLayer.addTo(layerGroup);
}

// Add GeoJSON with popup
export function addGeoJsonWithPopup(geoJsonData, options = {}) {
    if (!map) {
        console.error('Map not initialized');
        return;
    }
    
    const defaultOptions = {
        onEachFeature: function (feature, layer) {
            if (feature.properties) {
                let popupContent = '<div>';
                for (const [key, value] of Object.entries(feature.properties)) {
                    popupContent += `<strong>${key}:</strong> ${value}<br>`;
                }
                popupContent += '</div>';
                layer.bindPopup(popupContent);
            }
        }
    };
    
    const geoJsonLayer = L.geoJSON(geoJsonData, {
        ...defaultOptions,
        ...options
    });
    
    geoJsonLayer.addTo(layerGroup);
}

// Initialize drawing tools
export function initDrawTools(lineColor = '#3388ff', fillColor = '#3388ff', lineWeight = 2) {
    if (!map) {
        console.error('Map not initialized');
        return;
    }
    
    // Initialize drawn items layer if not exists
    if (!drawnItems) {
        drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);
    }
    
    // Remove existing draw control if present
    if (drawControl) {
        map.removeControl(drawControl);
    }
    
    // Create draw control
    drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems,
            poly: {
                allowIntersection: false
            }
        },
        draw: {
            polygon: {
                allowIntersection: false,
                showArea: true,
                shapeOptions: {
                    color: lineColor,
                    fillColor: fillColor,
                    weight: lineWeight
                }
            },
            polyline: {
                shapeOptions: {
                    color: lineColor,
                    weight: lineWeight
                }
            },
            circle: {
                shapeOptions: {
                    color: lineColor,
                    fillColor: fillColor,
                    weight: lineWeight
                }
            },
            rectangle: {
                shapeOptions: {
                    color: lineColor,
                    fillColor: fillColor,
                    weight: lineWeight
                }
            },
            marker: true,
            circlemarker: false
        }
    });
    
    map.addControl(drawControl);
    
    // Setup event handlers
    map.on(L.Draw.Event.CREATED, function (event) {
        const layer = event.layer;
        drawnItems.addLayer(layer);
    });
}

// Advanced initialization with custom options
export function initDrawToolsAdvanced(options) {
    if (!map) {
        console.error('Map not initialized');
        return;
    }
    
    if (!drawnItems) {
        drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);
    }
    
    if (drawControl) {
        map.removeControl(drawControl);
    }
    
    drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        },
        draw: options
    });
    
    map.addControl(drawControl);
    
    map.on(L.Draw.Event.CREATED, function (event) {
        const layer = event.layer;
        drawnItems.addLayer(layer);
    });
}

// Update draw tools style
export function updateDrawToolsStyle(lineColor, fillColor, lineWeight, fillOpacity = 0.2) {
    if (!map || !drawControl) {
        console.error('Map or draw control not initialized');
        return;
    }
    
    // Remove and recreate with new styles
    map.removeControl(drawControl);
    
    drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        },
        draw: {
            polygon: {
                shapeOptions: {
                    color: lineColor,
                    fillColor: fillColor,
                    weight: lineWeight,
                    fillOpacity: fillOpacity
                }
            },
            polyline: {
                shapeOptions: {
                    color: lineColor,
                    weight: lineWeight
                }
            },
            circle: {
                shapeOptions: {
                    color: lineColor,
                    fillColor: fillColor,
                    weight: lineWeight,
                    fillOpacity: fillOpacity
                }
            },
            rectangle: {
                shapeOptions: {
                    color: lineColor,
                    fillColor: fillColor,
                    weight: lineWeight,
                    fillOpacity: fillOpacity
                }
            }
        }
    });
    
    map.addControl(drawControl);
}

// Add minimap
export function addMiniMap(miniMapLayerUrl = null, options = {}) {
    if (!map) {
        console.error('Map not initialized');
        return;
    }
    
    if (miniMapControl) {
        map.removeControl(miniMapControl);
    }
    
    const layerUrl = miniMapLayerUrl || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const miniMapLayer = L.tileLayer(layerUrl);
    
    const defaultOptions = {
        toggleDisplay: true,
        minimized: false,
        position: 'bottomright'
    };
    
    miniMapControl = new L.Control.MiniMap(miniMapLayer, {
        ...defaultOptions,
        ...options
    });
    
    miniMapControl.addTo(map);
}

// Remove minimap
export function removeMiniMap() {
    if (miniMapControl && map) {
        map.removeControl(miniMapControl);
        miniMapControl = null;
    }
}

// Toggle minimap
export function toggleMiniMap() {
    if (miniMapControl) {
        miniMapControl.toggle();
    }
}

// Enable drawing
export function enableDrawing() {
    if (!map || !drawControl) {
        console.error('Map or draw control not initialized');
        return;
    }
    
    drawControl.addTo(map);
}

// Disable drawing
export function disableDrawing() {
    if (!map || !drawControl) {
        return;
    }
    
    map.removeControl(drawControl);
}

// Clear all drawn items
export function clearAllDrawn() {
    if (drawnItems) {
        drawnItems.clearLayers();
    }
}

// Get drawn items as GeoJSON
export function getDrawnGeoJson() {
    if (!drawnItems) {
        return null;
    }
    
    return JSON.stringify(drawnItems.toGeoJSON());
}

// Add drawn items from GeoJSON
export function addDrawnFromGeoJson(geoJsonData) {
    if (!map || !drawnItems) {
        console.error('Map or drawn items not initialized');
        return;
    }
    
    const geoJsonLayer = L.geoJSON(geoJsonData);
    geoJsonLayer.eachLayer(function (layer) {
        drawnItems.addLayer(layer);
    });
}

// Clear the map (except base tiles)
export function clearMap() {
    if (layerGroup) {
        layerGroup.clearLayers();
    }
    
    if (drawnItems) {
        drawnItems.clearLayers();
    }
}
