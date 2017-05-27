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

  function renderListsForHome() {
    console.log("get all lists for home page");
    $.ajax({
      url: '/lists',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        console.log(data.publics);
        console.log(data.favs);
        if (data.publics) {
          renderFavourites(data.publics, data.favs)
        }
        //add class
        //Hide register and login buttons
        },
      error: function(err) {
        console.log('err');
        }
    });
  }

  function createFavourite(list, favs) {
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
    var $listFavButton = $(`<a class='btn btn-primary favoriteButton' data-l_id='${list.l_id}'>`)
    $listFavButton.text('  Favourite');
    $listFav.addClass('col-md-3');
    if (list.count === null){
      var $spanBadge = $('<span>');
      $spanBadge.addClass('badge');
      $spanBadge.text("0")
      $listFavButton.prepend($spanBadge)
      $listFav.append($listFavButton)

    } else {
      var $spanBadge = $('<span>');
      $spanBadge.addClass('badge');
      $spanBadge.text(list.count)
      $listFavButton.prepend($spanBadge)
      console.log('Inside the createFavorite function will check the whole list', favs)
      console.log('and I am checking the list.l_id with ', list.l_lid);
      if (favs){
        if (list.l_id in favs){
          console.log("it is in favs")
          $listFavButton.addClass('active');
        }
      }
      $listFav.append($listFavButton)

    }
    $listItem.append($listFav);
    var $buttonL = $(`<a name='View List' class='btn btn-primary' href='lists/${list.l_id}'>`);
    $buttonL.text('View List')
    $listItem.append($buttonL);
    $listItem.append($('<b>'));
    $listItem.append($('<b>'));
    // $listItem.append($('<input>').text("View List"));
    return $listItem;
  }

  function renderFavourites(lists, favs){
    console.log('I am in render favorites');
    lists.forEach( function (list) {
      $('#listfav').append(createFavourite(list, favs))
    });
  }


  $("#listfav").on('click', '.favoriteButton', function (e) {
    e.preventDefault();
    var lid = $(this).data('l_id')
    console.log('the button is clicked and this is the lid', lid)
    // $(this).children('.badge').text('1')
    // $(this).addClass('active');
    $.ajax({
      url: '/lists/add-fav',
      method: 'POST',
      data: {lid: lid},
      success: function(suc) {
        console.log('this is the success object', suc)
        console.log(suc.toFav);
        console.log(suc.counts);
        if (suc.toFav) {
          console.log('it is true ->' + suc.ToFav)
          $(e.target).addClass('active');
          $(e.target).children('.badge').text(suc.counts);
        } else {
          $(e.target).removeClass('active');
          $(e.target).children('.badge').text(suc.counts);
        }
        },
      error: function(err) {
        console.log(err);
        }
      });
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
        $loginError.text('Invalid email and password', err);
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



// Profile.ejs_||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



  $("#yourProf").on('click', function (e) {
    window.location=`/profiles/${global_username}`;
  });

  $(".newList").on('click', function (e) {
    e.preventDefault();
    var map_id = $(this).data('mid')
    console.log("here is the map_id I am fetching", map_id);
    var listTitle = $(this).closest('.newContributor').find('.listTitle').val();
    console.log(listTitle);
    var listDesc = $(this).closest('.newContributor').find('.listDesc').val();
    console.log(listDesc);
    var isPublic = ($(".public").is(":checked"));
    console.log(isPublic);


    $.ajax({
      url: '/lists/new',
      method: 'POST',
      data: {title: listTitle,
        description: listDesc,
        public: isPublic
      },
      success: function(suc) {

      window.location.href="../lists/" + suc.lid;

    },
      error: function(err) {
        console.log('Delete Error')
      }
    })
  });






//Lists.ejs_||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

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

  $(".addMap").on('click', function (e) {
    e.preventDefault();
    var newTitle = $(this).siblings(".newMapTitle").val();
    var newDesc = $(this).siblings(".newMapDesc").val();
    var lid = $(this).data('lid');

    $.ajax({
      url: '/maps/new',
      method: 'POST',
      data: {lid: lid,
      title: newTitle,
      description: newDesc },
      success: function(suc) {
        window.location.href="../maps/"+suc.mid;
      },
      error: function(err) {
        console.log('Add Map Error')
      }
    })
  });

  $(".addCont").on('click', function (e) {
    e.preventDefault();
    console.log("the add contributor button was clicked");
    var newContusername = $(this).siblings(".username").val();
    var lid = $(this).data('lid');
    console.log('Here is the lid that was clicked', lid);


    $.ajax({
      url: lid + '/addContributor',
      method: 'POST',
      data: {username: newContusername},
      success: function(suc) {
        //Delete the map id article or refresh the page.
        var $contItem = $('<li>');
        $contItem.append(newContusername);
        $contItem.append($(`<a href="/profiles/${newContusername}" class="btn btn-primary">`).text('View user'))
        $('#lid_contributors').append($contItem)



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
