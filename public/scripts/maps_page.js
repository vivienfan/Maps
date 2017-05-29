$(document).ready(function () {

/*-------------------- sketchy --------------------*/
  $("#login_nav").css("display", "none");
  $("#reg_nav").css("display", "none");
  $(".dropdown").css("display", "none");
/*-------------------------------------------------*/

  var myMap;
  var mid = $("body").data("mid");
  var canEdit = $("body").data("canedit");
  var LAT = 43.6532;
  var LNG = -79.3832;
  var latitude;
  var longitude;

  var points = [];
  var popup = L.popup();
  var markerArray = [];

  var arrowIcon = L.icon({
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/musthave/256/Stock%20Index%20Down.png',
    iconSize: [38, 50]
  });

  /*---------------- Initialization ----------------*/
  myMap = L.map('leafletmap').setView([LAT, LNG], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(myMap);

  initPoints();

  /*---------------- Helper Function ----------------*/

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
    var $div = $("<div>", { class: "point-detail" })
      .attr("data-pid", point.p_id)
      .attr("data-lat", point.latitude)
      .attr("data-lng", point.longitude);
    var $title = $("<label>").text(point.title);
    var $description = $("<p>").text(point.description);
    var $img = $("<img>").attr("src", point.image)
    $div.append($title, $description, $img);
    if(canEdit) {
      var $br = $("<br>");
      var $edit = $("<button>", { class: "point-edit" }).text("Edit");
      var $delete = $("<button>", { class: "point-delete" }).text("Delete");
      $div.append($br, $edit, $delete);
    }
    var $container = $("<section>");
    $container.append($div);
    return $container.html();
  }

  function addPoint(point) {
    var popContent = createPointPopup(point);
    var infoContent = createPointInfo(point);
    var marker = L.marker([point.latitude, point.longitude])
    .addTo(myMap)
    .bindPopup(popContent);
    markerArray.push(marker);
    $('#points-list').append(infoContent);
  }

  function initPoints() {
    $('#points-list').empty();
    $.ajax({
      url: '/points/all/' + mid,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        points = res;
        if (points.length !== 0) {
          points.forEach(function(point) {
            addPoint(point);
          });
          var group = L.featureGroup(markerArray);
          myMap.fitBounds(group.getBounds(), {padding: [50, 50]});
        }
      }
    });
  }

  /*---------------- Event Handler ----------------*/

  myMap.on('click', function(e) {
    if (canEdit) {
      latitude = e.latlng.lat;
      longitude = e.latlng.lng;
      $('#add-point-modal').modal('toggle');
    }
  });

  $('#add-new-point').on('click',function(e) {
    var m_data = {
      title: $(this).parent(".modal-footer").siblings(".modal-body").children('.textbox-title').val(),
      description: $(this).parent(".modal-footer").siblings(".modal-body").children('.textbox-description').val(),
      image: $(this).parent(".modal-footer").siblings(".modal-body").children('.textbox-image').val(),
      longitude: longitude,
      latitude: latitude
    };
    $.ajax({
      url: '../points/' + mid + '/new',
      method: 'POST',
      data: m_data,
      dataType: 'json',
      async: false,
      success: function(res) {
        window.location.href = "/maps/" + mid;
        $('#edit-point-modal').modal('toggle');
      }
    });
  });

  $('#points-list').on('click', '.point-edit' ,function(e) {
    var pid = $(this).closest('.point-detail').data('pid');
    var point = points.filter(function(p) {
      return p.p_id === pid;
    });
    $('#edit-point-modal')
      .attr('data-pid', pid)
      .attr('data-lat', point[0].latitude)
      .attr('data-lng', point[0].longitude);
    $('#edit-point-modal').find('.textbox-title').val(point[0].title);
    $('#edit-point-modal').find('.textbox-description').val(point[0].description);
    $('#edit-point-modal').find('.textbox-image').val(point[0].image);
    $('#edit-point-modal').modal('toggle');
  });

  $('#edit-point').on('click', function(e) {
    var pid = $('#edit-point-modal').data('pid');
    var m_data = {
      title: $('#edit-point-modal').find('.textbox-title').val(),
      description: $('#edit-point-modal').find('.textbox-description').val(),
      image: $('#edit-point-modal').find('.textbox-image').val(),
      latitude: $('#edit-point-modal').data('lat'),
      longitude: $('#edit-point-modal').data('lng')
    }
    $.ajax({
      url: '../points/' + pid,
      method: 'PUT',
      data: m_data,
      success: function(res) {
        window.location.href = "/maps/" + mid;
        $('#edit-point-modal').modal('toggle');
      }
    });
  });

  $('#points-list').on('click', '.point-delete' ,function(e) {
    var pid = $(this).closest('.point-detail').data('pid');
    $.ajax({
      url: '../points/' + pid,
      method: 'DELETE',
      success: function(res) {
        window.location.href = "/maps/" + mid;
      }
    });
  });

  $("#location-search").on("keypress", function(e) {
    if(e.which == 13) {
      let location = $(this).val().replace(/\s/g, "+");
      console.log(location);
      $.ajax({
        url: '../points/serach/' + location,
        method: 'GET',
        dataType: 'json',
        success:function(res) {
          $(e.target).val('');
          L.marker([res.lat, res.lng], {icon: arrowIcon}).addTo(myMap);
          myMap.panTo(new L.LatLng(res.lat, res.lng));
        }
      });
    }
  });

  $("#map-history").on("click", function(e) {
    $.ajax({
      url: mid + '/history',
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res);
        $('#history-detail').empty();
        res.forEach(function(element) {
          let $row = $('<tr>');
          let $timestamp = $('<td>').text(Date(element.timestamp));
          let $username = $('<td>').text(element.username);
          let $action = $('<td>').text(element.change);
          $row.append($timestamp, $username, $action);
          console.log($row);
          $('#history-detail').append($row);
        });
        $('#map-history-modal').modal('toggle');
      }
    });
  });
});
