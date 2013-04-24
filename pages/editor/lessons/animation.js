// A more explicit example showing off multiple
// animation curves

exampleCurves = [
	"linear",
	"ease-in-out",
	"cubic-bezier(.9,.2,.1,.8)",
	"spring(20,1,0)",
	"spring(100,5,500)",
	"spring(1000,20,500)",
];

// Loop over all the curves
exampleCurves.map(function(curve, i) {
	
	view = new View({width:180, height:50, 
		x:50, y:50 + (70 * i)});
	
	view.html = curve;
	
	view.style = {
		lineHeight: view.height + "px",
		color: "#fff",
		fontSize: "13px",
		textAlign: "center"
	};
	
	// Create two animations moving from left to right
	animation1 = new Animation({
		view:view,
		properties:{x:300},
		curve: curve,
		time: 1000
	});

	animation2 = animation1.reverse();

	// Make sure they loop
	animation1.on("end", animation2.start);
	animation2.on("end", animation1.start);
	animation1.start();
});
