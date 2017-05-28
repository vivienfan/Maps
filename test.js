$(document).ready(function() {
  var imgs = [
    "https://www.w3schools.com/css/trolltunga.jpg",
    "http://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg",
    "https://www.w3schools.com/css/img_lights.jpg"
  ];

  function shuffle () {
    console.log("shuffling");
    var i = Math.floor(Math.random() * imgs.length);
    $(".myImg").attr("src", imgs[i]);
  }

  setInterval(shuffle, 1500);
});

