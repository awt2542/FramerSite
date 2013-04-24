
// Start with a view that will function as the
// superview. All other views will be subviews of this
view1 = new View({x:50, y:50, width:200, height:200});

// Add two subviews
view2 = new View({
	x:0, y:0,
	width:100, height:100, 
	superView:view1});

// You can also set it after creation
view3 = new View({
	x:100, y:100, 
	width:25, height:25});

view3.superView = view1;
