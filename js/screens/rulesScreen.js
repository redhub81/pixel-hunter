/** @module screens/rulesScreen */

import contentBuilder from '../content-builder.js';
import contentPresenter from '../content-presenter.js';
import getMainHeaderTemplate from '../partials/mainHeader.js';
import getMainFooterTemplate from '../partials/mainFooter.js';
import {gameData as gameDataContext} from '../data/gameData.js';

import introScreen from './introScreen.js';
import gameOneScreen from './gameOneScreen.js';


const rulesData = {
  descriptionLines: [
    `Угадай 10 раз для каждого изображения фото {{photo}} или рисунок {{paint}}.`,
    `Фотографиями или рисунками могут быть оба изображения.`,
    `На каждую попытку отводится 30 секунд.`,
    `Ошибиться можно не более 3 раз.`,
    ``,
    `Готовы?`,
  ]
};


const ICON_PLACEHOLDER_REGEXP = /\{\{(\w+)\}\}/ig;
const iconTemplates = {
  photo: `<img src="img/photo_icon.png" width="16" height="16">`,
  paint: `<img src="img/paint_icon.png" width="16" height="16" alt="">`
};

const insertIcons = (line) => {
  return line.replace(ICON_PLACEHOLDER_REGEXP, (match, key) => {
    return (key in iconTemplates)
      ? iconTemplates[key]
      : ``;
  });
};

const getRulesTemplate = (data) => `\ 
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">
      ${data.descriptionLines.map(insertIcons).join(`<br>`)}
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>`;


let backElement;
let rulesFormElement;
let rulesInputElement;
let rulesButtonElement;

const bind = (element) => {
  backElement = element.querySelector(`.back`);
  rulesFormElement = element.querySelector(`.rules__form`);
  rulesInputElement = rulesFormElement.querySelector(`.rules__input`);
  rulesButtonElement = rulesFormElement.querySelector(`.rules__button.continue`);
};

const isPlayerNameValid = () => {
  return rulesInputElement.value.toString().length > 0;
};

const subscribe = () => {
  backElement.addEventListener(`click`, function (evt) {
    gameDataContext.stageNumber = null;
    contentPresenter.show(introScreen);
  });
  rulesInputElement.addEventListener(`input`, function () {
    rulesButtonElement.disabled = !isPlayerNameValid();
  });
  rulesFormElement.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    if (!isPlayerNameValid()) {
      return;
    }
    gameDataContext.stageNumber = 0;
    contentPresenter.show(gameOneScreen);
  });
};

/** The export of the module interface.
 ************************************************************************************************
 */
export default {
  /**
   * The content of the screen.
   * @function
   * @return {object} Content element.
   */
  getContent: () => {
    const contentTemplate = `
      ${getMainHeaderTemplate()}
      ${getRulesTemplate(rulesData)}
      ${getMainFooterTemplate()}`;
    const contentElement = contentBuilder.build(contentTemplate);

    bind(contentElement);
    subscribe();

    return contentElement;
  }
};
