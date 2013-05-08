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
PSD.NewsFeed.x = 0
PSD.NewsFeed.y = PSD.Status.maxY
PSD.FeedScroll.height = PSD.Screen.height - PSD.NewsFeed.y

// A little helper for 2 -> 1x
halfSize = function(view) {
	view.scale = .5
	view.x = 0 - view.width / 4
	view.y = 0 - view.height / 4
}

halfSize(PSD.Phone)

// Set up the bookmark animations

showBookmarks = function() {
	PSD.BookmarkScroll.style["z-index"] = 0
	PSD.DiveBarScroll.style["z-index"] = -1
	PSD.NewsFeed.animate({
		properties: {x:PSD.BookmarkScroll.maxX},
		curve: "spring(500,41,1500)"
	})
}

hideBookmarks = function() {
	PSD.NewsFeed.animate({
		properties: {x:0},
		curve: "spring(500,41,1500)"
	})	
}

bookmarkToggle = utils.toggle(showBookmarks, hideBookmarks)

PSD.BookmarkButton.on("click", function() {
	bookmarkToggle()()
})



// Set up the divebar animations

showDivebar = function() {
	PSD.BookmarkScroll.style["z-index"] = -1
	PSD.DiveBarScroll.style["z-index"] = 0
	PSD.NewsFeed.animate({
		properties: {x:0-PSD.DiveBarScroll.width+1},
		curve: "spring(500,41,1500)"
	})
}

hideDivebar = function() {
	PSD.NewsFeed.animate({
		properties: {x:0},
		curve: "spring(500,41,1500)"
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
			curve: "spring(500,41,1500)"
		})

		PSD.Screen.animate({
			properties: {opacity:0.1},
			curve: "spring(500,41,1500)"
		})
		

	}
	
	zoomOutPhoto = function() {
		
		animation = photoView.animate({
			properties: {scale:.5, y:screenFrame.y},
			curve: "spring(500,41,1500)"
		})

		PSD.Screen.animate({
			properties: {opacity:1},
			curve: "spring(500,41,1500)"
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
