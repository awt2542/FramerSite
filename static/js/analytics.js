// Configuration
var analyticsId = "UA-37076997-1";
var analyticsDomains = ["framerjs.com", "fastspring.com"];

// Google Analytics code insertion
(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,"script","//www.google-analytics.com/analytics.js","ga");

ga("create",
	analyticsId,
	"auto", { // auto means track user on all subdomains as well
		"allowLinker": true // allows overriding ga cookie from url parameters
	}
);

ga("send", "pageview");

// Make sure tracking works across domains
if (analyticsDomains) {
	ga("require", "linker");
	// ga("linker:autoLink", analyticsDomains, false);
};

// Track forms cross domain

$(document).ready(function() {
	$("form").each(function() {
		$(this).submit(function(event) {

			var target = event.target || event.srcElement;

			if (target && target.action) {
				ga('linker:decorate', target);
			}

		});
	})
})


// Track download links

var downloadExtensions = ["zip", "pdf", "tar.gz"];

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function shouldTrackClick(href) {
	
	for (var i=0; i < downloadExtensions.length; i++) {
		if (endsWith(href, downloadExtensions[i])) {
			return true
		}
	}

	return false;
}

function handleTrackClick(event, href) {
	
	event.preventDefault()

	ga("send", "event", "button", "click", href);

	window.setTimeout(function() {
		window.location.href = href;
	}, 500);

}

$(document).ready(function() {
	$("a").each(function() {
		
		var node = $(this);
		var href = $(this).attr("href");

		if (!href)
			return;

		if (href.indexOf("#") != -1)
			return;

		if (shouldTrackClick(href)) {
			node.click(function(event) {
				handleTrackClick(event, href);
			})
		}
	})
})