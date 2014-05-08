updateActive = (doScroll=true) ->
	offset = 60
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
		$("#sidebar a.#{className}").parent().parent().parent().parent().parent().addClass "has-active"
		
		`offsetChangeThree = (function() {
			var offsetThree = window.matchMedia( "(max-height: 900px)" );
			
			if (offsetThree.matches) {
				learnScroll = 0
				docsScroll = 0
				moreScroll = 60
			}
			
		})();`
		
		`offsetChangeTwo = (function() {
			var offsetThree = window.matchMedia( "(max-height: 840px)" );
			
			if (offsetThree.matches) {
				learnScroll = 0
				docsScroll = 0
				moreScroll = 20
			}
			
		})();`
		
		`offsetChangeTwo = (function() {
			var offsetThree = window.matchMedia( "(max-height: 740px)" );
			
			if (offsetThree.matches) {
				learnScroll = 0
				docsScroll = 0
				moreScroll = 80
			}
			
		})();`
		
		`offsetChange = (function() {
			var offsetOne = window.matchMedia( "(max-height: 700px)" );
			
			if (offsetOne.matches) {
				learnScroll = 0
				docsScroll = 0
				moreScroll = 20
			}
			
		})();`

		
		if doScroll
			$("#sidebar.learn.has-active").scrollTop($("#sidebar a.#{className}").scrollTop() + learnScroll);	
			$("#sidebar.docs.has-active").scrollTop($("#sidebar a.#{className}").scrollTop() + docsScroll);	
			$("#sidebar.more.has-active").scrollTop($("#sidebar a.#{className}").scrollTop() + moreScroll);			
		
$(window).scroll -> updateActive false
$(window).resize -> updateActive false
updateActive true


$("#sidebar a").click ->
	$("#sidebar a").removeClass "active"
	$(this).addClass "active"
	