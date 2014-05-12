// Define the imageLayer
imageLayer = new Layer({x:0, y:0, width:115, height:121, image:"images/icon.png"})
imageLayer.center()
imageLayer.y = 50

// Define a set of states with names (the original state is 'default')
imageLayer.states.add({
	bounce: {scale: 0.8},
	hue: {hueRotate: -20},
	rotate: {rotationZ: 90},
})

// Set the default animation options
imageLayer.states.animationOptions = {
	curve: "spring(600,18,0)"
}

// On a click, go to the next state
imageLayer.on(Events.Click, function() {
	imageLayer.states.next()
})