// Hide the button touch rects
PSD.BookmarkButton.opacity = 0
PSD.DiveBarButton.opacity = 0

// Set up the navigation menu
PSD.BookmarkScroll.superView = PSD.Screen
PSD.BookmarkScroll.x = 0
PSD.BookmarkScroll.y = PSD.Status.maxY
PSD.BookmarkScroll.height = PSD.Screen.height - PSD.BookmarkScroll.y

// Set up the divebar menu
PSD.DiveBarScroll.superView = PSD.Screen
PSD.DiveBarScroll.maxX = PSD.Screen.width
PSD.DiveBarScroll.y = PSD.Status.maxY
PSD.DiveBarScroll.height = PSD.Screen.height - PSD.DiveBarScroll.y

// Set up the news feed views
PSD.NewsFeed.superView = PSD.Screen
PSD.NewsFeed.x = PSD.BookmarkScroll.maxX
PSD.NewsFeed.y = PSD.Status.maxY
PSD.NewsFeed.style["z-index"] = 1000
PSD.FeedScroll.height = PSD.Screen.height - PSD.NewsFeed.y
PSD.BookmarkScroll.placeBefore(PSD.DiveBarScroll)

animationCurve = "spring(600,40,500)"

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



	zoomInPhoto = function(photoView) {

		photoView.transitioning = true
		
		photoView.originalSuperView = photoView.superView
		photoView.originalFrame = photoView.frame
		photoView.originalScreenFrame = photoView.screenFrame()
		
		PSD.FeedScroll.scrollVertical = false
		
		photoView.superView = null
		photoView.frame = photoView.originalScreenFrame

		animation1 = photoView.animate({
			properties: {scale:1.04, y:(PSD.Screen.height - photoView.height) / 2},
			curve: animationCurve
		})

		animation2 = PSD.Screen.animate({
			properties: {opacity:0.1, scale:.98},
			curve: animationCurve
		})
		
		animation2.on("end", function() {
			photoView.transitioning = false
		})
	}

	zoomOutPhoto = function(photoView) {

		photoView.transitioning = true

		animation1 = photoView.animate({
			properties: {scale:1, y:photoView.originalScreenFrame.y},
			curve: animationCurve
		})

		animation2 = PSD.Screen.animate({
			properties: {opacity:1, scale:1},
			curve: animationCurve
		})
	
		animation1.on("end", function() {
			photoView.superView = photoView.originalSuperView
			photoView.frame = photoView.originalFrame
			
			PSD.FeedScroll.scrollVertical = true
			photoView.transitioning = false
		})

	}
	
	toggler = utils.toggle(zoomInPhoto, zoomOutPhoto)
	
	photoView.on("click", function() {
		
		if (photoView.transitioning) {
			return
		}

		toggler()(photoView)
	})


}

clickToZoom(PSD.Photo1)
clickToZoom(PSD.Photo2)
clickToZoom(PSD.Photo3)
clickToZoom(PSD.Photo4)

