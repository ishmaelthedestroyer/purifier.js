(function() {
  var faces = {
    disapproval: '&#3232;_&#3232;',
    flip: '(&#9583;&#176;&#9633;&#176;&#65289;&#9583;&#65077;'
  }

  var callbacks = []

  var elements = document.getElementsByTagName('*');
  console.log(elements);

  for (var i = 0; i < elements.length; i++) {
    (function(element) {
      if (element.tagName && element.tagName.toLowerCase() == 'html') return;
      if (element.tagName && element.tagName.toLowerCase() == 'body') return;

      var cb = function(e) {
        e.preventDefault();
        e.stopPropagation();

        element.removeEventListener('click', cb, false)
        for (var i = 0; i < callbacks.length; i++) {
          if (callbacks[i] = cb) {
            callbacks.splice(i, 1);
          }
        }

        console.log(element)

        var offsetLeft = element.offsetLeft;
        var offsetTop = element.offsetTop;
        /*
        var bodyRect = document.body.getBoundingClientRect(),
          elemRect = element.getBoundingClientRect(),
          offsetLeft = elemRect.left - bodyRect.left,
          offsetTop = elemRect.top - bodyRect.top;
        */

        var purifierX = 0;
        var purifierY = 0;
        var movePurifierX = offsetLeft / 60;
        var movePurifierY = offsetTop / 60;

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

            if (purifierX - offsetLeft > 10 || purifierX - offsetLeft < -10 ||
              purifierY - offsetTop > 10 || purifierY - offsetTop < -10) {
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
          element.style.position = 'fixed';
          element.style.left = parseInt(offsetLeft) + 'px';
          element.style.top = parseInt(offsetTop) + 'px';

          /*
          console.log('Stats.', {
            bodyRect: bodyRect,
            elemRect: elemRect,
            offsetLeft: offsetLeft,
            offsetTop: offsetTop
          });
          */
        }

        /* * * * * * * * * * * * * * * * * * * * */
        /* * * * * * * * * * * * * * * * * * * * */
        // recursive move function

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

        /*
        setTimeout(function() {
          // positionElement()
          // move();
        }, 200);
        */

      }

      element.addEventListener('click', cb, false);
      callbacks.push(cb);
    })(elements[i]);
  }
})();


/*

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

function GetTopLeft () {
    var div = document.getElementById ("myDiv");

    var offset = {x : 0, y : 0};
    GetOffset (div, offset);

    var scrolled = {x : 0, y : 0};
    GetScrolled (div.parentNode, scrolled);

    var posX = offset.x - scrolled.x;
    var posY = offset.y - scrolled.y;
    alert ("The top-left corner of the div relative to the top-left corner of the browser's client area: \n"
            + " horizontal: " + posX + "px\n vertical: " +  posY + "px");
}

*/