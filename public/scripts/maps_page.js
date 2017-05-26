$(document).ready(function () {
  var myMap;
  var mid = $("body").data("mid");
  var latitude = 43.6532;
  var longitude = -79.3832;

  var points = [];
  var popup = L.popup();

  var addPopupHTML = $("#addPopup").children(".markerPopup").html();

  function createPointInfo(point) {
    var $container = $("<div>").attr("data-pid", point.p_id);
    var $title = $("<label>").text(point.title);
    var $description = $("<p>").text(point.description);
    var $br = $("<br>");
    var $button = $("<button>", { class: "edit-point"}).text("Edit");
    if (point.image) {
      var $img = $("<img>").attr("src", point.image).css("width", "100px");
      $container.append($title, $description, $img, $br, $button);
    } else {
      $container.append($title, $description, $button);
    }
    return $container.html();
  }

  function initPoints() {
    console.log("initPoints");
    $.ajax({
      url: `/points/all/${mid}`,
      method: "GET",
      dataType: 'json',
      success: function (points) {
        if (points.length !== 0) {
          points.forEach((point) => {
            console.log(point);
            var content = createPointInfo(point);
            L.marker([point.latitude, point.longitude]).addTo(myMap)
              .bindPopup(content);
          });
        }
      }
    });
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
