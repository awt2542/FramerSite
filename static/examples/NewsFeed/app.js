// Hide the button touch rects
PSD.BookmarkButton.opacity = 0
PSD.DiveBarButton.opacity = 0

// Set up the navigation menu
PSD.BookmarkScroll.superView = PSD.Screen
PSD.BookmarkScroll.x = 0
PSD.BookmarkScroll.y = PSD.Status.maxY - 1
PSD.BookmarkScroll.height = PSD.Screen.height - PSD.BookmarkScroll.y

// Set up the divebar menu
PSD.DiveBarScroll.superView = PSD.Screen
PSD.DiveBarScroll.maxX = PSD.Screen.width
PSD.DiveBarScroll.y = PSD.Status.maxY - 1
PSD.DiveBarScroll.height = PSD.Screen.height - PSD.DiveBarScroll.y

// Set up the news feed views
PSD.NewsFeed.superView = PSD.Screen
PSD.NewsFeed.x = PSD.BookmarkScroll.maxX
PSD.NewsFeed.y = PSD.Status.maxY
PSD.NewsFeed.style["z-index"] = 1000
PSD.FeedScroll.height = PSD.Screen.height - PSD.NewsFeed.y
PSD.BookmarkScroll.placeBefore(PSD.DiveBarScroll)

// A little helper for 2 -> 1x
halfSize = function(view) {
	view.scale = .5
	view.x = 0 - view.width / 4
	view.y = 0 - view.height / 4
}

halfSize(PSD.Phone)

animationCurve = "spring(1500,70,2500)"

// Set up the bookmark animations

showBookmarks = function() {
	PSD.BookmarkScroll.placeBefore(PSD.DiveBarScroll)
	PSD.NewsFeed.animate({
		properties: {x:PSD.BookmarkScroll.maxX},
		curve: animationCurve
	})
}

hideBookmarks = function() {
	PSD.NewsFeed.animate({
		properties: {x:0},
		curve: animationCurve
	})	
}

bookmarkToggle = utils.toggle(showBookmarks, hideBookmarks)

PSD.BookmarkButton.on("click", function() {
	bookmarkToggle()()
})

utils.delay(1000, hideBookmarks)


// Set up the divebar animations

showDivebar = function() {
	PSD.DiveBarScroll.placeBefore(PSD.BookmarkScroll)
	PSD.NewsFeed.animate({
		properties: {x:0-PSD.DiveBarScroll.width+1},
		curve: animationCurve
	})
}

hideDivebar = function() {
	PSD.NewsFeed.animate({
		properties: {x:0},
		curve: animationCurve
	})	
}

divebarToggle = utils.toggle(showDivebar, hideDivebar)

PSD.DiveBarButton.on("click", function() {
	divebarToggle()()
})



// Set up the photo animations


clickToZoom = function(photoView) {

	offset = 200

	zoomInPhoto = function() {
	
		currentPhotoView = photoView.superView
		currentPhotoViewFrame = photoView.frame

		screenFrame = photoView.screenFrame()
		screenFrame.y = (screenFrame.y / 2) + 2
	
	
		photoView.scale = .5
		photoView.superView = null
		photoView.frame = screenFrame

		photoView.animate({
			properties: {scale:1.14/2, y:16},
			curve: animationCurve
		})

		PSD.Screen.animate({
			properties: {opacity:0.1},
			curve: animationCurve
		})
	

	}

	zoomOutPhoto = function() {
	
		animation = photoView.animate({
			properties: {scale:.5, y:screenFrame.y},
			curve: animationCurve
		})

		PSD.Screen.animate({
			properties: {opacity:1},
			curve: animationCurve
		})
	
		animation.on("end", function() {
			photoView.superView = currentPhotoView
			photoView.scale = 1
			photoView.frame = currentPhotoViewFrame
		})

	}

	toggler = utils.toggle(zoomInPhoto, zoomOutPhoto)

	photoView.on("click", function() {
		toggler()()
	})

}

clickToZoom(PSD.Photo)

