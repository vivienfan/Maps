$(document).ready(function() {
  var myMap;
  var latitude = 43.6532;
  var longitude = -79.3832;

  var points = [];
  var popup = L.popup();

  var addPopupHTML = $("#addPopup").children(".markerPopup").html();
  console.log(addPopupHTML);

  // function getLocation() {
  //   if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(showPosition);
  //       latitude = position.coords.latitude;
  //       longitude = position.coords.longitude;
  //       console.log('get location');
  //   }
  //   // else, use default coordinates;
  // }

  function addPoint(point) {
    // L.marker([point.latitude, point.longitude])
    // .addTo(myMap)
    // .on("clicke", myFnc);
  }

  function initPoints() {
    console.log("hereher");
    if (points.length !== 0) {
      points.forEach((point) => {
        // addPoint(point);
      });
    }

    L.marker([latitude, longitude]).addTo(myMap)
      .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
  }

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent(addPopupHTML)
      .openOn(myMap);
  }



  myMap = L.map('leafletmap').setView([latitude, longitude], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(myMap);

  initPoints();

  myMap.on('click', onMapClick);
});
