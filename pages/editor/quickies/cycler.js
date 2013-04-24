// Cycle through a set of values on click

var view = new View({
	x:100, 
	y:100, 
	width:100, 
	height:100
});

view.style.padding = "30px";

// The cycler function will emit the next value in the
// list every time you call it.
cycler = utils.cycle(0.2, 0.5, 1.0, 2.0);

view.on("click", function() {
	
	// Here we get the next scale value in line
	var nextScale = cycler();
	
	view.animate({
		properties: {scale:nextScale},
		curve: "ease-in-out"
	});
	
	view.html = "Scale " + nextScale;
})
