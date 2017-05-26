$(document).ready(function() {
  //Rendering Favourited Lists
  var global_username = '';
  var global_email = '';


  $('.dropdown').addClass('hide');
  renderListsForHome();

  $.ajax({
    url: '/me',
    method: 'GET',
    dataType: 'json',
    success: function(suc) {
      console.log(suc)
      if (suc) {
        //Hide register and login buttons
        global_username = suc.username;
        global_email = suc.email;
        console.log('global u', global_username, global_email);
        // TOOD:
        $('#display_username').text(`Hello ${global_username}!`);
        $('#login_nav').addClass('hide');
        $('#reg_nav').addClass('hide');
        $('.dropdown').removeClass('hide');

      }
    }
  });


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
        global_username = suc.username;
        global_email = suc.email;
        console.log("I am here: ", suc);
        $('#display_username').text(`Hello ${global_username}!`);
        $('#login_nav').addClass('hide');
        $('#reg_nav').addClass('hide');
        $('#regmodal').modal('hide');
        $('.dropdown').removeClass('hide')
       },
      error: function(err) {
        console.log(err);
        var $regError = $('<div>');
        $regError.text('Registration Error-And the server message is ->', err);
        $regError.addClass('alert alert-danger');
        $('#register_container').append($regError);
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
        $('#login_nav').addClass('hide');
        $('#reg_nav').addClass('hide');
        $('#loginmodal').modal('hide');
        $('.dropdown').removeClass('hide')


      },
      error: function(err) {
        console.log('login error');
        var $loginError = $('<div>');
        $loginError.text('Invalid email and password-And the server message is ->', err);
        $loginError.addClass('alert alert-danger');
        $('#login_container').append($loginError);
      }
    });
  });

  $("#logout").on('click', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/logout/',
      method: 'POST',
      success: function() {
        //Hide register and login buttons
        console.log("I am heree")
        global_username = "";
        global_email = "";
        $('#display_username').text(`Hello ${global_username}!`)
        $('#login_nav').removeClass('hide');
        $('#reg_nav').removeClass('hide');
        $('.dropdown').addClass('hide');
        window.location.href = "/";
      },
      error: function(err) {
        console.log('logout error', err);
      }
    });
  });

  function renderListsForHome() {
    console.log("get all lists for home page");
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
  }

  function createFavourite(list) {
    console.log("I am in createFavourite");
    var $listItem = $('<div>');
    $listItem.addClass('row');

    var $listTitle =$('<div>');
    $listTitle.addClass('col-md-3');
    $listTitle.append($('<b>').text(list.title));
    $listItem.append($listTitle);

    var $listDesc =$('<div>');
    $listDesc.addClass('col-md-3');
    $listDesc.append(`${list.description}`);
    $listItem.append($listDesc);

    var $listFav = $('<div>');
    $listFav.addClass('col-md-3');
    if (list.count === null){
      $listFav.append("0 Favourites")
    } else {
    $listFav.append(`${list.count} Favourites`);
    }
    $listItem.append($listFav);
    var $buttonL = $(`<a name='View List' class = 'btn btn-primary' href='lists/${list.l_id}'>`);
    $buttonL.text('View List')
    $listItem.append($buttonL);
    $listItem.append($('<b>'));
    $listItem.append($('<b>'));
    // $listItem.append($('<input>').text("View List"));
    return $listItem;
  }

  function renderFavourites(lists){
    console.log("i am in renderFavourites")
    console.log(lists);
    lists.forEach( function (list) {
      console.log("For each is working!!")
      // debugger;
      $('#listfav').append(createFavourite(list))
    });
  }


// Profile.ejs_||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



  $("#yourProf").on('click', function (e) {
    window.location=`/profiles/${global_username}`;
  });

  function contributedLists(lists){
    console.log("Inside Contributed lists function rendering ", lists)
    lists.forEach( function (list) {
      console.log("For each is working!! in contributedLists")
      // debugger;
      $('#userContributions').append(createSingleList(list))
      });
    }

  function createSingleList(list) {
    var $list = $('<article>')
    $contributor.append($('<p>').text(list.title));
    $contributor.append($('<br>'));
    $contributor.append($('<p>').text(list.description));
    $contributor.append($('<br>'));
    return $list;
  };

  function favouritedLists(lists){
    lists.forEach( function (list) {
      console.log("Inside favourited lists function rendering ", lists)
      console.log("For each is working!! in favouritedLists")
      // debugger;
      $('#userFavourites').append(createSingleList(list));
        })
      };





//Lists.ejs_||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||







  // function createSingleContributor(cont) {
  //   var $contributor = $('<article>')
  //   $contributor.append($('<p>').text(cont.username));
  //   $contributor.append($('<br>'));
  //   return $contributor;
  // }
  //
  // function createContributors(contributors) {
  //   contributors.forEach( function (contributor) {
  //     console.log("For each is working!!")
  //     // debugger;
  //     $('#lid_contributors').append(createSingleContributor(contributor))
  //   });
  // }
  //
  // function createMap(map){
  //   var $map = $('<article>').attr('data-map_id', map.m_id)
  //   // $map.append($('<p>').text(map.m_id)).addClass('mapId')
  //   $map.append($('<p>').text(map.title))
  //   $map.append($('<p>').text(map.description))
  //
  //   // Adding the buttons for edit and delete
  //   var $edit = $('<button class ="editMap" onClick="editMap()" />')
  //   $edit.append($('<p>').text("Edit"))
  //   var $del = $('<button class ="delMap" onClick="delMap()"/>')
  //   $del.append($('<p>').text("Delete"))
  //   $map.append($edit);
  //   $map.append($del);
  //   return $map;
  // }
  //
  // function createMaps(maps){
  //   maps.forEach(function (map) {
  //     $('#lid_maps').append(createMap(map))
  //   })
  // }

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
  // $(".editMap").on('click', 'button', function (e) {
  //   e.preventDefault();
  //   var map_id = $(this).siblings('.mapId')
  //
  //   $.ajax({
  //     url: '/maps/' + map_id, //EDIT mapid url
  //     method: 'POST',
  //     data: map_id,
  //     success: function(suc) {
  //       //Delete the whole map article
  //
  //     },
  //     error: function(err) {
  //       console.log('Edit Error')
  //     }
  //   })
  // });

  //TODO: Create a function for every edit Delete.
  $(".deleteMap").on('click', function (e) {
    e.preventDefault();
    var map_id = $(this).data('mid')
    console.log("here is the map_id I am fetching", map_id);
    var divDelete = $(this).closest('.divMap');
    console.log(divDelete);


    $.ajax({
      url: '/maps/' +  map_id, //delete mapid url
      method: 'DELETE',
      data: map_id,
      success: function(suc) {
          $(divDelete).empty();
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
  })
});




// var a = $('<section>').attr('data-map_id', m_id);
//
// find the value
//
// var map_id =  a.data('m_id')
