
// Create a view with some basic properties
view1 = new View({x:50, y:50, width:100, height:100});

// You can also set properties after creation
view2 = new View({width:100, height:100});
view2.x = view1.maxX; // most-right-point
view2.y = view1.maxY; // most-bottom-point

// Demonstrating scale and opacity properties
view3 = new View({x:320, y:100, width:100, height:100,});
view3.scale = 2.0;
view3.opacity = 0.5;