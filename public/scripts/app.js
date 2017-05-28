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

    var $topFavContainer = $('<section>')
    var $titleFav = $('<div>')
    $titleFav.addClass('row');

    var $listTitle =$('<div>');
    $listTitle.addClass('col-md-2 col-md-offset-3');
    $title = $(`<a href='lists/${list.l_id}'>`)
    $title.append($('<b>').text(list.title))
    $listTitle.append($title);
    $titleFav.append($listTitle);


    var $listFav = $('<div>');
    var $listFavButton = $(`<a class='btn btn-primary favoriteButton' data-l_id='${list.l_id}'>`)
    $listFavButton.text('  Favourite');
    $listFav.addClass('col-md-2 col-md-offset-2');
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
    $titleFav.append($listFav);

    $topFavContainer.append($titleFav);

    $imageRow = $('<div>');
    $imageRow.addClass('row');
    $divImage = $('<div>');
    $image = $(`<img id="imgdata-${list.l_id}" height="50%" width="50%">`);
    if (list.img[0]) {
      $image.attr("src", list.img[0].image);
    }

    console.log("hhhhhhhherrreeeeee:", $image);

    setInterval(function() { shuffle(list.img, $image); } , 2000);

    $divImage.addClass('col-md-12');
    $divImage.append($image);
    $imageRow.append($divImage)

    $topFavContainer.append($imageRow);

    var $listRow =$('<div>');
    $listRow.addClass=('row');
    $listDesc = $('<div>')
    $listDesc.addClass('col-md-12');
    $listDesc.append(`${list.description}`);
    $listRow.append($listDesc);
    $topFavContainer.append($listRow);
    $topFavContainer.append('<br>')
    $topFavContainer.append('<br>')

    // $listItem.append($('<input>').text("View List"));
    return $topFavContainer;
  }




  function renderFavourites(lists, favs){
    console.log('I am in render favorites');
    lists.forEach( function (list) {
      $('#listfav').append(createFavourite(list, favs))
    });
  }

  function shuffle (imgs, tag) {
    console.log("shuffle");
    if (imgs.length !== 0 ){
      var i = Math.floor(Math.random() * imgs.length);
      $(tag).attr("src", imgs[i].image);
    } else {
      console.log("no image");
    }
  }


  $("#listfav").on('click', '.favoriteButton', function (e) {
    e.preventDefault();
    if (global_username) {
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
          } else {
            $(e.target).removeClass('active');
          }
          $(e.target).children('.badge').text(suc.counts);
          },
        error: function(err) {
          console.log(err);
          }
        });
      }
    });

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
        location.reload();
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
        console.log('Create list console.error();')
      }
    })
  });
  $(".userContributions").on('click', '.delList', function (e) {
    console.log("Button is clicked");
    var lid = $(this).data('lid');
    console.log(lid)
    var dList = $(this).closest('.delRow')

    $.ajax({
      url: '/lists/' + lid,
      method: 'DELETE',
      success: function(suc) {

        $(dList).empty();

    },
      error: function(err) {
        console.log('Create list console.error();')
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
        var $newCont = $('<div>')
        $newCont.addClass('divCont')
        var $contItem = $('<li>');
        $contItem.append($(`<a href="/profiles/${newContusername}">`).text(newContusername))
        $contItem.append($(`<a class="btn btn-danger delCont" data-cont="${newContusername}" data-clid="${lid}">`).text('Delete'))
        $newCont.append($contItem)
        $('#lid_contributors').append($newCont)
        },
      error: function(err) {
        console.log('Delete Error')
        }
      })
    })

    $("#lid_contributors").on('click', ".delCont", function (e) {
      e.preventDefault();
      console.log("the del contributor button was clicked");
      var delContusername = $(this).data('cont')
      var delLid = $(this).data('clid');
      console.log('Here is the lid that was clicked->', delLid);
      console.log('here is the delContusername that was clciked->', delContusername)

      var divDeleteCont = $(this).closest('.divCont')
      $.ajax({
        url: '/lists/' + delLid + '/dropContributor',
        method: 'DELETE',
        data: { username: delContusername },
        success: function(suc) {
          //Delete the map id article or refresh the page.
          divDeleteCont.empty();
          },
        error: function(err) {
          console.log('Delete Error')
          }
        })
      })
});
