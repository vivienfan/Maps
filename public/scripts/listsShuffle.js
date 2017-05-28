$(document).ready(function () {

  renderShuffleImages()


  function renderShuffleImages() {
    console.log("shuffle image has started");
    console.log("location path ", window.location.pathname);
    var listId = window.location.pathname.slice(-1);

    var $sta = document.getElementsByClassName('showMaps')
    console.log("$sta, ",  $sta);

    var $children = $($sta).find("img")
    console.log("$children: ", $children )
    var $custom = $($sta).find(".img-1");
    console.log("Finding the custom attribute", $custom);

    console.log("and the listId I was able to get is: ", listId);
    console.log("/lists/" + listId + "/get-img")
    $.ajax({
      url: "/lists/" + listId + "/get-img",
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        console.log("data: ", data)
        console.log("First element of the data", data[0])
        console.log("data[0].m_id: ", data[0].m_id);
        console.log("data[0].img: ", data[0].img);

        data.forEach(function(element){
          console.log("element.m_id: ", element.m_id);
          console.log("For each function finding each element id: ", $($sta).find(".mImg-" + element.m_id))
          var $picMapTag = $($sta).find(".mImg-"+element.m_id);
          console.log("$picMapTag", $picMapTag);
          console.log("Array of images of " ,element.m_id, element.img);
          var arrayImages = element.img;

          if (element.img[0]) {
            $picMapTag.attr("src", element.img[0].image);
          }

          if (element.img.length > 1) {
            setInterval(function() {shuffle2(arrayImages, $picMapTag); }, 2000);
          }
        })

        // setInterval(function() {shuffle(data[0].),


      },

      error: function(err) {
        console.log('err');
        }
    });
  }


  function shuffle2 (imgs, tag) {
    console.log("shuffle2");
    console.log("imgs", imgs)
    console.log("tag", tag)
    if (imgs.length > 1 ){
      var i = Math.floor(Math.random() * imgs.length);
      console.log(imgs[i])
      console.log(imgs[i].image);
      $(tag).attr("src", imgs[i].image);
    } else {
      console.log("no image");
    }
  }



})
