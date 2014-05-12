updateActive = (doScroll=true) ->
	offset = 0
	fromTop = $(window).scrollTop();
	activeAnchor = null
	
	$("a").map ->
		anchor = $(this)
		
		if anchor.offset().top < fromTop + offset
			activeAnchor = anchor
			
	if activeAnchor			
		className = activeAnchor.attr "name"
		$("#sidebar a").removeClass "active"
		$("#sidebar a.#{className}").addClass "active"	
		$("#sidebar a.#{className}").parent().parent().addClass "appear"
		
		`(function() {
			var offsetThree = window.matchMedia( "(max-height: 700px)" );
			
			if (offsetThree.matches) {
				learnScroll = 0
				docsScroll = 0
				moreScroll = 30
			}
			
		})();`
		
		`(function() {
			var offsetFour = window.matchMedia( "(max-height: 650px) and (min-height: 620px)" );
			
			if (offsetFour.matches) {
				learnScroll = 0
				docsScroll = 0
				moreScroll = 60
			}
			
		})();`

		
		if doScroll
			$("#sidebar.learn").scrollTop($("#sidebar").scrollTop() + learnScroll);	
			$("#sidebar.docs").scrollTop($("#sidebar").scrollTop() + docsScroll);	
			$("#sidebar.more").scrollTop($("#sidebar").scrollTop() + moreScroll);			
		
$(window).scroll -> updateActive false
$(window).resize -> updateActive false
updateActive false
$(window).load -> updateActive true

$("#sidebar a").click ->
	$("#sidebar a").removeClass "active"
	$(this).addClass "active"	
