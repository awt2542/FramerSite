(function() {
  var calculateElements, highlightNavigation, selectItemNamed, _calculatedElements, _lastSelectedElementName, _startListeningForScroll;

  _calculatedElements = [];

  _lastSelectedElementName = null;

  _startListeningForScroll = false;

  selectItemNamed = function(className) {
    if (className === "examples" || className === "community") {
      return;
    }
    $("#sidebar a").removeClass("active");
    return $("#sidebar a." + className).addClass("active");
  };

  calculateElements = function() {
    _calculatedElements = [];
    return $("#wrapper a[name]").map(function(index, anchor) {
      return _calculatedElements.push({
        offset: $(anchor).offset().top + 60,
        name: $(anchor).attr("name")
      });
    });
  };

  highlightNavigation = function() {
    var bestItem, fromTop, item, itemsAboveViewPort, itemsBelowViewPort, itemsInsideViewPort, _i, _len;
    if (_startListeningForScroll === false) {
      return;
    }
    fromTop = $(window).scrollTop();
    itemsAboveViewPort = [];
    itemsInsideViewPort = [];
    itemsBelowViewPort = [];
    for (_i = 0, _len = _calculatedElements.length; _i < _len; _i++) {
      item = _calculatedElements[_i];
      if (item.offset - fromTop < 0) {
        itemsAboveViewPort.push(item);
      } else if (item.offset - fromTop > window.innerHeight - (window.innerHeight * 0.1)) {
        itemsBelowViewPort.push(item);
      } else {
        itemsInsideViewPort.push(item);
      }
    }
    if (fromTop < (window.innerHeight * 0.1)) {
      bestItem = _calculatedElements[0];
    } else if (fromTop + window.innerHeight > document.height - (window.innerHeight * 0.1)) {
      bestItem = _calculatedElements[_calculatedElements.length - 1];
    } else {
      if (itemsInsideViewPort.length > 0) {
        bestItem = itemsInsideViewPort[0];
      } else if (itemsAboveViewPort.length > 0) {
        bestItem = itemsAboveViewPort[itemsAboveViewPort.length - 1];
      } else {
        bestItem = itemsBelowViewPort[0];
      }
    }
    if (_lastSelectedElementName === (bestItem != null ? bestItem.name : void 0)) {
      selectItemNamed(bestItem != null ? bestItem.name : void 0);
    }
    _lastSelectedElementName = bestItem != null ? bestItem.name : void 0;
    return $.cookie("nav", _lastSelectedElementName);
  };

  $(window).load(function() {
    var hash;
    calculateElements();
    hash = window.location.hash.slice(1);
    _startListeningForScroll = true;
    if (hash) {
      selectItemNamed(hash);
    } else {
      highlightNavigation();
    }
    return $(window).scroll(highlightNavigation);
  });

  $(window).scroll(function() {
    calculateElements();
    return highlightNavigation();
  });

  $(window).resize(function() {
    calculateElements();
    return highlightNavigation();
  });

  $("#sidebar a").click(function() {
    var clickedClass;
    clickedClass = $(this).attr("class");
    return selectItemNamed(clickedClass);
  });

}).call(this);
