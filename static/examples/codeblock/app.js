// Define the imageLayer
imageLayer = new Layer({x:0, y:0, width:115, height:121, image:"images/icon.png"})
imageLayer.center()
imageLayer.y = 38

window.onresize = function() {
	imageLayer.center()
	imageLayer.y = 38	
	imageLayer.x = parseInt(imageLayer.x)
	
}

// Define a set of states with names (the original state is 'default')
imageLayer.states.add({
	bounce: {scale: 0.6},
	hue: {hueRotate: -30, scale:1 },
	rotate: {rotationZ: 90, blur: 0, scale:1},
})

// Set the default animation options
imageLayer.states.animationOptions = {
	curve: "spring(600,16,0)"
}

// On a click, go to the next state
imageLayer.on(Events.Click, function() {
	imageLayer.states.next()
})

console.log(imageLayer.pixelAlign)