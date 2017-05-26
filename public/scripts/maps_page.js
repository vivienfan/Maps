$(document).ready(function () {
  var myMap;
  var mid = $("body").data("mid");
  var latitude = 43.6532;
  var longitude = -79.3832;

  var points = [];
  var popup = L.popup();

  var addPopupHTML = $("#addPopup").children(".markerPopup").html();

  function createPointPopup(point) {
    var $div = $("<div>").attr("data-pid", point.p_id);
    var $title = $("<label>").text(point.title);
    var $description = $("<p>").text(point.description);
    var $br = $("<br>");
    var $button = $("<button>", { class: "edit-point"}).text("Edit");
    if (point.image) {
      var $img = $("<img>").attr("src", point.image).css("width", "100px");
      $div.append($title, $description, $img, $br, $button);
    } else {
      $div.append($title, $description, $button);
    }
    var $container = $("<section>");
    $container.append($div);
    return $container.html();
  }

  function initPoints() {
    $.ajax({
      url: `/points/all/${mid}`,
      method: "GET",
      dataType: 'json',
      success: function (points) {
        if (points.length !== 0) {
          points.forEach((point) => {
            var content = createPointPopup(point);
            L.marker([point.latitude, point.longitude]).addTo(myMap)
              .bindPopup(content);
            $('#points-list').append(content);
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

  $(".my_map").on('click', ".add-new-point" ,function(e) {
    console.log("add point");
  });

  $(".my_map").on('click', ".edit-point" ,function(e) {
    console.log("edit point");
  });
});
