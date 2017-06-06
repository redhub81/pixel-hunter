/** @module content-builder */

const build = function (template) {
  const templateElement = document.createElement(`template`);
  templateElement.innerHTML = template;

  return templateElement.content;
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
