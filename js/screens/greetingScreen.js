/** @module screens/greetingScreen */

import contentBuilder from '../content-builder.js';
import contentPresenter from '../content-presenter.js';
import getMainFooterTemplate from '../partials/mainFooter.js';

import rulesScreen from './rulesScreen.js';


const greetingDataContext = {
  lead: `Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!`,
  introLines: [
    `Правила игры просты.`,
    `Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.`,
    `Задача кажется тривиальной, но не думай, что все так просто.`,
    `Фотореализм обманчив и коварен.`,
    `Помни, главное — смотреть очень внимательно.`
  ]
};

const getChallengeTemplate = (greetingData) => {
  return `\
    <div class="greeting__challenge">
      <h3>${greetingData.lead}</h3>
      <p>${greetingData.introLines.join(`<br>`)}</p>
    </div>`;
};

const getGreetingTemplate = (greetingData) => {
  return `\
    <div class="greeting central--blur">
      <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
      <h1 class="greeting__asterisk">*</h1>
      ${getChallengeTemplate(greetingData)}
      <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
    </div>`;
};


let continueElement;

const bind = (element) => {
  continueElement = element.querySelector(`.greeting__continue`);
};

const subscribe = () => {
  continueElement.addEventListener(`click`, function () {
    contentPresenter.show(rulesScreen);
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
      ${getGreetingTemplate(greetingDataContext)}
      ${getMainFooterTemplate()}`;
    const contentElement = contentBuilder.build(contentTemplate);

    bind(contentElement);
    subscribe();

    return contentElement;
  }
};
