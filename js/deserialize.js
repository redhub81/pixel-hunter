// deserialize-element.js

const deserialize = function (template) {
  const element = document.createElement(`div`);
  element.insertAdjacentHTML(`beforeend`, template);

  return element;
};

export default deserialize;
