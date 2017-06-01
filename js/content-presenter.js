/** @module content-presenter */

const mainContentElement = document.querySelector(`main.central`);

const show = function (screen) {
  mainContentElement.innerHTML = ``;
  if (typeof screen.initialize !== `undefined`) {
    screen.initialize();
  }
  mainContentElement.appendChild(screen.content);
};

/** The export of the module interface.
 ************************************************************************************************
 */
export default {
  /**
   * Shows the screen on the page.
   * @function
   * @param {object} The screen.
   */
  show
};
