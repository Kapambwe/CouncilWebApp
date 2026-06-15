const mapRegistry = new Map();

function ensureLeaflet() {
    if (typeof window.L === "undefined") {
        throw new Error("Leaflet is not loaded.");
    }
}

function createBaseLayers() {
    return {
        Streets: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 20,
            attribution: "&copy; OpenStreetMap contributors"
        }),
        Satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
            maxZoom: 20,
            attribution: "Tiles &copy; Esri"
        }),
        Terrain: L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
            maxZoom: 17,
            attribution: "&copy; OpenTopoMap contributors"
        })
    };
}

function toText(value) {
    if (value === null || value === undefined) {
        return "";
    }

    if (Array.isArray(value)) {
        return value.map(toText).filter(Boolean).join(" ");
    }

    if (typeof value === "object") {
        return Object.values(value).map(toText).filter(Boolean).join(" ");
    }

    return String(value);
}

function normalizeToken(value) {
    return toText(value).toLowerCase().trim();
}

function tokenizeQuery(query) {
    return normalizeToken(query)
        .split(/[\s,.;:/\\|()[\]{}"'`-]+/g)
        .map(token => token.trim())
        .filter(Boolean);
}

function extractFeatureTitle(feature, layerTitle, index) {
    const props = feature?.properties ?? {};
    return toText(
        props.name ||
        props.title ||
        props.label ||
        props.reference ||
        props.parcelNumber ||
        props.wardName ||
        props.caseNumber ||
        props.applicationNumber ||
        feature?.id ||
        `${layerTitle} ${index + 1}`
    );
}

function extractFeatureSummary(feature) {
    const props = feature?.properties ?? {};
    return toText(
        props.description ||
        props.summary ||
        props.status ||
        props.type ||
        props.category ||
        props.owner ||
        props.ward ||
        props.parcelNumber ||
        props.reference ||
        ""
    );
}

function buildProperties(feature) {
    const props = feature?.properties ?? {};
    const result = {};

    for (const [key, value] of Object.entries(props)) {
        const text = toText(value);
        if (text) {
            result[key] = text;
        }
    }

    return result;
}

function buildSearchText(record) {
    const propertiesText = Object.entries(record.properties)
        .map(([key, value]) => `${key} ${value}`)
        .join(" ");

    return [
        record.title,
        record.summary,
        record.layerTitle,
        propertiesText
    ]
        .map(normalizeToken)
        .filter(Boolean)
        .join(" ");
}

function createGeoJsonLayer(mapState, layerConfig) {
    const geoJsonData = typeof layerConfig.data === "string" ? JSON.parse(layerConfig.data) : layerConfig.data;
    const visible = Boolean(layerConfig.visible);
    const color = layerConfig.color || "#2563eb";
    const fillColor = layerConfig.fillColor || "#60a5fa";
    const fillOpacity = typeof layerConfig.fillOpacity === "number" ? layerConfig.fillOpacity : 0.45;
    const layerTitle = layerConfig.title || layerConfig.key;
    const layerKey = layerConfig.key;

    const style = feature => {
        const geometryType = feature?.geometry?.type?.toLowerCase?.() ?? "";

        if (geometryType.includes("point")) {
            return {
                radius: 7,
                color,
                weight: 2,
                fillColor,
                fillOpacity: 1
            };
        }

        return {
            color,
            weight: 2,
            fillColor,
            fillOpacity
        };
    };

    const onEachFeature = (feature, layer) => {
        const properties = buildProperties(feature);
        const title = extractFeatureTitle(feature, layerTitle, mapState.featureIndex.length);
        const summary = extractFeatureSummary(feature);
        const featureId = `${layerKey}-${feature.id ?? mapState.featureIndex.length + 1}-${mapState.featureIndex.length}`;
        const record = {
            FeatureId: featureId,
            Title: title,
            LayerKey: layerKey,
            LayerTitle: layerTitle,
            Summary: summary,
            Properties: properties,
            _searchText: buildSearchText({ title, summary, layerTitle, properties }),
            _geometryType: feature?.geometry?.type ?? "Unknown"
        };

        mapState.featureIndex.push(record);
        mapState.featureLayers.set(featureId, layer);

        const popupHtml = [
            `<div style="min-width: 220px; max-width: 320px;">`,
            `<div style="font-weight: 700; margin-bottom: 0.35rem;">${escapeHtml(title)}</div>`,
            `<div style="font-size: 12px; color: #64748b; margin-bottom: 0.5rem;">${escapeHtml(layerTitle)}</div>`,
            summary ? `<div style="font-size: 13px; margin-bottom: 0.5rem;">${escapeHtml(summary)}</div>` : "",
            renderProperties(properties),
            `</div>`
        ].join("");

        layer.bindPopup(popupHtml, { maxWidth: 360 });
        layer.on("click", () => {
            if (mapState.dotNetRef) {
                mapState.dotNetRef.invokeMethodAsync("HandleMapFeatureSelected", record);
            }
        });
    };

    const layer = L.geoJSON(geoJsonData, {
        style,
        pointToLayer: (feature, latlng) => L.circleMarker(latlng, style(feature)),
        onEachFeature
    });

    layer._layerKey = layerKey;
    layer._layerTitle = layerTitle;
    layer._visible = visible;
    layer._geoJsonData = geoJsonData;
    layer._searchIndex = [];

    layer.eachLayer(childLayer => {
        childLayer._featureLayerKey = layerKey;
    });

    if (visible) {
        layer.addTo(mapState.map);
    }

    mapState.overlays[layerKey] = layer;
    mapState.layerMetadata[layerKey] = {
        key: layerKey,
        title: layerTitle,
        color,
        fillColor,
        fillOpacity,
        visible
    };
}

function renderProperties(properties) {
    const entries = Object.entries(properties ?? {});
    if (entries.length === 0) {
        return "";
    }

    const rows = entries
        .slice(0, 8)
        .map(([key, value]) => `<div style="font-size: 12px; margin-bottom: 0.2rem;"><strong>${escapeHtml(key)}:</strong> ${escapeHtml(value)}</div>`)
        .join("");

    return `<div>${rows}</div>`;
}

function escapeHtml(value) {
    return toText(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function initializeMap(elementId, options, dotNetRef) {
    ensureLeaflet();

    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error(`Map element not found: ${elementId}`);
    }

    if (mapRegistry.has(elementId)) {
        const existing = mapRegistry.get(elementId);
        existing.map.remove();
        mapRegistry.delete(elementId);
    }

    const map = L.map(elementId, {
        zoomControl: true,
        preferCanvas: true
    }).setView([options.centerLat ?? -15.3875, options.centerLng ?? 28.3228], options.zoom ?? 12);

    const baseLayers = createBaseLayers();
    baseLayers.Streets.addTo(map);

    const mapState = {
        map,
        baseLayers,
        overlays: {},
        layerMetadata: {},
        featureIndex: [],
        featureLayers: new Map(),
        dotNetRef: dotNetRef ?? options.dotNetRef ?? null
    };

    const layers = Array.isArray(options.layers) ? options.layers : [];
    for (const layerConfig of layers) {
        try {
            createGeoJsonLayer(mapState, layerConfig);
        } catch (error) {
            console.error("Failed to create GIS layer", layerConfig?.key, error);
        }
    }

    L.control.layers(baseLayers, mapState.overlays, { collapsed: false }).addTo(map);

    const overlayLayers = Object.values(mapState.overlays);
    if (overlayLayers.length > 0) {
        const visibleBounds = L.featureGroup(overlayLayers).getBounds();
        if (visibleBounds?.isValid?.()) {
            map.fitBounds(visibleBounds.pad(0.12));
        }
    }

    mapRegistry.set(elementId, mapState);
}

export function setLayerVisibility(elementId, layerKey, visible) {
    const state = mapRegistry.get(elementId);
    if (!state) {
        return;
    }

    const layer = state.overlays[layerKey];
    if (!layer) {
        return;
    }

    const isOnMap = state.map.hasLayer(layer);
    if (visible && !isOnMap) {
        layer.addTo(state.map);
    } else if (!visible && isOnMap) {
        state.map.removeLayer(layer);
    }
}

export function resetView(elementId) {
    const state = mapRegistry.get(elementId);
    if (!state) {
        return;
    }

    const visibleLayers = Object.values(state.overlays).filter(layer => state.map.hasLayer(layer));
    if (visibleLayers.length === 0) {
        state.map.setView(state.map.getCenter(), state.map.getZoom());
        return;
    }

    const bounds = L.featureGroup(visibleLayers).getBounds();
    if (bounds?.isValid?.()) {
        state.map.fitBounds(bounds.pad(0.12));
    }
}

export async function exportMapState(elementId) {
    const state = mapRegistry.get(elementId);
    if (!state) {
        return JSON.stringify({});
    }

    return JSON.stringify({
        center: state.map.getCenter(),
        zoom: state.map.getZoom(),
        layers: Object.values(state.layerMetadata)
    }, null, 2);
}

export async function exportVisibleLayerGeoJson(elementId) {
    const state = mapRegistry.get(elementId);
    if (!state) {
        return JSON.stringify({ type: "FeatureCollection", features: [] });
    }

    const features = [];

    for (const [layerKey, layer] of Object.entries(state.overlays)) {
        if (!state.map.hasLayer(layer)) {
            continue;
        }

        const geoJson = layer.toGeoJSON();
        if (geoJson?.type === "FeatureCollection" && Array.isArray(geoJson.features)) {
            for (const feature of geoJson.features) {
                feature.properties = {
                    ...(feature.properties ?? {}),
                    layerKey
                };
                features.push(feature);
            }
        }
    }

    return JSON.stringify({
        type: "FeatureCollection",
        features
    }, null, 2);
}

export async function searchMapFeatures(elementId, query) {
    const state = mapRegistry.get(elementId);
    if (!state || !query || !query.trim()) {
        return [];
    }

    const tokens = tokenizeQuery(query);
    if (tokens.length === 0) {
        return [];
    }

    const results = state.featureIndex
        .map(record => {
            const text = record._searchText || "";
            let score = 0;

            for (const token of tokens) {
                if (!token) {
                    continue;
                }

                if (text.includes(token)) {
                    score += 2;
                }

                const titleMatch = normalizeToken(record.Title).includes(token);
                const layerMatch = normalizeToken(record.LayerTitle).includes(token);
                const summaryMatch = normalizeToken(record.Summary).includes(token);

                if (titleMatch) score += 6;
                if (layerMatch) score += 3;
                if (summaryMatch) score += 2;

                for (const [key, value] of Object.entries(record.Properties ?? {})) {
                    const propertyMatch = normalizeToken(`${key} ${value}`).includes(token);
                    if (propertyMatch) {
                        score += 1;
                    }
                }
            }

            if (normalizeToken(record.Title) === normalizeToken(query)) {
                score += 10;
            }

            return { record, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score || a.record.Title.localeCompare(b.record.Title))
        .slice(0, 20)
        .map(item => ({
            FeatureId: item.record.FeatureId,
            Title: item.record.Title,
            LayerKey: item.record.LayerKey,
            LayerTitle: item.record.LayerTitle,
            Summary: item.record.Summary,
            Properties: item.record.Properties
        }));

    return results;
}

export function focusSearchResult(elementId, featureId) {
    const state = mapRegistry.get(elementId);
    if (!state || !featureId) {
        return;
    }

    const layerOrFeature = state.featureLayers.get(featureId);
    if (!layerOrFeature) {
        return;
    }

    let targetLayer = layerOrFeature;
    if (layerOrFeature.getBounds) {
        const bounds = layerOrFeature.getBounds();
        if (bounds?.isValid?.()) {
            state.map.fitBounds(bounds.pad(0.15));
        }
    } else if (layerOrFeature.getLatLng) {
        const latlng = layerOrFeature.getLatLng();
        state.map.setView(latlng, Math.max(state.map.getZoom(), 15));
    }

    if (layerOrFeature.openPopup) {
        layerOrFeature.openPopup();
    } else if (targetLayer._popup) {
        targetLayer.openPopup();
    }
}

export function downloadTextFile(fileName, content, mimeType) {
    const blob = new Blob([content], { type: mimeType || "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
}
