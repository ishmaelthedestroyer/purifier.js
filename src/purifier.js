window.RUN_PURIFIER = function() {
  if (window.PURIFIER_ACTIVE) {
    return false;
  }

  window.PURIFIER_ACTIVE = true;

  var faces = {
    disapproval: '&#3232;_&#3232;',
    flip: '(&#9583;&#176;&#9633;&#176;&#65289;&#9583;&#65077;'
  }

  var callbacks = []
  var elements = document.getElementsByTagName('*');

  /* * * * * * * * * * * * * * * * * * * * */
  /* * * * * * * * * * * * * * * * * * * * */

  // CREATE LOADER

  /*
  loader = document.createElement('img');
  loader.id = 'PURIFIER-LOADER'
  loader.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOng9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBub25lIj48Zz48cGF0aCBpZD0icCIgZD0iTTMzIDQyYTEgMSAwIDAgMSA1NS0yMCAzNiAzNiAwIDAgMC01NSAyMCIvPjx1c2UgeDpocmVmPSIjcCIgdHJhbnNmb3JtPSJyb3RhdGUoNzIgNTAgNTApIi8+PHVzZSB4OmhyZWY9IiNwIiB0cmFuc2Zvcm09InJvdGF0ZSgxNDQgNTAgNTApIi8+PHVzZSB4OmhyZWY9IiNwIiB0cmFuc2Zvcm09InJvdGF0ZSgyMTYgNTAgNTApIi8+PHVzZSB4OmhyZWY9IiNwIiB0cmFuc2Zvcm09InJvdGF0ZSgyODggNTAgNTApIi8+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIHZhbHVlcz0iMzYwIDUwIDUwOzAgNTAgNTAiIGR1cj0iMS44cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2c+PC9zdmc+';
  loader.style.position = 'fixed';
  loader.style.left = '10px';
  loader.style.top = '10px';
  loader.style.width = '75px';
  loader.style.height = '75px';
  loader.style.zIndex = 999999;
  document.body.appendChild(loader);
  */

  /* * * * * * * * * * * * * * * * * * * * */
  /* * * * * * * * * * * * * * * * * * * * */

  // HIDE LOADER

  var loader = document.getElementById('PURIFIER-LOADER');
  if (loader) {
    loader.parentNode.removeChild(loader);
  }

  /* * * * * * * * * * * * * * * * * * * * */
  /* * * * * * * * * * * * * * * * * * * * */

  // PREPARE EVENT LISTENERS

  for (var i = 0; i < elements.length; i++) {
    (function(element) {
      // DON'T SET EVENT LISTENERS ON HTML OR BODY TAGS
      if (element.tagName && element.tagName.toLowerCase() == 'html') return;
      if (element.tagName && element.tagName.toLowerCase() == 'body') return;

      // DON'T SET EVENT LISTENER ON ELEMENTS WITH NO-PURIFY CLASS
      if ((" " + element.className + " " ).indexOf( " "+ "NO-PURIFY" +" " ) > -1) return;

      var cb = function(e) {
        e.preventDefault();
        e.stopPropagation();

        element.removeEventListener('click', cb, false)
        for (var i = 0; i < callbacks.length; i++) {
          if (callbacks[i].element == element) {
            callbacks.splice(i, 1);
          }
        }

        var offsetLeft = element.offsetLeft;
        var offsetTop = element.offsetTop;
        /*
        var bodyRect = document.body.getBoundingClientRect(),
          elemRect = element.getBoundingClientRect(),
          offsetLeft = elemRect.left - bodyRect.left,
          offsetTop = elemRect.top - bodyRect.top;
        */

        var targetCoord = GetTopLeft(element);

        var purifierX = 0;
        var purifierY = 0;
        var targetX = targetCoord.left;
        var targetY = targetCoord.top;
        var movePurifierX = targetX / 60;
        var movePurifierY = targetY / 60;

        var purifier = document.createElement('span');
        purifier.style.fontSize = '36pt'
        purifier.style.position = 'fixed'
        purifier.style.left = 0;
        purifier.style.top = 0;
        purifier.style.display = 'none'
        purifier.zIndex = 9999999;

        purifier.innerHTML = faces.disapproval;

        purifier.style.left = 0;
        purifier.style.top = 0;
        purifier.innerHTML = faces.disapproval;
        purifier.style.display = 'block';

        document.body.appendChild(purifier);

        animatePurifier();

        function animatePurifier() {
          setTimeout(function() {
            console.log('Animating purifier.');

            purifierX += movePurifierX
            purifierY += movePurifierY

            purifier.style.left = purifierX + 'px';
            purifier.style.top = purifierY + 'px';

            if (purifierX - targetX > 10 || purifierX - targetX < -10 ||
              purifierY - targetY > 10 || purifierY - targetY < -10) {
                animatePurifier();
            } else {
              console.log('Making purifier invisible.')
              setTimeout(function() {
                purifier.innerHTML = faces.flip;
                positionElement()
                move();
                setTimeout(function() {
                  purifier.style.display = 'none';
                }, 1500);
              }, 500);
            }
          }, 15);
        }

        function positionElement() {
          var pos = GetTopLeft(element);
          element.style.position = 'fixed';
          element.style.left = parseInt(pos.left) + 'px';
          element.style.top = parseInt(pos.top) + 'px';
        }

        /* * * * * * * * * * * * * * * * * * * * */
        /* * * * * * * * * * * * * * * * * * * * */

        // RECURSIVE ANIMATION FUNCTION

        var rotation = 0;
        function move() {
          setTimeout(function() {
            console.log('Moving...');
            rotation += 15;

            element.style.webkitTransform = 'rotate(' + rotation + 'deg)';
            element.style.MozTransform = 'rotate(' + rotation + 'deg)';
            element.style.msTransform = 'rotate(' + rotation + 'deg)';
            element.style.OTransform = 'rotate(' + rotation + 'deg)';
            element.style.transform = 'rotate(' + rotation + 'deg)';

            element.style.left = (parseInt(element.style.left) + 15) + 'px';
            element.style.top = (parseInt(element.style.top) - 15) + 'px';

            if (parseInt(element.style.left) + element.offsetWidth < 9999 ||
              parseInt(element.style.top) + element.offsetHeight > -9999) {
                move();
            }
          }, 15);

        }


        function GetOffset (object, offset) {
            if (!object)
                return;
            offset.x += object.offsetLeft;
            offset.y += object.offsetTop;

            GetOffset (object.offsetParent, offset);
        }

        function GetScrolled (object, scrolled) {
            if (!object)
                return;
            scrolled.x += object.scrollLeft;
            scrolled.y += object.scrollTop;

            if (object.tagName.toLowerCase () != "html") {
                GetScrolled (object.parentNode, scrolled);
            }
        }

        function GetTopLeft (elem) {
            var offset = {x : 0, y : 0};
            GetOffset (elem, offset);

            var scrolled = {x : 0, y : 0};
            GetScrolled (elem.parentNode, scrolled);

            var posX = offset.x - scrolled.x;
            var posY = offset.y - scrolled.y;
            return {
              left: posX,
              top: posY
            }
        }

      }

      element.addEventListener('click', cb, false);
      callbacks.push({
        event: 'click',
        element: element,
        cb: cb
      });
    })(elements[i]);
  }

  /* * * * * * * * * * * * * * * * * * * * */
  /* * * * * * * * * * * * * * * * * * * * */

  // DISABLE PURIFIER BUTTON

  var container = document.createElement('button');
  container.style.position = 'fixed';
  container.style.left = '10px';
  container.style.top = '10px';
  container.style.width = '120px';
  container.style.height = '65px';
  container.style.border = '2px solid #ccc';
  container.style.zIndex = 999999;
  container.style.fontSize = '16pt';
  container.style.cursor = 'pointer';
  container.style.color = '#fff';
  container.style.backgroundColor = '#333';
  container.style.lineHeight = '30px';
  container.innerHTML = 'DISABLE PURIFIER';
  document.body.appendChild(container);

  var mouseEnter = function(e) {
    container.style.border = '2px solid #eee';
  }

  var mouseLeave = function(e) {
    container.style.border = '2px solid #333';
  }

  window.DISABLE_PURIFIER = function(e) {
    window.PURIFIER_ACTIVE = false;

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i].element.removeEventListener(callbacks[i].event, callbacks[i].cb, false)
    }

    container.parentNode.removeChild(container);
  }

  container.addEventListener('mouseenter', mouseEnter, false);
  container.addEventListener('mouseleave', mouseLeave, false);
  container.addEventListener('click', window.DISABLE_PURIFIER, false);

  callbacks.push({
    event: 'mouseenter',
    element: container,
    cb: mouseEnter
  })

  callbacks.push({
    event: 'mouseleave',
    element: container,
    cb: mouseLeave
  })

  callbacks.push({
    event: 'click',
    element: container,
    cb: window.DISABLE_PURIFIER
  })

  /*
  container.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i].element.removeEventListener(callbacks[i].event, callbacks[i].cb, false)
    }

    container.parentNode.removeChild(container);
  }, false);
  */
};
window.RUN_PURIFIER();