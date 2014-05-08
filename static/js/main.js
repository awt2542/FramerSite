$('#topbar img').click( function(){
    $("#sidebar").toggleClass("appear");
});

// To make images retina, add a class "2x" to the img element
// and add a <image-name>@2x.png image. Assumes jquery is loaded.
 
function isRetina() {
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
	
	if (!isRetina())
		return;
	
	$("img.2x").map(function(i, image) {
		
		var path = $(image).attr("src");
		
		path = path.replace(".png", "@2x.png");
		path = path.replace(".jpg", "@2x.jpg");
		
		$(image).attr("src", path);
	});
};
 
$(document).ready(retina);


/* ========================= */

collapseMore = (function() {
	var queryMore = window.matchMedia( "(max-height: 1000px)" );
	if (queryMore.matches) {
			$('#sidebar ul#more li.headline').click( function(event){
				event.preventDefault();
			    $("#sidebar ul#more section").toggleClass("appear");
			    $("#sidebar ul#more").toggleClass("flip");
			    $("#sidebar").animate({"scrollTop": $("#sidebar").scrollTop() + 100});
			});
	}
	
	else {
		$("#sidebar ul#more li.headline").unbind("click");
		$("#sidebar ul#more section").removeClass("appear");
	}
})();

/* ========================= */

collapseDocs = (function() {
	var queryDocs = window.matchMedia( "(max-height: 880px)" );
	if (queryDocs.matches) {
			$('#sidebar ul#docs li.headline').click( function(event){
				event.preventDefault();
			    $("#sidebar ul#docs section").toggleClass("appear");
			    $("#sidebar ul#docs svg").toggleClass("flip");
			    $("#sidebar").animate({"scrollTop": $("#sidebar").scrollTop() + 100});
			});
	}
	
	else {
		$("#sidebar ul#docs li.headline").unbind("click");
		$("#sidebar ul#docs section").removeClass("appear");
	}
})();

/* ========================= */

collapseLearn = (function() {
	var queryLearn = window.matchMedia( "(max-height: 745px)" );
	
	if (queryLearn.matches) {
			$('#sidebar ul#learn li.headline').click( function(event){
				event.preventDefault();
			    $("#sidebar ul#learn section").toggleClass("appear");
			    $("#sidebar ul#learn svg").toggleClass("flip");
			});
	}
	
	else {
		$("#sidebar ul#learn li.headline").unbind("click");
		$("#sidebar ul#learn section").removeClass("appear");
	}
})();

/* ========================= */

collapseExamples = (function() {
	var queryExamples = window.matchMedia( "(max-height: 540px)" );
	
	if (queryExamples.matches) {
			$('#sidebar ul#examples li.headline').click( function(event){
				event.preventDefault();
			    $("#sidebar ul#examples section").toggleClass("appear");
			    $("#sidebar ul#examples svg").toggleClass("flip");
			});
	}
	
	else {
		$("#sidebar ul#examples li.headline").unbind("click");
		$("#sidebar ul#examples section").removeClass("appear");
	}
})();

/* ========================= */

collapseStart = (function() {
	var queryStart = window.matchMedia( "(max-height: 460px)" );
	
	if (queryStart.matches) {
			$('#sidebar ul#start li.headline').click( function(event){
				event.preventDefault();
			    $("#sidebar ul#start section").toggleClass("appear");
			    $("#sidebar ul#start svg").toggleClass("flip");
			});
	}
	
	else {
		$("#sidebar ul#start li.headline").unbind("click");
		$("#sidebar ul#start section").removeClass("appear");
	}
})();

/* ========================= */

$(window).resize(collapseMore);
$(window).resize(collapseDocs);
$(window).resize(collapseLearn);
$(window).resize(collapseStart);
