(function ($) {
  $(document).ready(function () {
    let doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    //Browsers that don't support css grids
    let agentSmiths = [];
    let badCount = 0;
    agentSmiths.push("rv:11.0");
    agentSmiths.push("Edge/15");
    agentSmiths.push("MSIE");
    agentSmiths.forEach(function (v, k) {
      let agentString = navigator.userAgent.toString();
      if (typeof agentString.includes === 'function') {
        if (navigator.userAgent.toString().includes(v)) {
          badCount++;
        }
      } else {
        badCount++;
      }
    });
    if (badCount === 0) {
      doItAll();
    }

    function doItAll() {
      // Begin jQuery code
      let theInnerGrids = document.getElementsByClassName('gav-extra');
      let theBases = document.getElementsByClassName('gav-base');
      let theGridItems = document.getElementsByClassName('gav-grid-item');
      let theExtraItems = document.getElementsByClassName('gav-extra-item');

      let myBase;
      let myExtra;

      resetToNormal();
      $('.gav-button').click(function () {
        expandMe($(this).parents('.gav-grid-item'));
      });

      function resetToNormal() {
        for (let i = 0; i < theInnerGrids.length; i++) {
          theInnerGrids.item(i).style.display = 'none';
          theBases.item(i).style.display = 'block';
        }
      }

      function expandMe(me) {
        resetToNormal();
        myBase = me.find('.gav-base');
        myExtra = me.find('.gav-extra');

        if (me.hasClass('expanded')) {
          clearExpandFromClasses();
          myBase.css({'display': 'block'});
        } else {
          clearExpandFromClasses();
          me.addClass('expanded');
          myBase.css({'display': 'none'});
          myExtra.css({'display': 'grid'});
        }

        function clearExpandFromClasses() {
          for (let i = 0; i < theInnerGrids.length; i++) {
            theGridItems.item(i).classList.remove('expanded');
          }
        }
      }

      let grid = document.querySelector(".gav-grid");
      if (grid !== null) {
        animateCSSGrid.wrapGrid(grid, {duration: 600, easing: 'easeInOut'});
      }
    }

    // End jQuery code
  });
}(jQuery));

