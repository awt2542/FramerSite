// Switch out two simple views on a click

// This is a very verbose way to do it, just 
// to show the sheer basics.


var viewA = new View({
	x:100, 
	y:100, 
	width:400, 
	height:400
});

var viewB = new View({
    x:100, 
	y:100, 
	width:400, 
	height:400
});

// Add some styling

viewA.style.backgroundColor = "rgba(255,0,0,.5)"
viewB.style.backgroundColor = "rgba(0,0,255,.5)"

viewA.html = "Click me!"
viewB.html = "Me too!"

// By default, view B is invisible

viewB.visible = false


// Switch visibility on clicks

viewA.on("click", function() {
    viewA.visible = false
    viewB.visible = true 
})

viewB.on("click", function() {
    viewA.visible = true
    viewB.visible = false 
})