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

 if ( $( "#sidebar" ).hasClass( "more" ) ) {
	$("#sidebar ul#more section").addClass("appear");
	$("#sidebar ul#more svg").hide();
}

/* ========================= */

 if ( $( "#sidebar" ).hasClass( "docs" ) ) {
	$("#sidebar ul#docs section").addClass("appear");
	$("#sidebar ul#docs svg").hide();
}

/* ========================= */

 if ( $( "#sidebar" ).hasClass( "learn" ) ) {
	$("#sidebar ul#learn section").addClass("appear");
	$("#sidebar ul#learn svg").hide();
}

/* ========================= */

 if ( $( "#sidebar" ).hasClass( "examples" ) ) {
	$("#sidebar ul#examples section").addClass("appear");
	$("#sidebar ul#examples svg").hide();
}

/* ========================= */

 if ( $( "#sidebar" ).hasClass( "start" ) ) {
	$("#sidebar ul#start section").addClass("appear");
	$("#sidebar ul#start svg").hide();
}

/* ========================= */

function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function setupDownloadLink() {

	if (isMobile()) {
		var mobileLink = "mailto:?subject=Check Out Framer Studio&body=Don't forget to check out Framer: http://framerjs.com"
		$("a.downloadfs").attr("href", mobileLink);

	} else {

		// var sparkleHost = "http://framerstudio-update.s3-website-us-east-1.amazonaws.com"
		var sparkleHost = "http://studio.update.framerjs.com"

		$.get(sparkleHost + "/latest.txt", function(result) {
			
			var downloadLink = sparkleHost + "/" + result;

			$("a.downloadfs").click(function(event) {

				event.preventDefault()

				ga('send', 'event', 'Download', 'Framer Studio', downloadLink);

				setTimeout(function() {
					window.location.href = downloadLink;
				}, 500);

			});
		});
		
	};
};

$(document).ready(function() {
	setupDownloadLink();
})

/* ========================= */
	 
$(document).ready(function() {
	


	var carouselNode = document.getElementById('carousel');

	if (carouselNode) {

		setTimeout(function() {
			document.getElementById('carousel-inapp').play();
		}, 1000);

		$(window).scroll(function() {
			if ($(window).scrollTop() > 1400){
				 document.getElementById('carousel').play();
			}	 
		});
		
		$('.screen').click(function() {
			document.getElementById('carousel').play();
		});

	}

	$("code").each(function(i, node) {

		// Set the default language to coffee script
		if (!node.getAttribute("data-language")) {
			node.setAttribute("data-language", "coffeescript");
		}

		// Strip empty lines at the beginning and end
		node.innerHTML = node.innerHTML.replace(/^\s+|\s+$/g, '');

	})
	
});
		

	
/*SVG*/


function pathAnimate(path, duration) {

	var initial_ts = new Date().getTime();
	var length = path.getTotalLength();
	var handle = 0;
	length = length + 30;
	 
	path.style.strokeDasharray = length + ' ' + length; 
	path.style.strokeDashoffset = length;
	
	var draw = function() {
	   var progress = (Date.now() - initial_ts)/duration;
	   if (progress >= 1) {
	     window.cancelAnimationFrame(handle);
	   } else {
	     path.style.strokeDashoffset = Math.floor(length * (1 - progress));
	     handle = window.requestAnimationFrame(draw);
	   }
	};
	
	draw();
}


var generatorPath = document.querySelector('#line-block svg path#cog');
var generatorCircle = document.querySelector('#line-block svg path#cog-circle');
var generatorCircleInner = document.querySelector('#line-block svg path#cog-circle-inner');

//var prototypesPath = document.querySelector('#line-block .right svg path');
//var prototypesPathiPhone = document.querySelector('#line-block .right svg path#iphone');
//var prototypesPathLines = document.querySelector('#line-block .right svg path#iphone-lines');
//var prototypesPathHome = document.querySelector('#line-block .right svg path#iphone-home');

var framerLineMid = document.querySelector('#line-block .right svg path#line-mid');
var framerHandleCircle = document.querySelector('#line-block .right svg path#handles');
var framerCircleCurve = document.querySelector('#line-block .right svg path#circle-curve');
var framerCircleMid = document.querySelector('#line-block .right svg path#circle-mid');
var framerCurve = document.querySelector('#line-block .right svg path#curve');

pathAnimate(generatorPath, 2000);
pathAnimate(generatorCircle, 3000);
pathAnimate(generatorCircleInner, 1000);

//pathAnimate(prototypesPath, 2000);
//pathAnimate(prototypesPathiPhone, 2000);
//pathAnimate(prototypesPathLines, 4000);

pathAnimate(framerLineMid, 1000);
pathAnimate(framerHandleCircle, 2000);
pathAnimate(framerCircleMid, 2000);
pathAnimate(framerCurve, 2400);
pathAnimate(framerCircleCurve, 1000);




