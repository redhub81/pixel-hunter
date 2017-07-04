/** @module partials/gameHeader */

import getMainHeaderTemplate from './mainHeader.js';

const getGameHeaderTemplate = (gameData) => `
  ${getMainHeaderTemplate(`
    <h1 class="game__timer">${gameData.timeRemaining}</h1>
    <div class="game__lives">
      <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
    </div>`)}`;

export default getGameHeaderTemplate;
