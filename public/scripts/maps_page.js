$(document).ready(function () {
  var myMap;
  var mid = $("body").data("mid");
  var LAT = 43.6532;
  var LNG = -79.3832;
  var latitude;
  var longitude;

  var points = [];
  var popup = L.popup();

  // var addPopupHTML = $("#addPopup").children(".markerPopup").html();

  function createPointPopup(point) {
    var $div = $("<div>").attr("data-pid", point.p_id);
    var $title = $("<label>").text(point.title);
    var $description = $("<p>").text(point.description);
    var $img = $("<img>").attr("src", point.image).css("width", "100px");
    $div.append($title, $description, $img);

    var $container = $("<section>");
    $container.append($div);
    return $container.html();
  }

  function createPointInfo(point) {
    var $div = $("<div>").attr("data-pid", point.p_id);
    var $title = $("<label>").text(point.title);
    var $description = $("<p>").text(point.description);
    var $img = $("<img>").attr("src", point.image).css("width", "200px");
    var $br = $("<br>");
    var $edit = $("<button>", { class: "point-edit" }).text("Edit");
    var $delete = $("<button>", { class: "point-delete" }).text("Delete");
    $div.append($title, $description, $img, $br, $edit, $delete);

    var $container = $("<section>");
    $container.append($div);
    return $container.html();
  }

  function addPoint(point) {
    var popContent = createPointPopup(point);
    var infoContent = createPointInfo(point);

    L.marker([point.latitude, point.longitude])
    .addTo(myMap)
    .bindPopup(popContent);

    $('#points-list').append(infoContent);
  }

  function initPoints() {
    $.ajax({
      url: '/points/all/' + mid,
      method: 'GET',
      dataType: 'json',
      success: function (points) {
        if (points.length !== 0) {
          points.forEach((point) => {
            addPoint(point);
          });
        }
      }
    });
  }

  function onMapClick(e) {
    latitude = e.latlng.lat;
    longitude = e.latlng.lng;
    $('#add-point-modal').modal('toggle');
  }

  myMap = L.map('leafletmap').setView([LAT, LNG], 11);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(myMap);

  initPoints();

  myMap.on('click', onMapClick);

  $('.add-new-point').on('click',function(e) {
    var m_data = {
      title: $(this).parent(".modal-footer").siblings(".modal-body").children('.textbox-title').val(),
      description: $(this).parent(".modal-footer").siblings(".modal-body").children('.textbox-description').val(),
      image: $(this).parent(".modal-footer").siblings(".modal-body").children('.textbox-image').val(),
      longitude: longitude,
      latitude: latitude
    };
    $.ajax({
      url: 'points/' + mid + '/new',
      method: 'POST',
      data: m_data,
      dataType: 'json',
      success: function(res) {
        m_data.pid = res.pid;
        addPoint(m_data);
        $('#add-point-modal').modal('toggle');
      }
    });
  });

  $('#points-list').on('click', '.point-edit' ,function(e) {
    console.log("edit");
  });

  $('#points-list').on('click', '.point-delete' ,function(e) {
    console.log("delete");
  });
});
