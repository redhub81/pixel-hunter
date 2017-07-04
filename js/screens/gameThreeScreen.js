/** @module screens/gameThreeScreen */

import contentBuilder from '../content-builder.js';
import contentPresenter from '../content-presenter.js';
import getGameHeaderTemplate from '../partials/gameHeader.js';
import getMainFooterTemplate from '../partials/mainFooter.js';
import getGameStatisticTemplate from '../partials/gameStatistics.js';
import {gameData as gameDataContext} from '../data/gameData.js';

import introScreen from './introScreen.js';
import statsScreen from './statsScreen.js';


const HTML_IMG_TAG_NAME = `img`;

const getQuestionTemplate = (stageData) => `
  <div class="game__option ${stageData.isSelected === true ? `game__option--selected` : ``}">
    <img src="${stageData.imageSource}" alt="${stageData.description}" width="304" height="455">
  </div>`;

const getStageTemplate = (gameData) => `
  <div class="game">
    <p class="game__task">${gameData.stage.task}</p>
    <form class="game__content  game__content--triple">
      ${gameData.stage.questions.map(getQuestionTemplate).join(`\n`)}
    </form>
    ${getGameStatisticTemplate(gameData.progress)}
  </div>`;


let backElement;
let gameContentElement;

const bind = (element) => {
  backElement = element.querySelector(`.back`);
  gameContentElement = element.querySelector(`.game__content`);
};

const subscribe = () => {
  backElement.addEventListener(`click`, function (evt) {
    gameDataContext.stageNumber = null;
    contentPresenter.show(introScreen);
  });
  gameContentElement.addEventListener(`click`, function (evt) {
    const target = evt.target;
    if (target.tagName.toLowerCase() !== HTML_IMG_TAG_NAME) {
      gameDataContext.stageNumber = null;
      contentPresenter.show(statsScreen);
    }
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
      ${getGameHeaderTemplate(gameDataContext)}
      ${getStageTemplate(gameDataContext)}
      ${getMainFooterTemplate()}`;
    const contentElement = contentBuilder.build(contentTemplate);

    bind(contentElement);
    subscribe();

    return contentElement;
  }
};
