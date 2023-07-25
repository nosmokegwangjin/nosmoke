// nosmoke.js 파일

var map;

function initializeMap() {
  map = L.map('map').setView([37.544147, 127.071288], 18); //[맵 초기 좌표]

  L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    minZoom: 14,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  }).addTo(map);

  fetch("nosmoke.json")
    .then(response => response.json())
    .then(data => {
      var geojsonLayer = L.geoJSON(data, {
        style: function (feature) {
          return {
            color: 'red',
            fillColor: 'red',
            fillOpacity: 0.5,
          };
        }
      }).addTo(map);
    })
    .catch(error => console.error('Error:', error));

  navigator.geolocation.getCurrentPosition(function (position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindTooltip("현위치").openTooltip();
    marker.setStyle({
      color: 'black',
      fillColor: 'black',
      fillOpacity: 1
    });
  });
}

// Call the initializeMap function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeMap);
