PSD.IntroView.opacity = 0
PSD.Logo.opacity = 0
PSD.Text.opacity = 0

PSD.IntroButton.addClass("Button")
PSD.OverviewButton.addClass("Button")

PSD.IntroButton.on("click", function() {
	window.open("https://vimeo.com/66300587","new")
})

PSD.OverviewButton.on("click", function() {
	window.open("https://vimeo.com/74712901","new")
})


start = function() {
	
	// Fade in the intro view
	PSD.IntroView.animate({
		properties: {opacity:1},
		time: 100
	})
	
	// Make the logo appear
	utils.delay(500, function() {
		PSD.Logo.scale = .5
		PSD.Logo.animate({
			properties: {opacity:1, scale:1},
			curve: "spring(1500,30,2000)"
		})
	})

	// Rotate the logo
	utils.delay(1500 * 1, function() {
		PSD.Logo.animate({
			properties: {rotationX:360},
			curve: "spring(150,30,0)"
		})
	})
	
	// Rotate the logo again
	utils.delay(1500 * 2, function() {
		PSD.Logo.animate({
			properties: {rotationY:360},
			curve: "spring(150,30,0)"
		})
	})
	
	// Rotate the logo again
	utils.delay(1500 * 3, function() {
		PSD.Logo.animate({
			properties: {rotationZ:360},
			curve: "spring(150,30,0)"
		})
	})
	
	// Shake the logo
	utils.delay(1500 * 4, function() {
		oldX = PSD.Logo.x
		PSD.Logo.x -= 100
		PSD.Logo.animate({
			properties: {x:oldX},
			curve: "spring(1200,6,500)"
		})
		PSD.Text.animate({
			properties: {opacity:1},
			curve: "ease-in",
			time: 100
		})
	})

	// Bounce the logo on click
	utils.delay(1500 * 5, function() {
		PSD.Logo.on("click", function() {
			PSD.Logo.scale = 0.5
			PSD.Logo.animate({
				properties: {scale:1},
				curve: "spring(1200,6,500)"
			})
		})
	})


}



utils.delay(100, start)