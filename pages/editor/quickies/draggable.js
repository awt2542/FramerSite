// An angry little view that does not want to be moved

var myView = new View({
	x:100, y:100, width:100, height:100
});

function updatePosition(event) {
	
	// Update the position of the view, we need to correct
	// for the fact that this editor has a vertical split
	// hence the: (window.innerWidth / 2)
	myView.midX = event.x - (window.innerWidth / 2)
	myView.midY = event.y
}

// Listen for a click and start updating the position
myView.on("mousedown", function(event) {
	
	myView.animateStop()
	
	document.addEventListener("mousemove", updatePosition)

	// Stop udating the position on click release
	document.addEventListener("mouseup", function(event) {
		document.removeEventListener("mousemove", updatePosition)
		
		myView.animate({
			properties: {
				x: 100,
				y: 100,
			},
			curve: "spring(1500,15,0)"
		})
	})
})

