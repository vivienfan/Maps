$(document).ready(function () {

  renderShuffleImages();


  function renderShuffleImages() {
    // getting the list id from the url.
    var listId = window.location.pathname.slice(-1);
    var $sta = document.getElementsByClassName('showMaps');
    // call the ajax and receive an array of objects that containes the map id and the list images.

    $.ajax({
      url: "/lists/" + listId + "/get-img",
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        data.forEach(function(element){
          var $picMapTag = $($sta).find(".mImg-"+element.m_id);
          var arrayImages = element.img;
          // on load, take the first image. This is to avoid waiting for 2000 to finish intervaling it.
          if (element.img[0]) {
            $picMapTag.css("background-image", "url("+element.img[0].image+")");
            $picMapTag.css("background-size", "cover");
            $picMapTag.css("background-position", "center 30%");
            $picMapTag.css("background-repeat", "no-repeat");
            $picMapTag.css("height", "100%");
            $picMapTag.css("width", "auto");
          }
          // if there is a long array then call the shuffle. There is no point of calling the shuffle if the array's length is just one.
          if (element.img.length > 1) {
            setInterval(function() {shuffle2(arrayImages, $picMapTag); }, 2000);
          }
        });
      },

      error: function(err) {
        console.log('err');
        }
    });
  };

  function shuffle2 (imgs, tag) {
    if (imgs.length > 1 ){
      var i = Math.floor(Math.random() * imgs.length);
      $(tag).css("background-image", "url("+imgs[i].image+")");
    } else {
      console.log("no image");
    }
  };
});
