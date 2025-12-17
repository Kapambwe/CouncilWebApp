// Leaflet Interop for GIS Component - Phase 2 Enhanced
let map = null;
let layers = {};
let markers = {};
let currentBaseLayer = null;
let satelliteLayer = null;
let drawingLayer = null;
let measurementLayer = null;
let currentDrawingMode = null;

export function createMap(elementId, lat, lng, zoom) {
    if (map) {
        map.remove();
    }

    map = L.map(elementId).setView([lat, lng], zoom);

    // Add OpenStreetMap base layer
    currentBaseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    return map;
}

// Phase 2: Base Map Management
export function changeBaseMap(mapType, apiKey) {
    if (!map) return;
    
    // Remove current base layer
    if (currentBaseLayer) {
        map.removeLayer(currentBaseLayer);
    }

    let tileUrl, attribution, maxZoom;

    switch (mapType) {
        case 'osm':
        case 'street':
            tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            attribution = '© OpenStreetMap contributors';
            maxZoom = 19;
            break;
        case 'satellite':
        case 'esri':
            tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
            attribution = 'Esri, DigitalGlobe, GeoEye';
            maxZoom = 19;
            break;
        case 'terrain':
            tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
            attribution = '© OpenTopoMap';
            maxZoom = 17;
            break;
        case 'hybrid':
            // Satellite base with labels overlay
            tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
            attribution = 'Esri, DigitalGlobe';
            maxZoom = 19;
            break;
        case 'mapbox-satellite':
            if (!apiKey) {
                console.error('Mapbox requires an API key');
                return;
            }
            tileUrl = `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg?access_token=${apiKey}`;
            attribution = '© Mapbox';
            maxZoom = 22;
            break;
        default:
            tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            attribution = '© OpenStreetMap contributors';
            maxZoom = 19;
    }

    currentBaseLayer = L.tileLayer(tileUrl, {
        attribution: attribution,
        maxZoom: maxZoom
    }).addTo(map);

    // For hybrid mode, add labels overlay
    if (mapType === 'hybrid') {
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
            attribution: '© CARTO',
            maxZoom: 19,
            pane: 'shadowPane'
        }).addTo(map);
    }
}

// Phase 2: Satellite Imagery
export function addSatelliteLayer(providerName, apiKey) {
    if (!map) return;

    // Remove existing satellite layer
    if (satelliteLayer) {
        map.removeLayer(satelliteLayer);
    }

    let tileUrl, attribution, maxZoom;

    switch (providerName) {
        case 'esri':
            tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
            attribution = 'Esri, DigitalGlobe, GeoEye';
            maxZoom = 19;
            break;
        case 'mapbox-satellite':
            if (!apiKey) {
                console.error('Mapbox requires an API key');
                return;
            }
            tileUrl = `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg?access_token=${apiKey}`;
            attribution = '© Mapbox';
            maxZoom = 22;
            break;
        case 'google-satellite':
            tileUrl = 'http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
            attribution = '© Google';
            maxZoom = 20;
            break;
        default:
            return;
    }

    satelliteLayer = L.tileLayer(tileUrl, {
        attribution: attribution,
        maxZoom: maxZoom,
        opacity: 0.8
    }).addTo(map);
}

export function removeSatelliteLayer() {
    if (satelliteLayer && map) {
        map.removeLayer(satelliteLayer);
        satelliteLayer = null;
    }
}

// Phase 2: Drawing Tools
export function enableDrawingMode(mode, options) {
    if (!map) return;

    disableDrawingMode(); // Clear any existing drawing mode

    const defaultOptions = {
        color: '#3388ff',
        fillColor: '#3388ff',
        fillOpacity: 0.2,
        weight: 3
    };

    const drawOptions = { ...defaultOptions, ...options };

    currentDrawingMode = mode;

    if (!drawingLayer) {
        drawingLayer = L.featureGroup().addTo(map);
    }

    // Enable drawing based on mode
    switch (mode) {
        case 'marker':
            map.on('click', function(e) {
                const marker = L.marker(e.latlng).addTo(drawingLayer);
                marker.bindPopup('New marker');
            });
            break;
        case 'circle':
            map.on('click', function(e) {
                const circle = L.circle(e.latlng, {
                    radius: 500,
                    ...drawOptions
                }).addTo(drawingLayer);
            });
            break;
        case 'polygon':
            const polygonPoints = [];
            map.on('click', function(e) {
                polygonPoints.push(e.latlng);
                if (polygonPoints.length === 1) {
                    const tempMarker = L.marker(e.latlng).addTo(drawingLayer);
                } else if (polygonPoints.length >= 3) {
                    map.off('click');
                    const polygon = L.polygon(polygonPoints, drawOptions).addTo(drawingLayer);
                    polygonPoints.length = 0;
                }
            });
            break;
        case 'polyline':
            const linePoints = [];
            map.on('click', function(e) {
                linePoints.push(e.latlng);
                if (linePoints.length >= 2) {
                    const polyline = L.polyline(linePoints, drawOptions).addTo(drawingLayer);
                }
            });
            break;
        case 'rectangle':
            let rectStart = null;
            map.on('click', function(e) {
                if (!rectStart) {
                    rectStart = e.latlng;
                } else {
                    const bounds = L.latLngBounds(rectStart, e.latlng);
                    const rectangle = L.rectangle(bounds, drawOptions).addTo(drawingLayer);
                    rectStart = null;
                    map.off('click');
                }
            });
            break;
    }
}

export function disableDrawingMode() {
    if (!map) return;

    map.off('click');
    currentDrawingMode = null;
}

// Phase 2: Measurement Tools
export function enableMeasurement(measurementType) {
    if (!map) return;

    disableMeasurement();

    if (!measurementLayer) {
        measurementLayer = L.featureGroup().addTo(map);
    }

    const measurePoints = [];

    map.on('click', function(e) {
        measurePoints.push(e.latlng);
        
        // Add marker for each point
        L.marker(e.latlng, {
            icon: L.divIcon({
                className: 'measurement-marker',
                html: `<div style="background: #ff0000; width: 8px; height: 8px; border-radius: 50%;"></div>`
            })
        }).addTo(measurementLayer);

        if (measurePoints.length >= 2) {
            if (measurementType === 'distance') {
                // Draw line and show distance
                const polyline = L.polyline(measurePoints, {
                    color: '#ff0000',
                    weight: 2,
                    dashArray: '5, 5'
                }).addTo(measurementLayer);

                const distance = calculateDistance(measurePoints);
                const midpoint = L.latLngBounds(measurePoints).getCenter();
                
                L.marker(midpoint, {
                    icon: L.divIcon({
                        className: 'measurement-label',
                        html: `<div style="background: white; padding: 2px 5px; border: 1px solid #ff0000; border-radius: 3px; font-size: 12px;">${distance.toFixed(2)} m</div>`
                    })
                }).addTo(measurementLayer);
            } else if (measurementType === 'area' && measurePoints.length >= 3) {
                // Draw polygon and show area
                const polygon = L.polygon(measurePoints, {
                    color: '#ff0000',
                    fillColor: '#ff0000',
                    fillOpacity: 0.1,
                    weight: 2
                }).addTo(measurementLayer);

                const area = calculateArea(measurePoints);
                const center = L.latLngBounds(measurePoints).getCenter();
                
                L.marker(center, {
                    icon: L.divIcon({
                        className: 'measurement-label',
                        html: `<div style="background: white; padding: 2px 5px; border: 1px solid #ff0000; border-radius: 3px; font-size: 12px;">${area.toFixed(2)} m²</div>`
                    })
                }).addTo(measurementLayer);
            }
        }
    });
}

export function disableMeasurement() {
    if (!map) return;

    map.off('click');
    
    if (measurementLayer) {
        measurementLayer.clearLayers();
    }
}

export function measureDistance(points) {
    if (points.length < 2) return 0;
    
    let totalDistance = 0;
    for (let i = 0; i < points.length - 1; i++) {
        const from = L.latLng(points[i][0], points[i][1]);
        const to = L.latLng(points[i + 1][0], points[i + 1][1]);
        totalDistance += from.distanceTo(to);
    }
    return totalDistance;
}

export function measureArea(polygon) {
    if (polygon.length < 3) return 0;
    
    const latLngs = polygon.map(p => L.latLng(p[0], p[1]));
    return L.GeometryUtil.geodesicArea(latLngs);
}

function calculateDistance(points) {
    let totalDistance = 0;
    for (let i = 0; i < points.length - 1; i++) {
        totalDistance += points[i].distanceTo(points[i + 1]);
    }
    return totalDistance;
}

function calculateArea(points) {
    // Using shoelace formula for polygon area
    const latLngs = points.map(p => [p.lat, p.lng]);
    return L.GeometryUtil ? L.GeometryUtil.geodesicArea(points) : 0;
}

// Phase 2: Editing Tools
export function enableEditMode(featureId) {
    if (!map || !layers[featureId]) return;

    const layer = layers[featureId];
    if (layer.enableEdit) {
        layer.enableEdit();
    }
}

export function disableEditMode() {
    Object.keys(layers).forEach(layerId => {
        const layer = layers[layerId];
        if (layer.disableEdit) {
            layer.disableEdit();
        }
    });
}

// Phase 2: Data Export
export function exportToGeoJson(layerId) {
    if (layerId && layers[layerId]) {
        return JSON.stringify(layers[layerId].toGeoJSON());
    }

    // Export all layers
    const allFeatures = [];
    Object.values(layers).forEach(layer => {
        if (layer.toGeoJSON) {
            const geoJson = layer.toGeoJSON();
            if (geoJson.type === 'FeatureCollection') {
                allFeatures.push(...geoJson.features);
            } else {
                allFeatures.push(geoJson);
            }
        }
    });

    return JSON.stringify({
        type: 'FeatureCollection',
        features: allFeatures
    });
}

export function addMarker(lat, lng, popupText) {
    if (!map) return;

    const marker = L.marker([lat, lng]).addTo(map);
    
    if (popupText) {
        marker.bindPopup(popupText);
    }

    const markerId = `marker_${Date.now()}`;
    markers[markerId] = marker;
    return markerId;
}

export function addCircle(lat, lng, radius, options) {
    if (!map) return;

    const defaultOptions = {
        color: '#3388ff',
        fillColor: '#3388ff',
        fillOpacity: 0.2,
        radius: radius
    };

    const circle = L.circle([lat, lng], { ...defaultOptions, ...options }).addTo(map);
    const circleId = `circle_${Date.now()}`;
    layers[circleId] = circle;
    return circleId;
}

export function addPolygon(latLngs, options) {
    if (!map) return;

    const defaultOptions = {
        color: '#3388ff',
        fillColor: '#3388ff',
        fillOpacity: 0.2
    };

    const polygon = L.polygon(latLngs, { ...defaultOptions, ...options }).addTo(map);
    const polygonId = `polygon_${Date.now()}`;
    layers[polygonId] = polygon;
    return polygonId;
}

export function addGeoJson(geoJson, options) {
    if (!map) return;

    const defaultOptions = {
        style: {
            color: '#3388ff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.2
        }
    };

    const layer = L.geoJSON(geoJson, { ...defaultOptions, ...options }).addTo(map);
    const layerId = `geojson_${Date.now()}`;
    layers[layerId] = layer;
    return layerId;
}

export function addLayer(layerId, layerData, style) {
    if (!map) return;

    try {
        const data = JSON.parse(layerData);
        const layer = L.geoJSON(data, {
            style: style || {
                color: '#3388ff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.2
            }
        }).addTo(map);

        layers[layerId] = layer;
    } catch (e) {
        console.error('Error adding layer:', e);
    }
}

export function removeLayer(layerId) {
    if (layers[layerId]) {
        map.removeLayer(layers[layerId]);
        delete layers[layerId];
    }
}

export function setLayerOpacity(layerId, opacity) {
    if (layers[layerId]) {
        layers[layerId].setStyle({ fillOpacity: opacity, opacity: opacity });
    }
}

export function toggleLayerVisibility(layerId, visible) {
    if (layers[layerId]) {
        if (visible) {
            layers[layerId].addTo(map);
        } else {
            map.removeLayer(layers[layerId]);
        }
    }
}

export function fitBounds(minLat, minLng, maxLat, maxLng) {
    if (!map) return;
    
    const bounds = L.latLngBounds(
        L.latLng(minLat, minLng),
        L.latLng(maxLat, maxLng)
    );
    map.fitBounds(bounds);
}

export function setView(lat, lng, zoom) {
    if (!map) return;
    map.setView([lat, lng], zoom);
}

export function clearMap() {
    if (!map) return;

    // Remove all layers
    Object.keys(layers).forEach(layerId => {
        map.removeLayer(layers[layerId]);
    });
    layers = {};

    // Remove all markers
    Object.keys(markers).forEach(markerId => {
        map.removeLayer(markers[markerId]);
    });
    markers = {};
}
