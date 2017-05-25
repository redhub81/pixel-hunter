// main.js

/**
 * Главный модуль приложения.
 * @type {{run}}
 */
window.main = (function () {
  /**
   * Перечисление кодов клавиш.
   * @type {{leftArrow: number, rightArrow: number}}
   */
  const KEY_CODE = {
    /**
     * Код клавиши "Стрелка влево".
     * @type {number}
     */
    leftArrow: 37,
    /**
     * Код клавиши "Стрелка вправо".
     * @type {number}
     */
    rightArrow: 39
  };

  /**
   * Перечисление номеров экранов.
   * @type {{unknown: number, start: number}}
   */
  const SCREEN_NUMBER = {
    /**
     * Номер неизвестного экрана.
     * @type {number}
     */
    unknown: -1,
    /**
     * Номер стартового экрана.
     * @type {number}
     */
    start: 0
  };

  const mainContent = document.querySelector(`main.central`);
  const templates = (function () {
    const templateNames = [`#greeting`, `#rules`, `#game-1`, `#game-2`, `#game-3`, `#stats`];
    return templateNames.map((it) => {
      return document.querySelector(it).content;
    });
  }());

  let currentScreenNumber = SCREEN_NUMBER.unknown;

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
      if (evt.altKey && evt.keyCode === KEY_CODE.leftArrow) {
        changeScreen(getPreviouseScreenNumber());
      }
      if (evt.altKey && evt.keyCode === KEY_CODE.rightArrow) {
        changeScreen(getNextScreenNumber());
      }
    });
  };

  return {
    /**
     * Запускает выполнение приложения.
     */
    run: () => {
      subscribe();
      changeScreen(SCREEN_NUMBER.start);
    }
  };

}());

window.main.run();
