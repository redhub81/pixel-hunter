/** @module screens/introScreen */

import contentBuilder from '../content-builder.js';
import contentPresenter from '../content-presenter.js';
import getMainFooterTemplate from '../partials/mainFooter.js';

import greetingScreen from './greetingScreen.js';


const introDataContext = {
  description: `Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.`
};

const getIntroTemplate = (introData) => `\
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> ${introData.description}</p>
    </div>
  </div>`;


let asteriskElement;

const bind = (element) => {
  asteriskElement = element.querySelector(`.intro__asterisk`);
};

const subscribe = () => {
  asteriskElement.addEventListener(`click`, function () {
    contentPresenter.show(greetingScreen);
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
      ${getIntroTemplate(introDataContext)}
      ${getMainFooterTemplate()}`;
    const contentElement = contentBuilder.build(contentTemplate);

    bind(contentElement);
    subscribe();

    return contentElement;
  }
};
