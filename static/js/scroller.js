(function() {
  $(document).ready(function() {
    var updateActive;
    updateActive = function() {
      var activeAnchor, className, fromTop, offset;
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
        return $("#sidebar a." + className).addClass("active");
      }
    };
    $(window).scroll(updateActive);
    $(window).resize(updateActive);
    $(window).load(updateActive);
    return $("#sidebar a").click(function() {
      $("#sidebar a").removeClass("active");
      return $(this).addClass("active");
    });
  });

}).call(this);
