
_calculatedElements = []

calculateElements = ->

	# We calculate all items and positions here

	_calculatedElements = []
	
	$("#wrapper a[name]").map (index, anchor) ->
		_calculatedElements.push
			offset:  $(anchor).offset().top
			name: $(anchor).attr("name")

highlightNavigation = ->

	fromTop = $(window).scrollTop()

	itemsAboveViewPort = []
	itemsInsideViewPort = []
	itemsBelowViewPort = []

	for item in _calculatedElements
		
		if item.offset - fromTop < 0
			itemsAboveViewPort.push item
		else if item.offset - fromTop > window.innerHeight
			itemsBelowViewPort.push item
		else
			itemsInsideViewPort.push item


	# Ideally we select the first visible item
	if itemsInsideViewPort.length > 0
		bestItem = itemsInsideViewPort[0]

	# If there are no item visible we select the last visible one
	else if itemsAboveViewPort.length > 0
		bestItem = itemsAboveViewPort[itemsAboveViewPort.length-1]

	# Otherwise the next visible one
	else
		bestItem = itemsBelowViewPort[0]

	console.log "Best item #{bestItem?.name}"

	className = bestItem.name
	$("#sidebar a").removeClass "active"
	$("#sidebar a.#{className}").addClass "active"	
	$("#sidebar a.#{className}").parent().parent().addClass "appear"


$(window).load ->
	calculateElements()
	$(window).scroll highlightNavigation

$(window).scroll ->
	calculateElements()
	highlightNavigation()

$(window).resize ->
	calculateElements()
	highlightNavigation()


