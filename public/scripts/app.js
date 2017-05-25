$(document).ready(function() {
  //Rendering Favourited Lists

  var global_username = '';
  var global_email = '';


//   $.ajax({
//   url: '/lists',
//   method: 'GET',
//   dataType: 'json',
//   success: function(data) {
//
//     if (data.length > 0) {
//       renderFavourites(data)
//     }
//     //add class
//     //Hide register and login buttons
//    },
//   error: function(err) {
//     console.log('err');
//   }
// });
//
// // renderFavourites([{'title': '123', 'description': 'desc'},{'title': '234', 'description': '2nd'} ])

  // LOGIN
  $("#register").on('click', function (e) {
    e.preventDefault();
    var email = $(this).siblings(".reg_email").val();
    var password = $(this).siblings(".reg_password").val();
    var username = $(this).siblings(".reg_username").val();

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
        console.log('register error');
      }
    });
  });

  $("#login").on('click', function (e) {
    e.preventDefault();
    console.log("here!!!");
    var email = $(this).siblings(".login_email").val();
    var password = $(this).siblings(".login_password").val();

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
        global_username = suc.username;
        global_email = suc.email;
        $('#display_username').text(`Hello ${global_username}!`);
      },
      error: function(err) {
        console.log('login error');
      }
    });
  });

// Profile.ejs_||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  // $.ajax({
  // url: '', //profile/:username,
  // method: 'GET',
  // dataType: 'json',
  // success: function(suc) {

  //   //TODO: Create both function to render data for user fabourites and user contributors

  //  },
  // error: function(err) {
  //   console.log('getting the error from the username ajax');
  //   }
  // });



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
      $('#listfav').prepend(createFavourite(list))
    });
  }

//Lists.ejs_||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  function createSingleContributor(cont) {
    var $contributor = $('<article>')
    $contributor.append($('<p>').text(cont.username));
    $contributor.append($('<br>'));
    return $contributor;
  }

  function createContributors(contributors) {
    contributors.forEach( function (contributor) {
      console.log("For each is working!!")
      // debugger;
      $('#lid_contributors').append(createSingleContributor(contributor))
    });
  }

  function createMap(map){
    var $map = $('<article>').attr('data-map_id', map.m_id)
    // $map.append($('<p>').text(map.m_id)).addClass('mapId')
    $map.append($('<p>').text(map.title))
    $map.append($('<p>').text(map.description))

    // Adding the buttons for edit and delete
    var $edit = $('<button class ="editMap" onClick="editMap()" />')
    $edit.append($('<p>').text("Edit"))
    var $del = $('<button class ="delMap" onClick="delMap()"/>')
    $del.append($('<p>').text("Delete"))
    $map.append($edit);
    $map.append($del);
    return $map;
  }

  function createMaps(maps){
    maps.forEach(function (map) {
      $('#lid_maps').append(createMap(map))
    })
  }

//   $.ajax({
//     url: '/lists/',
//     method: 'GET',
//     dataType: 'json',
//     success: function(suc) {
//       //add class
//       //Hide register and login buttons
//       $('#lid_info').append($('<h3>').text((`Title: ${suc.listinfo.title}`)));
//       $('#lid_info').append($('<h3>').text((`Description: ${suc.listinfo.Description}`)));
//
//       //TODO: Append every contributor of the lid in the container.
//
//       createContributers(suc.contrbutors)
//       // $('$lid_contributors').append($('<h3>').text((`Title: ${suc.listinfo.title}`)));
//
//       //TODO: Append every mapid in the map container
//
//       createMaps(suc.maps)
//
//
//
//       },
//       error: function(err) {
//       console.log('err');
//       }
// });

  //TODO: Create a function for every edit Button.
  $(".editMap").on('click', 'button', function (e) {
    e.preventDefault();
    var map_id = $(this).siblings('.mapId')

    $.ajax({
      url: '/maps/' + map_id, //EDIT mapid url
      method: 'PUT',
      data: map_id,
      success: function(suc) {
        //Delete the whole map article

      },
      error: function(err) {
        console.log('Edit Error')
      }
    })
  });

  //TODO: Create a function for every edit Delete.
  $(".delMap").on('click', 'button', function (e) {
    e.preventDefault();
    var map_id = $(this).siblings('.mapId')

    $.ajax({
      url: '', //delete mapid url
      method: 'DELETE',
      data: map_id,
      success: function(suc) {
        //Delete the map id article or refresh the page.

      },
      error: function(err) {
        console.log('Delete Error')
      }
    })
  });

  $("#addMap").on('click', 'button', function (e) {
    e.preventDefault();

    $.ajax({
      url: '',
      method: 'POST',
      // datatype: 'json',
      success: function(suc) {
        //Delete the map id article or refresh the page.

      },
      error: function(err) {
        console.log('Add Error')
      }
    })
  });

  $("#addContributor").on('click', 'button', function (e) {
    e.preventDefault();
    $.ajax({
      url: '',
      method: 'POST',
      // datatype: 'json',
      success: function(suc) {
        //Delete the map id article or refresh the page.

      },
      error: function(err) {
        console.log('Delete Error')
      }
    })
  });
});



// var a = $('<section>').attr('data-map_id', m_id);
//
// find the value
//
// var map_id =  a.data('m_id')
