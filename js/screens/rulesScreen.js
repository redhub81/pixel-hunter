/** @module screens/rulesScreen */

import contentBuilder from '../content-builder.js';
import contentPresenter from '../content-presenter.js';
import introScreen from './introScreen.js';
import gameOneScreen from './gameOneScreen.js';

const screenTemplate = `\
  <header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
  </header>
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
  <footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>`;

let backElement;
let rulesFormElement;
let rulesInputElement;
let rulesButtonElement;

const isPlayerNameValid = () => {
  return rulesInputElement.value.toString().length > 0;
};

const subscribe = () => {
  backElement.addEventListener(`click`, function (evt) {
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
    const contentElement = contentBuilder.build(screenTemplate);
    backElement = contentElement.querySelector(`.header__back`);
    rulesFormElement = contentElement.querySelector(`.rules__form`);
    rulesInputElement = rulesFormElement.querySelector(`.rules__input`);
    rulesButtonElement = rulesFormElement.querySelector(`.rules__button.continue`);

    subscribe();

    return contentElement;
  }
};
