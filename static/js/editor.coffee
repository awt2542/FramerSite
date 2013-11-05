

################################################################
# SETUP

View.prototype._postCreate = ->
	@style.backgroundColor = "rgba(255,0,0,0.5)"

View.prototype.__insertElement = ->
	$("#canvas").append @_element



################################################################
# UTILITIES

urlVars = ->
	
	vars = {}
	
	# Hack hack hack....
	if window.location.href.indexOf("#") isnt -1
		data = window.location.href.split("#")[1]
	else
		data = window.location.search.replace("?", "")
		
	if data[-1..] is "/"
		data = data[0..(data.length - 2)]
	
	for pair in data.split("&")
		pair = pair.split("=")
		vars[pair[0]] = pair[1]
	
	return vars

debounce = (threshold, func, execAsap) ->
	timeout = false
	
	return debounced = ->
		obj = this
		args = arguments
		
		delayed = ->
			func.apply(obj, args) unless execAsap
			timeout = null
		
		if timeout
			clearTimeout(timeout)
		else if (execAsap)
			func.apply(obj, args)
		
		# timeout = setTimeout delayed, threshold || 100
		timeout = utils.delay threshold or 100, delayed


################################################################
# EDITOR

class Editor
	
	LocalSaveKey = "framer.editor.code:#{window.location.href}"
	
	constructor: ->
		
		@_editCount = 0
		@_savePoint = 0
		
		@_editor = ace.edit "editor"
	
		@_editor.session.setMode "ace/mode/javascript"
		@_editor.setTheme "ace/theme/twilight"
		
		@_editor.getSession().on "change", @_onChange
	
	run: debounce 300, ->
		console.log "run"
		@_run()
	
	setCode: (code) =>
		return if not code
		@_editor.setValue code
		@_editor.session.selection.clearSelection()
		@_editor.moveCursorTo 0, 0
		@_updateChangeCount()
	
	getCode: ->
		@_editor.getValue()

	fileUrl: -> urlVars().path
	
	exampleUrl: -> urlVars().example
	
	loadExample: (path, callback) ->
		
		path1 = "/static/examples/#{path}/framer/views.#{path}.js"
		path2 = "/static/examples/#{path}/framer/framer.js"
		path3 = "/static/examples/#{path}/framer/framerps.js"
		
		path4 = "/static/examples/#{path}/app.js"
		
		cssNode = $("<link/>", {
			rel: "stylesheet",
			type: "text/css",
			href: "/static/examples/#{path}/style.css"
		}).appendTo("head");
		
		$.getScript path1, =>
			$.getScript path2, =>
				
				Framer.config.baseUrl = "/static/examples/#{path}/"
				
				View.prototype.__insertElement = ->
					$("#canvas").append @_element
				
				@_getFile path3, (data) => 
					@_prependEval = data
					@loadFile path4, callback


	loadFile: (path) =>
		@_getFile path, (data) =>
			@setCode data
			@_editCount = 0

	
	_getFile: (path, success) ->
		$.ajax
			url: path
			dataType: "html"
			success: success
	
	_updateChangeCount: ->
		@_editCount += 1
	
	_onChange: =>
		@_updateChangeCount()
		# @_track "Editor", "Edit"
		@run()
		
	_clearTimers: =>
		# Clear the Framer timers
		if window._delayTimers
			for timer in window._delayTimers
				clearTimeout timer

	_run: =>

		console.log "_run"
		
		@_clearTimers()
		
		code = @getCode()
		return if not code

		$("#canvas").html("")
		eval @_prependEval if @_prependEval
		eval code
		
		
		
################################################################
# RUN

require(["ace"], (ace) ->

	window.ace = ace

	$(document).ready ->
		
		window.editor = new Editor()
		
		if editor.exampleUrl()
			editor.loadExample editor.exampleUrl()
		else if editor.fileUrl()
			editor.loadFile editor.fileUrl()

