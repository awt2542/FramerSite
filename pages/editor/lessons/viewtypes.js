
// Create a scrollable view
scrollView = new ScrollView({
	x:10, y:10,
	width:400, height:400
})

scrollView.style.backgroundColor = "#000"

// Add an image to the scrollview
imageView = new ImageView({
	width:1188/2, height:893/2,
	image: "/static/img/background.jpg",
	superView:scrollView});

// And some text
textView = new View({
	y: 10,
	width:400, height:20,
	image: "/static/img/background.jpg",
	superView:scrollView});

textView.html = "Pretty Image"
textView.style.backgroundColor = "transparent"