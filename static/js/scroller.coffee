$(document).ready ->
	updateActive = ->
		# offset = window.innerHeight / 4
		offset = 60
		
		# anchors = $("a").map -> $(this)
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
			
	$(window).scroll updateActive
	$(window).resize updateActive
	$(window).load updateActive
	
	$("#sidebar a").click ->
		$("#sidebar a").removeClass "active"
		$(this).addClass "active"



		
