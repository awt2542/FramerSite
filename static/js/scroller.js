(function() {
  var calculateElements, highlightNavigation, _calculatedElements;

  _calculatedElements = [];

  calculateElements = function() {
    _calculatedElements = [];
    return $("#wrapper a[name]").map(function(index, anchor) {
      return _calculatedElements.push({
        offset: $(anchor).offset().top,
        name: $(anchor).attr("name")
      });
    });
  };

  highlightNavigation = function() {
    var bestItem, className, fromTop, item, itemsAboveViewPort, itemsBelowViewPort, itemsInsideViewPort, _i, _len;
    fromTop = $(window).scrollTop();
    itemsAboveViewPort = [];
    itemsInsideViewPort = [];
    itemsBelowViewPort = [];
    for (_i = 0, _len = _calculatedElements.length; _i < _len; _i++) {
      item = _calculatedElements[_i];
      if (item.offset - fromTop < 0) {
        itemsAboveViewPort.push(item);
      } else if (item.offset - fromTop > window.innerHeight) {
        itemsBelowViewPort.push(item);
      } else {
        itemsInsideViewPort.push(item);
      }
    }
    if (itemsInsideViewPort.length > 0) {
      bestItem = itemsInsideViewPort[0];
    } else if (itemsAboveViewPort.length > 0) {
      bestItem = itemsAboveViewPort[itemsAboveViewPort.length - 1];
    } else {
      bestItem = itemsBelowViewPort[0];
    }
    console.log("Best item " + (bestItem != null ? bestItem.name : void 0));
    className = bestItem.name;
    $("#sidebar a").removeClass("active");
    $("#sidebar a." + className).addClass("active");
    return $("#sidebar a." + className).parent().parent().addClass("appear");
  };

  $(window).load(function() {
    calculateElements();
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

}).call(this);
