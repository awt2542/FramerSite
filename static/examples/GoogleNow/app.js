// By Noah Levin - www.nlevin.com

// Settings
animateInCurve = "spring(400,30,200)";
animateOutCurve = "spring(350,30,100)";
noBounceCurve = "ease-out"
noBounceCurveSpeed = "220";

// Animate to Now View
gotoNow = function() {
	
	PSD.ColorLogo.animate({
		properties: {
			y: 70,
			scale: 0.665,
			opacity: 0
		},
		curve: animateInCurve
	});

	PSD.WhiteLogo.animate({
		properties: {
			y: 90,
			scale: 1,
			opacity: 1
		},
		curve: animateInCurve
	});

	PSD.StatusBar.animate({
		properties: {
			opacity: 1
		},
		curve: animateInCurve
	});

	PSD.Searchbox.animate({
		properties: {
			y: 205,
			scaleY: 0.90,
			scaleX: 1.0425
		},
		curve: animateInCurve
	});
	
	PSD.TrafficCard.animate({
		properties: {
			y: -560,
			scale: 1
		},
		curve: animateInCurve
	});
	
	PSD.MovieCard.animate({
		properties: {
			y: -74,
			scale: 1
		},
		curve: animateInCurve
	});
	
	PSD.TimeCard.animate({
		properties: {
			y: 840,
			scale: 1
		},
		curve: animateInCurve
	});
	
	PSD.Context.animate({
		properties: {
			opacity: 1,
			y: -20
		},
		curve: noBounceCurve,
		time: noBounceCurveSpeed
	});

	PSD.Mic.animate({
		properties: {
			x: 550,
			y: 242
		},
		curve: animateInCurve
	});
	
	PSD.Top.animate({
		properties: {
			y: -20,
			opacity: 0
		},
		curve: noBounceCurve,
		time: noBounceCurveSpeed
	});

	PSD.Background.animate({
		properties: {
			brightness: 100
		},
		curve: noBounceCurve,
		time: noBounceCurveSpeed
	})

};

// Animate back home
goHome = function() {
		
	PSD.ColorLogo.animate({
		properties: {
			y: 301,
			scale: 1,
			opacity: 1
		},
		curve: animateOutCurve
	});

	PSD.WhiteLogo.animate({
		properties: {
			y: 321,
			scale: 1.5,
			opacity: 0
		},
		curve: animateOutCurve
	});

	PSD.StatusBar.animate({
		properties: {
			opacity: 0
		},
		curve: animateOutCurve
	});
	
	PSD.Searchbox.animate({
		properties: {
			y: 470,
			scale: 1,
		},
		curve: animateOutCurve
	});
	
	PSD.TrafficCard.animate({
		properties: {
			y: 0,
			scale: .953
		},
		curve: animateOutCurve
	});
	
	PSD.MovieCard.animate({
		properties: {
			y: -36,
			scale: .92
		},
		curve: animateOutCurve
	});
	
	PSD.TimeCard.animate({
		properties: {
			y: -20,
			scale: .88
		},
		curve: animateOutCurve
	});
	
	PSD.Top.animate({
		properties: {
			y: 22,
			opacity: 1
		},
		curve: animateOutCurve
	});
	
	PSD.Context.animate({
		properties: {
			opacity: 0,
			y: 0
		},
		curve: noBounceCurve,
		time: noBounceCurveSpeed
	});

	PSD.Mic.animate({
		properties: {
			x: 534,
			y: 508
		},
		curve: animateOutCurve
	});

	PSD.Background.animate({
		properties: {
			brightness: 104
		},
		curve: noBounceCurve,
		time: noBounceCurveSpeed
	})

};

// Hide cards that fall off the screen
PSD.Content.style.overflow = "hidden"

// Set stage
goHome();

// Click if desktop, touchstart if mobile to simulate dragging
pointerType = "click";
if (utils.isTouch()) {
	pointerType = "touchstart";
}

// Shrink view for desktop only
if (!utils.isMobile()) {
	document.body.className += "desktop";
}

// Trigger animation on click/tap anywhere
toggler = utils.toggle(gotoNow, goHome);

PSD.Content.on(pointerType, function(e) {
	var movePage;
	e.preventDefault();
	movePage = toggler();
	return movePage();
});