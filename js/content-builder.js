/** @module content-builder */

const build = function (template) {
  const element = document.createElement(`div`);
  element.insertAdjacentHTML(`beforeend`, template);

  return element;
};

/** The export of the module interface.
 ************************************************************************************************
 */
export default {
  /**
   * Builds DOM element bye the template.
   * @function
   * @param {string} Template of the element content.
   * @returns {object} The DOM element was built.
   */
  build
};
