/** @module content-presenter */

const mainContentElement = document.querySelector(`main.central`);

const show = function (screen) {
  mainContentElement.innerHTML = ``;

  const screenContent = screen.getContent();
  mainContentElement.appendChild(screenContent);
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
