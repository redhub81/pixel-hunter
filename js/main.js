// main.js

window.main = (function () {
  const keyCodeLeftArrow = 37;
  const keyCodeRightArrow = 39;

  const startScreenNumber = 0;
  const mainContent = document.querySelector(`main.central`);
  const templates = [];
  (function () {
    const templateNames = [`#greeting`, `#rules`, `#game-1`, `#game-2`, `#game-3`, `#stats`];
    templateNames.forEach((it) => {
      templates.push(document.querySelector(it).content);
    });
  }());

  let currentScreenNumber = -1;

  const showScreen = function (screenNumber) {
    const contentTemplate = templates[screenNumber].cloneNode(true);
    mainContent.innerHTML = ``;
    mainContent.appendChild(contentTemplate);
  };

  const getPreviuseScreenNumber = function () {
    return Math.max(0, currentScreenNumber - 1);
  };

  const getNextScreenNumber = function () {
    return Math.min(templates.length - 1, currentScreenNumber + 1);
  };

  const setCurrentScreenNumber = function (value, callBack) {
    if (currentScreenNumber !== value) {
      currentScreenNumber = value;
      callBack(value);
    }
  };

  const changeScreen = function (screenNumber) {
    setCurrentScreenNumber(screenNumber, (value) => {
      showScreen(value);
    });
  };

  const subscribe = function () {
    document.addEventListener(`keydown`, function (evt) {
      if (evt.altKey && evt.keyCode === keyCodeLeftArrow) {
        const newNumber = getPreviuseScreenNumber();
        changeScreen(newNumber);
      }
      if (evt.altKey && evt.keyCode === keyCodeRightArrow) {
        const newNumber = getNextScreenNumber();
        changeScreen(newNumber);
      }
    });
  };

  return {
    run: () => {
      subscribe();
      changeScreen(startScreenNumber);
    }
  };

}());

window.main.run();
