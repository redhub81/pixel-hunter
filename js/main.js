// main.js

window.main = (function () {
  const KEY_CODE_LEFT_ARROW = 37;
  const KEY_CODE_RIGHT_ARROW = 39;
  const SCREEN_START_NUMBER = 0;
  const SCREEN_UNKNOWN_NUMBER = -1;

  const mainContent = document.querySelector(`main.central`);
  const templates = (function () {
    const templateNames = [`#greeting`, `#rules`, `#game-1`, `#game-2`, `#game-3`, `#stats`];
    return templateNames.map((it) => {
      return document.querySelector(it).content;
    });
  }());

  let currentScreenNumber = SCREEN_UNKNOWN_NUMBER;

  const showScreen = function (screenNumber) {
    const contentTemplate = templates[screenNumber].cloneNode(true);
    mainContent.innerHTML = ``;
    mainContent.appendChild(contentTemplate);
  };

  const getPreviouseScreenNumber = function () {
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
      if (evt.altKey && evt.keyCode === KEY_CODE_LEFT_ARROW) {
        changeScreen(getPreviouseScreenNumber());
      }
      if (evt.altKey && evt.keyCode === KEY_CODE_RIGHT_ARROW) {
        changeScreen(getNextScreenNumber());
      }
    });
  };

  return {
    run: () => {
      subscribe();
      changeScreen(SCREEN_START_NUMBER);
    }
  };

}());

window.main.run();
