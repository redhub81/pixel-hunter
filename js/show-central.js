// show-main.js

/** Отображение экранов.
 ******************************************************************************/

const mainContent = document.querySelector(`main.central`);

const showCentral = function (element) {
  mainContent.innerHTML = ``;
  mainContent.appendChild(element);
};

export default showCentral;
