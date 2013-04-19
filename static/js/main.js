NavigationMap = {
	"": 			"about",
	"learn": 		"learn",
	"examples": 	"examples",
	"docs": 		"docs",
	"community": 	"community",
}

$(function(){
	
	// Set the body class to the sub page
	
	var className = "about";
	var parts = window.location.pathname.split("/");
	
	if (parts.length > 2) {
		if (NavigationMap.hasOwnProperty(parts[1])) {
			className = NavigationMap[parts[1]];
		};
	};
		
	$("body").addClass(className);
	
	// Select the menu link
	
	$("#global-nav li." + className).addClass("selected");
	
});