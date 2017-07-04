/** @module screens/gameTwoScreen */

import contentBuilder from '../content-builder.js';
import contentPresenter from '../content-presenter.js';
import getGameHeaderTemplate from '../partials/gameHeader.js';
import getMainFooterTemplate from '../partials/mainFooter.js';
import getGameStatisticTemplate from '../partials/gameStatistics.js';
import {gameData as gameDataContext} from '../data/gameData.js';

import introScreen from './introScreen.js';
import gameTwoScreen from './gameTwoScreen.js';


const getQuestionTemplate = (stageData) => `
  <div class="game__option">
  <img src="${stageData.imageSource}" alt="${stageData.description}" width="705" height="455">
  <label class="game__answer game__answer--photo">
    <input name="${stageData.name}" type="radio" value="photo">
    <span>Фото</span>
  </label>
  <label class="game__answer  game__answer--wide  game__answer--paint">
    <input name="${stageData.name}" type="radio" value="paint">
    <span>Рисунок</span>
  </label>
  </div>`;

const getStageTemplate = (gameData) => `
  <div class="game">
    <p class="game__task">${gameData.stage.task}</p>
    <form class="game__content  game__content--wide">
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
  gameContentElement.addEventListener(`change`, function (evt) {
    const target = evt.target;
    if (target.type === `radio`) {
      gameDataContext.stageNumber = 1;
      contentPresenter.show(gameTwoScreen);
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
