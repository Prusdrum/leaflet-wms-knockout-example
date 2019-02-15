const L = require('leaflet');
const ko = require('knockout');

function MapViewModel(mapContainer) {

    this.map = L.map(mapContainer).setView([50,20], 13);
    this.adminLayerVisible = ko.observable(true);
    this.zusLayerVisible = ko.observable(false);

    const adminLayer = L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/img/guest/Administracyjna/MapServer/WMSServer", {
        layers: ['Administracyjna'],
        format: 'image/png',
        transparent: true,
        opacity: this.adminLayerVisible() ? 1 : 0
    });

    const zusLayer = L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/pub/guest/G2_ZUS_WMS/MapServer/WMSServer", {
        layers: ['0'],
        format: 'image/png',
        transparent: true,
        opacity: this.zusLayerVisible() ? 1 : 0
    });

    adminLayer.addTo(this.map);
    zusLayer.addTo(this.map);

    this.adminLayerVisible.subscribe((newValue) => {
        adminLayer.setOpacity(newValue ? 1 : 0)
    });

    this.zusLayerVisible.subscribe((newValue) => {
        zusLayer.setOpacity(newValue ? 1 : 0)
    });
}

module.exports = MapViewModel;