

// Create an image view
imageView = new ImageView({
	x:10, y:10,
	width:300, height:400,
	image: "http://farm5.staticflickr.com/4005/4204497503_cacf3abe74_o.jpg"
});

imageView.html = "Image View"
imageView.style = {
	padding: "20px",
}

// Create a scrollable view
scrollView = new ScrollView({
	x:10, y:430,
	width:300, height:400
});

// And some text
textView = new View({
	width:scrollView.width, height:scrollView.height * 1.7,
	superView:scrollView
});

textView.html = "Scroll me.<br><br>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
textView.style = {
	padding: "20px",
	textAlign: "left"
}