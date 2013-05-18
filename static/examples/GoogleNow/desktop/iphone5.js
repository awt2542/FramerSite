// iPhone
iphone = new ImageView({
  width:764, height:1604, x: 20, y: 20
});
iphone.image = "desktop/iphone5-white.png";
iphone.style.backgroundColor = "transparent";

// Screen within iPhone container
screen = new View({
  x: 62, y:236,
  width:640, height:1136,
  superView:iphone
});

utils.delay(100, function() {
  document.getElementById("FramerRoot").className = 'scaledown';
})

// Place content into the screen
PSD["Content"].superView = screen;
PSD["StatusBar"].superView = screen;