PSD.IntroView.opacity = 0


PSD.BottomBar.originalFrame = PSD.BottomBar.frame
PSD.BottomBar.y += PSD.BottomBar.height

PSD.Logo.opacity = 0

PSD.CodeButton.on("click", function() {
	window.open("/editor#example=Intro");
})

start = function() {
	
	// Fade in the intro view
	PSD.IntroView.animate({
		properties: {opacity:1},
		time: 100
	})
	
	// Move in the bottom bar
	utils.delay(100, function() {
		PSD.BottomBar.animate({
			properties: PSD.BottomBar.originalFrame,
			curve: "spring(500,50,2000)"
		})
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
	})
	
	

}



utils.delay(100, start)