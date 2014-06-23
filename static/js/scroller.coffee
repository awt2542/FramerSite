
_calculatedElements = []
_lastSelectedElementName = null
_startListeningForScroll = false


selectItemNamed = (className) ->

	if className in ["examples", "community"]
		return

	$("#sidebar a").removeClass "active"
	$("#sidebar a.#{className}").addClass "active"	
	

calculateElements = ->

	# We calculate all items and positions here

	_calculatedElements = []
	
	$("#wrapper a[name]").map (index, anchor) ->
		_calculatedElements.push
			offset:  $(anchor).offset().top + 60
			name: $(anchor).attr("name")

highlightNavigation = ->

	if _startListeningForScroll is false
		return

	fromTop = $(window).scrollTop()

	itemsAboveViewPort = []
	itemsInsideViewPort = []
	itemsBelowViewPort = []

	for item in _calculatedElements
		
		if item.offset - fromTop < 0
			itemsAboveViewPort.push item
		else if item.offset - fromTop > window.innerHeight - (window.innerHeight * 0.1)
			itemsBelowViewPort.push item
		else
			itemsInsideViewPort.push item


	if fromTop < (window.innerHeight * 0.1)
		bestItem = _calculatedElements[0]

	else if fromTop + window.innerHeight > document.height - (window.innerHeight * 0.1)
		bestItem = _calculatedElements[_calculatedElements.length-1]
		
	
	else
	
		# Ideally we select the first visible item
		if itemsInsideViewPort.length > 0
			bestItem = itemsInsideViewPort[0]
	
		# If there are no item visible we select the last visible one
		else if itemsAboveViewPort.length > 0
			bestItem = itemsAboveViewPort[itemsAboveViewPort.length-1]
	
		# Otherwise the next visible one
		else
			bestItem = itemsBelowViewPort[0]
	
	# console.log "Best item #{bestItem?.name}"
	
	if _lastSelectedElementName == bestItem?.name
		selectItemNamed bestItem?.name
	
	_lastSelectedElementName = bestItem?.name
	$.cookie "nav", _lastSelectedElementName


$(window).load ->
	
	calculateElements()
	
	# if window.location.hash

	hash = window.location.hash[1..]

	_startListeningForScroll = true

	if hash
		selectItemNamed hash
	else
		highlightNavigation()
	
	$(window).scroll highlightNavigation

	

$(window).scroll ->
	calculateElements()
	highlightNavigation()

$(window).resize ->
	calculateElements()
	highlightNavigation()

$("#sidebar a").click ->

	clickedClass = $(this).attr("class")

	# $.cookie "nav", clickedClass
	selectItemNamed clickedClass


