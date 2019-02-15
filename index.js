const ko = require('knockout');
const MapViewModel = require('./map-view-model');

const mapContainer = document.querySelector('#map');
ko.applyBindings(new MapViewModel(
    mapContainer
), document.querySelector('#app'))