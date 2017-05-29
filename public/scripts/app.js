$(document).ready(function() {
  // This is for checking if there is global username then hide certian objects.
  var global_username = '';
  var global_email = '';

  $('.dropdown').addClass('hide');
  renderListsForHome();

  $.ajax({
    url: '/me',
    method: 'GET',
    dataType: 'json',
    success: function(suc) {
      if (suc) {
        //Hide register and login buttons
        global_username = suc.username;
        global_email = suc.email;
        $('#display_username').text(`Hello ${global_username}!`);
        $('#login_nav').addClass('hide');
        $('#reg_nav').addClass('hide');
        $('.dropdown').removeClass('hide');

      }
    }
  });

  function renderListsForHome() {
    $.ajax({
      url: '/lists',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        if (data.publics) {
          renderFavourites(data.publics, data.favs)
        }

      },
      error: function(err) {
        console.log('err');
        }
    });
  }

  function isFaved(lid, favs) {
    let flag = false;
    favs.forEach((element) => {
      if (lid === element.l_id) {
        flag = true;
      }
    });
    return flag;
  }

  function createFavourite(list, favs) {

    // this is to create an individual list.

    var $topFavContainer = $('<section style="margin-bottom: 50px;">');
    var $titleFav = $('<div>');
    $titleFav.addClass('row');
    //Create the title
    var $listTitle =$('<div>');
    $listTitle.addClass('col-md-2 col-md-offset-3');
    $title = $(`<a href='lists/${list.l_id}'>`);
    $title.append($('<b>').text(list.title));
    $listTitle.append($title);
    $titleFav.append($listTitle);

    //Creation of the Fav Button
    var $listFav = $('<div>');
    var $listFavButton = $(`<a class='btn btn-default favoriteButton' data-l_id='${list.l_id}'>`)
    $listFavButton.text('  Favourite');
    $listFav.addClass('col-md-2 col-md-offset-2');
    if (list.count === null){
      // then don't display null display zero instead.
      var $spanBadge = $('<span>');
      $spanBadge.addClass('badge');
      $spanBadge.text("0");
      $listFavButton.prepend($spanBadge);
      $listFav.append($listFavButton);

    } else {
      var $spanBadge = $('<span>');
      $spanBadge.addClass('badge');
      $spanBadge.text(list.count);
      $listFavButton.prepend($spanBadge);

      if (favs && favs.length !== 0){
        if (isFaved(list.l_id, favs)){
          // If the button is favorted show that its liked.
          $listFavButton.removeClass('btn btn-default');
          $listFavButton.addClass('btn btn-success');
        }
      }
      $listFav.append($listFavButton);
    }
    $titleFav.append($listFav);

    $topFavContainer.append($titleFav);
    // Ths is to append image right below the titile and the fav button.
    if (list.img.length !== 0) {
      var $imageRow = $('<div>');
      $imageRow.addClass('row');
      var $divImage = $("<div class ='frontImage'>");
      var $image = $(`<div id="imgdata-${list.l_id}" height="100%" width="100%">`);
      if (list.img[0]) {
        $image.css("background-image", "url("+list.img[0].image+")");
        $image.css("background-size", "cover");
        $image.css("background-position", "center 30%");
        $image.css("background-repeat", "no-repeat");
        $image.css("height", "100%");
        $image.css("width", "auto");
      }
      // Shuffle Images every 2 seconds.
      if (list.img.length > 1){
        setInterval(function() { shuffle(list.img, $image); } , 2000);
      }
      $divImage.addClass('col-md-8 col-md-offset-2 ');
      $divImage.append($image);
      $imageRow.append($divImage);
    }

    $topFavContainer.append($imageRow);
    // ths is for the Discritpion.
    var $listRow =$('<div>');
    $listRow.addClass=('row');
    $listDesc = $('<div>')
    $listDesc.addClass('col-md-12');
    $listDesc.append(`${list.description}`);
    $listRow.append($listDesc);
    $topFavContainer.append($listRow);
    $topFavContainer.append('<br>');
    $topFavContainer.append('<br>');
    // And then Finally append to the main container.
    return $topFavContainer;
  }




  function renderFavourites(lists, favs){
    // this is for rendering ever favorite list.
    lists.forEach( function (list) {
      $('#listfav').append(createFavourite(list, favs));
    });
  }

  function shuffle (imgs, tag) {
    // find random i between the 0 and length.
    var i = Math.floor(Math.random() * imgs.length);
    $(tag).css("background-image", "url("+imgs[i].image+")");
  }


  $("#listfav").on('click', '.favoriteButton', function (e) {
    e.preventDefault();
    // if the user is logged or in this case if global_username has a truthy value, allow the person to click.
    if (global_username) {
      var lid = $(this).data('l_id');
      // sending the lid that will be deleted. and will receive an object that has counts and a boolean to know whether or not if the use has favorited.
      $.ajax({
        url: '/lists/add-fav',
        method: 'POST',
        data: {lid: lid},
        success: function(suc) {
          if (suc.toFav) {
            // if its favorited then change the class to show that it is facvorited.
            $(e.target).removeClass('btn btn-default');
            $(e.target).addClass('btn btn-success');
          } else {
            // This is for unfavoriting the list.
            $(e.target).removeClass('btn btn-success');
            $(e.target).addClass('btn btn-default');
          }
          $(e.target).children('.badge').text(suc.counts);
          },
        error: function(err) {
          console.log(err);
          }
        });
      };
    });

  // LOGIN
  $("#register").on('click', function (e) {
    e.preventDefault();
    var email = $(this).siblings(".reg_email").val();
    var password = $(this).siblings(".reg_password").val();
    var username = $(this).siblings(".reg_username").val();

    $.ajax({
      url: '/register/',
      method: 'POST',
      data: {email: email,
        password: password,
         username: username},
      dataType: 'json',
      success: function(suc) {
        //Hide register and login buttons
        global_username = suc.username;
        global_email = suc.email;
        $('#display_username').text(`Hello ${global_username}!`);
        $('#login_nav').addClass('hide');
        $('#reg_nav').addClass('hide');
        $('#regmodal').modal('hide');
        $('.dropdown').removeClass('hide');
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
    var email = $(this).siblings(".login_email").val();
    var password = $(this).siblings(".login_password").val();
    // sending email and password and will receive the username and email.
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
        $('.dropdown').removeClass('hide');
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
    // triggure the ajax event where the user loggs out and will automatically refresh its page.
    $.ajax({
      url: '/logout/',
      method: 'POST',
      success: function() {
        //Show register and login button.
        global_username = "";
        global_email = "";
        $('#display_username').text(`Hello ${global_username}!`);
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
    var map_id = $(this).data('mid');
    var listTitle = $(this).closest('.newContributor').find('.listTitle').val();
    var listDesc = $(this).closest('.newContributor').find('.listDesc').val();
    var isPublic = ($(".public").is(":checked"));
    // sending listTitle, listDesc and a boolean of isPublic and will receive a new lid for the browser to automatically go to.
    $.ajax({
      url: '/lists/new',
      method: 'POST',
      data: {title: listTitle,
        description: listDesc,
        public: isPublic
      },
      success: function(suc) {
      // if its successful then go to the newly created list.
      window.location.href="../lists/" + suc.lid;
    },
      error: function(err) {
        console.log('Create list error');;
      }
    });
  });
  $(".userContributions").on('click', '.delList', function (e) {
    var lid = $(this).data('lid');
    var dList = $(this).closest('.delRow');

    $.ajax({
      url: '/lists/' + lid,
      method: 'DELETE',
      success: function(suc) {
        // then empty the list.
        $(dList).empty();
      },
      error: function(err) {
        console.log('Create contributor error;')
      }
    });
  });
//Lists.ejs_||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  $(".deleteMap").on('click', function (e) {
    e.preventDefault();
    var map_id = $(this).data('mid')
    var divDelete = $(this).closest('.divMap');

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
    });
  });

  $(".addMap").on('click', function (e) {
    e.preventDefault();
    var newTitle = $(this).siblings(".newMapTitle").val();
    var newDesc = $(this).siblings(".newMapDesc").val();
    var lid = $(this).data('lid');
    // add a map by sending lid, title, and the description, and receive a new m_id.
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
        console.log('Add Map Error');
      }
    });
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
      var delContusername = $(this).data('cont')
      var delLid = $(this).data('clid');

      var divDeleteCont = $(this).closest('.divCont')

      // send the username and then delete the container.
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
