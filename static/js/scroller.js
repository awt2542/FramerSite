(function() {
  $(document).ready(function() {
    var updateActive;
    updateActive = function(doScroll) {
      var activeAnchor, className, fromTop, offset;
      if (doScroll == null) {
        doScroll = true;
      }
      offset = 60;
      fromTop = $(window).scrollTop();
      activeAnchor = null;
      $("a").map(function() {
        var anchor;
        anchor = $(this);
        if (anchor.offset().top < fromTop + offset) {
          return activeAnchor = anchor;
        }
      });
      if (activeAnchor) {
        className = activeAnchor.attr("name");
        $("#sidebar a").removeClass("active");
        $("#sidebar a." + className).addClass("active");
        $("#sidebar a." + className).parent().parent().addClass("appear");
        $("#sidebar a." + className).parent().parent().parent().parent().parent().addClass("has-active");
        if (doScroll) {
          return $("#sidebar.has-active").scrollTop($("#sidebar a." + className).scrollTop() + 80);
        }
      }
    };
    $(window).scroll(function() {
      return updateActive(false);
    });
    $(window).resize(function() {
      return updateActive(false);
    });
    $(window).load(function() {
      return updateActive(true);
    });
    return $("#sidebar a").click(function() {
      $("#sidebar a").removeClass("active");
      return $(this).addClass("active");
    });
  });

}).call(this);
