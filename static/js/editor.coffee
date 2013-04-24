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
	for pair in window.location.search.replace("?", "").split("&")
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
	
	LocalSaveKey = "framer.editor.code"
	
	constructor: ->
		
		@_editCount = 0
		@_savePoint = 0
		
		@_editor = ace.edit "editor"
	
		@_editor.session.setMode "ace/mode/javascript"
		@_editor.setTheme "ace/theme/twilight"
		
		@_editor.getSession().on "change", @_onChange
	
	run: debounce 100, ->
		@_run()
	
	setCode: (code) =>
		return if not code
		@_editor.setValue code
		@_editor.session.selection.clearSelection()
		@_editor.moveCursorTo 0, 0
		@_updateChangeCount()
	
	getCode: ->
		@_editor.getValue()
	
	saveLocal: ->
		localStorage.setItem @LocalSaveKey, @getCode()
		@_savePoint = @_editCount
		
	loadLocal: ->
		@setCode localStorage.getItem @LocalSaveKey
		@run()

	fileUrl: -> urlVars().path
	
	gistId: -> urlVars().gist

	loadFile: (path) =>
		$.get path, (data) =>
			@setCode data
	
	loadGist: ->
		
	saveGist: ->
		$.get path, (data) ->
			editor.setValue data
			editor.session.selection.clearSelection()
			editor.moveCursorTo 0,0
	
	_updateChangeCount: ->
		@_editCount += 1
	
	_onChange: =>
		@_updateChangeCount()
		@_track "Editor", "Edit"
		@run()
		
	_clearTimers: ->
		# Clear the Framer timers
		if window._delayTimers
			for timer in window._delayTimers
				clearTimeout timer
	
	_track: debounce 500, (module, type, data)->
		return if @_editCount < 6
		_gaq.push ["_trackEvent", module, type, data]
	
	_run: =>
		
		@_clearTimers()
		
		code = @getCode()
		return if not code

		$("#canvas").html("")
		eval code
		
		# try
		# 	$("#canvas").html("")
		# 	eval code
		# 	# console.log "Success", error
		# catch error
		# 	console.log "Error", error
		# 	@_track "Editor", "Error"
		
		@saveLocal()
		
		
################################################################
# RUN

$(document).ready ->
	
	editor = new Editor()
	
	
	if editor.fileUrl()
		editor.loadFile editor.fileUrl()
	
	else
		editor.loadLocal()


	# utils.delay 500, ->
	# 	
	# 	# $.get "index.html", (data) ->
	# 	# 	console.log "loadFile", data
	# 
	# 	$.get "/static/js/quickies/bouncy.txt", (data) =>
	# 		console.log "loadFile", data
		







# 
# editor = null
# gist = null
# count = 0
# changes = false
# 
# debounce = (func, threshold, execAsap) ->
# 	timeout = false
# 	
# 	return debounced = ->
# 		obj = this
# 		args = arguments
# 		
# 		delayed = ->
# 			func.apply(obj, args) unless execAsap
# 			timeout = null
# 		
# 		if timeout
# 			clearTimeout(timeout)
# 		else if (execAsap)
# 			func.apply(obj, args)
# 		
# 		# timeout = setTimeout delayed, threshold || 100
# 		timeout = utils.delay threshold or 100, delayed
# 
# urlVars = ->
# 	vars = {}
# 	for pair in window.location.search.replace("?", "").split("&")
# 		pair = pair.split("=")
# 		vars[pair[0]] = pair[1]
# 	return vars
# 
# _runCode = (code) ->
# 	
# 	# Clear the Framer timers
# 	if window._delayTimers
# 		for timer in window._delayTimers
# 			clearTimeout timer
# 	
# 	try
# 		$("#canvas").html("")
# 		eval code
# 	catch error
# 		console.log "Error", error
# 		trackError()
# 		
# 	trackEdit()
# 	
# 	count++
# 
# _trackEdit = ->
# 	if count > 1
# 		_gaq.push ['_trackEvent', 'Editor', 'Edit', vars.path]
# 
# _trackError = ->
# 	if count > 1
# 		_gaq.push ['_trackEvent', 'Editor', 'Error', vars.path]
# 
# 
# runCode = debounce _runCode, 100, false
# trackEdit = debounce _trackEdit, 3000, false
# trackError = debounce _trackError, 3000, false
# 
# loadFile = (path) ->
# 	if path isnt "/static/js/examples/intro.js"
# 		_gaq.push ['_trackEvent', 'Editor', 'Load', path]
# 	$.get path, (data) ->
# 		editor.setValue data
# 		editor.session.selection.clearSelection()
# 		editor.moveCursorTo 0,0
# 
# vars = {};
# 
# window.onbeforeunload = ->
# 	if gist and changes is true
# 		return "You have unsaved changes";
# 
# 
# _save = ->
# 	
# 	# console.log "Save that shit"
# 	# 
# 	# if gist
# 	# 	data =
# 	# 		description: "Gist saved from www.framerjs.com/editor.html"
# 	# 		files:
# 	# 			"main.js":
# 	# 				content: editor.getValue()
# 	# 
# 	# 	$.ajax
# 	# 		url: "https://api.github.com/gists/#{gist.id}"
# 	# 		data: JSON.stringify(data)
# 	# 		contentType:'application/json'
# 	# 		type: 'PATCH'
# 	# 		success: (data) ->
# 	# 			gist = JSON.parse data
# 	# 			window.location.href = "/editor.html?gist=#{data.id}"
# 	# 
# 	# 
# 	# else
# 	
# 	data =
# 		description: "Gist saved from www.framerjs.com/editor.html"
# 		public: true
# 		files:
# 			"main.js":
# 				content: editor.getValue()
# 
# 	$.ajax
# 		url: "https://api.github.com/gists"
# 		data: JSON.stringify(data)
# 		contentType:'application/json'
# 		type: 'POST'
# 		success: (data) ->
# 			data = JSON.parse data
# 			
# 			_gaq.push ['_trackEvent', 'Editor', 'Save', data.url]
# 
# 			setTimeout ->
# 				if window isnt window.top
# 					window.open "/editor.html?gist=#{data.id}"
# 				else
# 					window.location.href = "/editor/?gist=#{data.id}"
# 			, 300
# 			
# 	changes = false
	
	
# $(document).ready ->
# 	
# 	layoutClasses = "horizontal vertical full"
# 	layoutToggle = utils.toggle.apply this, layoutClasses.split " "
# 	$("#layout").click ->
# 		# console.log layoutToggle()
# 		$("#workspace").removeClass layoutClasses
# 		$("#workspace").addClass layoutToggle()
# 	
# 	$("#save").click -> _save()
# 	
# 	
# 	if window isnt window.top
# 		$("#toolbar").append $("<div id='fullscreen' class='button'>Fullscreen</div>")
# 		$("#fullscreen").click ->
# 			window.open window.location.href
# 	
# 	editor = ace.edit "editor"
# 	
# 	editor.session.setMode "ace/mode/javascript"
# 	editor.setTheme "ace/theme/twilight"
# 	
# 	vars = urlVars()
# 
# 	
# 	if vars.path
# 		loadFile vars.path 
# 	else if vars.gist
# 	
# 		$.getJSON "https://api.github.com/gists/#{vars.gist}", (data) ->
# 			
# 			gist = data
# 			editor.setValue data.files["main.js"].content
# 			editor.session.selection.clearSelection()
# 			editor.moveCursorTo 0,0
# 			
# 			_gaq.push ['_trackEvent', 'Editor', 'Load Gist', data.url]
# 			
# 	else
# 	
# 		code = localStorage.getItem "framer.editor.code"
# 		
# 		if code
# 			editor.setValue code
# 			editor.session.selection.clearSelection()
# 			editor.moveCursorTo 0,0
# 		else
# 			loadFile "default.js"
# 	
# 
# 	editor.getSession().on "change", ->
# 		if count > 1
# 			changes = true
# 			
# 		code = editor.getValue()
# 		
# 		localStorage.setItem "framer.editor.code", code
# 
# 		
# 		runCode code

			
# editor.getSession().on "changeAnnotation", ->
# 	console.log editor.getSession().getAnnotations()
# 
# editor.getSession().on "change", ->
# 	console.log editor.getSession().getAnnotations()

# editor.getSession().on "jslint", (result) ->
# 	console.log result
