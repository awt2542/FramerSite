// iOS like navigation controller view replacement

// The main scroll view
var contentView = new ScrollView({
	width:320, 
	height:480,
	clip: true
});

contentView.style.backgroundColor = "black"
contentView.scrollHorizontal = false


// This function inserts a new view in the content view

function showView(view) {
	
	// Remove the old view if there is one
	var previousView = contentView.subViews[0]
	

	
	// Reset the scroller to the top
	contentView.scrollFrame = {y:0}
	
	// Insert the requested view in the content view
	view.superView = contentView
	view.visible = true
	view.x = contentView.maxX

	// Animate the view in
	animation = view.animate({
		properties: {x:0},
		curve: "spring(700,80,1000)"
	})
	
	if (previousView) {
		animation.on("end", function() {
			previousView.visible = false
			previousView.superView = null
		})
	}

}


// Some cool views

viewA = new ImageView({width:320, height:650, 
	image:"http://farm5.staticflickr.com/4005/4204497503_cacf3abe74_o.jpg"});
viewA.visible = false
viewA.html = "Nice Bridge"
viewA.style.padding = "20px"


viewB = new ImageView({width:320, height:650, 
	image:"http://farm1.staticflickr.com/50/142237771_e0922b13d3_b.jpg"});
viewB.visible = false
viewB.html = "Nice Sky"
viewB.style.padding = "20px"


// Set up the click handlers

viewA.on("click", function() {showView(viewB)})
viewB.on("click", function() {showView(viewA)})

showView(viewA)