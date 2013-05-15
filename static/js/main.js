// To make images retina, add a class "2x" to the img element
// and add a <image-name>@2x.png image.

function isRetina() {
	
	// return true // You know, for testing!
	
	var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
					  (min--moz-device-pixel-ratio: 1.5),\
					  (-o-min-device-pixel-ratio: 3/2),\
					  (min-resolution: 1.5dppx)";

	if (window.devicePixelRatio > 1)
		return true;

	if (window.matchMedia && window.matchMedia(mediaQuery).matches)
		return true;

	return false;
};


function retina() {
	
	if (!isRetina()) {
		return;
	}
	
	$("img.2x").map(function(i, image) {
		
		var path = $(image).attr("src");
		
		path = path.replace(".png", "@2x.png");
		path = path.replace(".jpg", "@2x.jpg");
		
		$(image).attr("src", path);
	});
};


$(document).ready(function() {
	
	retina();
	
	// Manage the height of the more block
	function setMoreHeight() {
		$("#subpage").css("min-height", window.innerHeight - 40 + "px")
	}
	
	setMoreHeight()
	$(window).resize(setMoreHeight)
	
	// Set up the demos
	
	var demoNames = [
		{url: "Intro", name: "Introduction"},
		{url: "GoogleNow", name: "Google Now"},
		{url: "NewsFeed", name: "News Feed"},
	];
	
	var demoNamesCurrentIndex = 1000 * demoNames.length;

	function loadDemo(index) {
		console.log("loadDemo", demoNamesCurrentIndex, index, demoNames[index])
		
		$("#screen").attr("src", "/static/examples/" + demoNames[index].url + "/index.html");
		$("#title").html("" + demoNames[index].name + " – <a href='/editor/?example=" + demoNames[index].url + "' target='blank'>Show Code</a>");
	}

	function nextDemo() {
		demoNamesCurrentIndex++;
		loadDemo(demoNamesCurrentIndex % demoNames.length)
	}
	function prevDemo() {
		demoNamesCurrentIndex--;
		loadDemo(demoNamesCurrentIndex % demoNames.length)
	}
	
	// Only start loading the dramer demo after a second
	setTimeout(function() {
		loadDemo(demoNamesCurrentIndex % demoNames.length)
	}, 1000);
	
	$("#phone .buttonl").click(prevDemo)
	$("#phone .buttonr").click(nextDemo)
	
	
	
})