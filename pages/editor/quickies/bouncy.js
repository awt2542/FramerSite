// Bouncy Dialog Example

// Click the dialog to bounce it

view = new View({
	x: 50, 
	y: 50, 
	width: 150, 
	height: 150
});

// Listen for clicks on the view
view.on("click", function() {

	// Wind up the spring by setting the scale
	view.scale = 0.4;

	// Animate back to full scale with a spring
	view.animate({
		properties: {scale:1.0},
		curve: "spring(1000,15,1000)"
	});
});
