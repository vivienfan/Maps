$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});


function createFavourite(list) {
  console.log("I am in createFavourite");
  var $listItem = $('<article>')
  $listItem.append($('<h4>').text(list.title));
  $listItem.append($('<p>').text(list.description));
  return $listItem;
}


function renderFavourites(lists){
  console.log("i am in renderFavourites")
  lists.forEach( function (list) {
    console.log("For each is working!!")
    // debugger;
    $('#listfav').prepend(createFavourite(list))});
  }



$(document).ready(function() {
  //Rendering Favourited Lists
  $.ajax({
  url: '/lists',
  method: 'GET',
  dataType: 'json',
  success: function(data) {

    if (data.length > 0) {
      renderFavourites(data)
    }
    //add class
    //Hide register and login buttons
   },
  error: function(err) {
    console.log('err');
  }
});

// renderFavourites([{'title': '123', 'description': 'desc'},{'title': '234', 'description': '2nd'} ])

  // LOGIN

  $("#register").on('click', 'button', function (e) {
    var email = $(this).siblings(".email").val();
    var password = $(this).siblings(".password").val();
    var username = $(this).siblings(".username").val();

    console.log(email, password, username);


    $.ajax({
    url: '/register/',
    method: 'POST',
    data: {email: email,
      password: password,
       username: username},
    dataType: 'json',
    success: function(suc) {
      //add class
      //Hide register and login buttons
     },
    error: function(err) {
      console.log('err');
    }
  });

  $("#login").on('click', 'button', function (e) {
    var email = $(this).siblings(".email").val();
    var password = $(this).siblings(".password").val();

    console.log(email, password);


    $.ajax({
    url: '/login/',
    method: 'POST',
    data: {email: email,
      password: password,
    },
    dataType: 'json',
    success: function(suc) {
      //Hide register and login buttons

     },
    error: function(err) {
      console.log('err');
      }
    });
  });
})

});
// Profile.ejs







//For Maps

var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'your.mapbox.project.id',
    accessToken: 'your.mapbox.public.access.token'
}).addTo(mymap);
