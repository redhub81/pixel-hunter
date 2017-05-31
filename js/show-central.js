// show-main.js

/** Отображение экранов.
 ******************************************************************************/

const mainContentElement = document.querySelector(`main.central`);

const showCentral = function (element) {
  mainContentElement.innerHTML = ``;
  mainContentElement.appendChild(element);
};

export default showCentral;
