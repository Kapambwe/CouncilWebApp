window.drawPolygon = (mapId, paths) => {
    const map = Radzen.maps[mapId];
    if (map) {
        new google.maps.Polygon({
            paths: paths,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map: map,
        });
    }
};