$(document).ready ->
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
			
			if doScroll
				
				$("#sidebar.has-active").scrollTop($("#sidebar a.#{className}").scrollTop() + 80);			
			
	$(window).scroll -> updateActive false
	$(window).resize -> updateActive false
	$(window).load -> updateActive true
	
	
	$("#sidebar a").click ->
		$("#sidebar a").removeClass "active"
		$(this).addClass "active"


