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


function startFramerDemo() {
	$("#screen").attr("src", "/static/examples/Intro/index.html");
}

$(document).ready(function() {
	
	// Only start loading the dramer demo after a second
	setTimeout(startFramerDemo, 1000);
	
	retina();
	
	// // Manage the height of the more block
	// function setMoreHeight() {
	// 	$("#more").css("height", window.innerHeight - 40 + "px")
	// }
	// 
	// setMoreHeight()
	// $(window).resize(setMoreHeight)
	// 
	// // Set up navigation
	// 
	// function deepLink(href) {
	// 	
	// 	href = href.split("#")[1];
	// 	
	// 	var part1 = href.split("/")[0]
	// 	var part2 = href.split("/")[1]
	// 	
	// 	var url = "/more/" + part1 + ".html#" + part2;
	// 	
	// 	$("#main").attr("src", url);
	// 	
	// }
	// 
	// $("#more a").map(function(index, link) {
	// 	$(link).click(function() {
	// 		deepLink($(link).prop("href"));
	// 	})
	// })
	// 
	// // See if we arrived here with a link
	// if (window.location.hash) {
	// 	deepLink(window.location.hash);
	// }
	// 
	// // Header
	// 
	// function showHeader() {
	// 	$("#intro").show();
	// 	$("#phone").show();
	// }
	// 
	// function hideHeader() {
	// 	$("#intro").hide();
	// 	$("#phone").hide();
	// }
	
	// hideHeader()
	
	// $(document).scroll(function(event) {
	// 
	// 	if (($(window).scrollTop() + $(window).height()) > ($(document).height() - 10)) {
	// 		hideHeader()
	// 	}
	// 	
	// })
	
})