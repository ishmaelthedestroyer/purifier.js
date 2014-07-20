javascript: (function () {
    /*
    loader = document.createElement('img');
    loader.id = 'PURIFIER-LOADER';
    loader.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOng9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBub25lIj48Zz48cGF0aCBpZD0icCIgZD0iTTMzIDQyYTEgMSAwIDAgMSA1NS0yMCAzNiAzNiAwIDAgMC01NSAyMCIvPjx1c2UgeDpocmVmPSIjcCIgdHJhbnNmb3JtPSJyb3RhdGUoNzIgNTAgNTApIi8+PHVzZSB4OmhyZWY9IiNwIiB0cmFuc2Zvcm09InJvdGF0ZSgxNDQgNTAgNTApIi8+PHVzZSB4OmhyZWY9IiNwIiB0cmFuc2Zvcm09InJvdGF0ZSgyMTYgNTAgNTApIi8+PHVzZSB4OmhyZWY9IiNwIiB0cmFuc2Zvcm09InJvdGF0ZSgyODggNTAgNTApIi8+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIHZhbHVlcz0iMzYwIDUwIDUwOzAgNTAgNTAiIGR1cj0iMS44cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2c+PC9zdmc+';
    loader.style.position = 'fixed';
    loader.style.left = '10px';
    loader.style.top = '10px';
    loader.style.width = '75px';
    loader.style.height = '75px';
    loader.style.zIndex = 999999;
    document.body.appendChild(loader);
    */
    loader = document.createElement('div');
    loader.id = 'PURIFIER-LOADER';
    loader.style.position = 'fixed';
    loader.style.left = '10px';
    loader.style.top = '10px';
    loader.style.width = '120px';
    loader.style.height = '65px';
    loader.innerHTML = 'LOADING ....'
    loader.style.zIndex = 999999;
    document.body.appendChild(loader);

    if (document.getElementById('PURIFIER-SCRIPT')) {
      window.RUN_PURIFIER();
    } else {
      s = document.createElement('script');
      s.id = 'PURIFIER-SCRIPT';
      s.type = 'text/javascript';
      s.src = 'https://purifier-js.herokuapp.com/src/purifier.js?v=' + parseInt(Math.random() * 99999999);
      document.body.appendChild(s);
    }
})();