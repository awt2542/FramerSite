
// Set up a simple click event

view1 = new View({
	x:50, y:50, 
	width:200, height:100});

view1.html = "Click me";
view1.style.lineHeight = view1.height + "px";

view1.on("click", function(event) {
	view1.style.backgroundColor = utils.randomColor(0.7);
})


// You can listen to multiple events on a view

view2 = new View({
	x:50, y:200, 
	width:200, height:100});
	
view2.html = "Hover me";
view2.style.lineHeight = view2.height + "px";

view2.on("mouseover", function(event) {
	view2.style.backgroundColor = utils.randomColor(0.7);
});

view2.on("mouseout", function(event) {
	view2.style.backgroundColor = utils.randomColor(0.7);
});