const map = L.map("map", {
  zoomControl: true,
});

const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors',
});

tiles.addTo(map);

fetch("iran.geojson")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load GeoJSON dataset.");
    }
    return response.json();
  })
  .then((data) => {
    const iranLayer = L.geoJSON(data, {
      style: {
        color: "#facc15",
        weight: 1.8,
        fillColor: "#38bdf8",
        fillOpacity: 0.35,
      },
    }).addTo(map);

    map.fitBounds(iranLayer.getBounds(), {
      padding: [20, 20],
    });
  })
  .catch((error) => {
    console.error(error);
    const errorBanner = document.createElement("div");
    errorBanner.className = "error-banner";
    errorBanner.textContent = "Unable to load Iran GeoJSON dataset.";
    document.body.prepend(errorBanner);
  });
