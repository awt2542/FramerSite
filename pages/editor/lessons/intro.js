
// Set up the phone frame
iphone = new ImageView({
	x:20, y:20,
	width:380, height:743});
	
iphone.image = "/static/img/iphone@1x.png";
iphone.style.backgroundColor = "transparent";


// Add a content view that will contain all ui
content = new View({
	x: 32, y:132,
	width:320, height:480,
	superView:iphone});

content.style.backgroundColor = "white";


// Set a nice background image
background = new ImageView({
	x:-480, y:-210,
	width:1188, height:893,
	image: "/static/img/background.jpg",
	superView:content});

background.scale = 0.55;

// Make a popover
popover = new ImageView({
	x:0, y:0,
	width:320, height:359,
	image: "/static/img/popover.png",
	superView:content});

// Hidden by default
popover.opacity = 0;
popover.style.backgroundColor = "transparent";

popoverText = new View({
	x:40, y:185,
	width:320-80, height:359,
	superView:popover});

// Add some text and styling
popoverText.html = "<h3>Alcatraz Island</h3><p>Alcatraz Island is located in the San Francisco Bay, 1.5 miles offshore from San Francisco, California, United States.</p>";

popoverText.style = {
	"font-size": "14px",
	"line-height": "18px",
	"font-weight": "normal",
	"background-color": "transparent",
	"text-align": "left",
	"color": "rgba(0,0,0,0.65)",
};


// On click we zoom in to the island and show the popover
zoomIn = function() {
	
	background.animate({
		properties: {x: -260, y: -150, scale: 1.0},
		curve: "spring(60,20,100)",
	});

	utils.delay(500, function() {
		popover.scale = 0.8;
		popover.animate({
			properties: {scale:1.0},
			origin: "50% 100%",
			curve: "spring(150,8,50)"
		});
		popover.animate({
			properties: {opacity:1.0},
			time: 100
		});
	});
};


// On zoom out we revert
zoomOut = function() {
	
	popover.animate({
		properties: {opacity: 0.0},
		curve: "ease-in",
		time: 50
	});
	
	utils.delay(100, function() {
		background.animate({
			properties: {x: -480, y: -210, scale: 0.55},
			curve: "spring(100,20,500)",
		});
	});
};


// Zoom in and out on clicks
toggler = utils.toggle(zoomOut, zoomIn);
iphone.on("click", function() {
	zoomer = toggler();
	zoomer();
});


// Autoplay
utils.delay(1000, zoomIn);
