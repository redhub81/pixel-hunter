/** @module screens/statsScreen */

import contentBuilder from '../content-builder.js';
import contentPresenter from '../content-presenter.js';
import getMainHeaderTemplate from '../partials/mainHeader.js';
import getMainFooterTemplate from '../partials/mainFooter.js';
// import getGameStatisticTemplate from '../partials/gameStatistics.js';
import {stageResult as stageResult} from '../data/gameData.js';
import {gameData as gameDataContext} from '../data/gameData.js';
import {resultsData as resultDataContext} from '../data/resultsData.js';
// import {gameStatus as gameStatus} from '../data/gameData.js';

import introScreen from './introScreen.js';


const SCORE_SUCCEED_STAGE = 100;
const SCORE_SLOTH_PENALTY = 50;
const SCORE_FAST_BONUS = 50;
const SCORE_LIVE_BONUS = 50;


const getGameStatisticTemplate = (stageProgressData) => `
  <ul class="stats">
    ${stageProgressData.map((result) => `<li class="stats__result stats__result--${result}"></li>`).join(`\n`)}
  </ul>`;

const getSpeedBonusTemplate = (speedBonusData) => `
  <tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">1&nbsp;<span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">×&nbsp;${SCORE_FAST_BONUS}</td>
    <td class="result__total">${speedBonusData}</td>
  </tr>`;

const getLiveBonusTemplate = (liveBonusData) => `
  <tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">2&nbsp;<span class="stats__result stats__result--heart"></span></td>
    <td class="result__points">×&nbsp;${SCORE_LIVE_BONUS}</td>
    <td class="result__total">${liveBonusData}</td>
  </tr>`;

const getSlothPenaltyTemplate = (slothPenaltyData) => `
  <tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">2&nbsp;<span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">×&nbsp;${SCORE_SLOTH_PENALTY}</td>
    <td class="result__total">${slothPenaltyData}</td>
  </tr>`;

const getSuccessResultTemplate = (resultNumber, resultData) => `
  <table class="result__table">
    <tr>
      <td class="result__number">${resultNumber}.</td>
      <td colspan="2">
        ${getGameStatisticTemplate(resultData.progress)}
      </td>
      <td class="result__points">×&nbsp;${SCORE_SUCCEED_STAGE}</td>
      <td class="result__total">${resultData.totalScore}</td>
    </tr>
    ${getSpeedBonusTemplate(resultData.fastScore)}
    ${getLiveBonusTemplate(resultData.liveScore)}
    ${getSlothPenaltyTemplate(resultData.slowScore)}
    <tr>
      <td colspan="5" class="result__total  result__total--final">${resultData.fullScore}</td>
    </tr>
  </table>`;

const getFailResultTemplate = (resultNumber, resultData) => `
  <table class="result__table">
    <tr>
      <td class="result__number">${resultNumber}.</td>
      <td>
        ${getGameStatisticTemplate(resultData.progress)}
      </td>
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>
    </tr>
  </table>`;

const getResultTemplate = (resultNumber, resultData) => {
  switch (resultData.status) {
    case gameStatus.success:
      return getSuccessResultTemplate(resultNumber, resultData);
    case gameStatus.failed:
      return getFailResultTemplate(resultNumber, resultData);
    default:
      throw new Error(`Uncknown game status.`);
  }
};

const getStatsTemplate = (resultsData) => `
  <div class="result">
    <h1>Победа!</h1>
    ${resultsData.map((resultData, index) => getResultTemplate(index, resultData)).join(`\n`)}
  </div>`;

let backElement;

const bind = (element) => {
  backElement = element.querySelector(`.back`);
};

const subscribe = () => {
  backElement.addEventListener(`click`, function (evt) {
    contentPresenter.show(introScreen);
  });
};

const getCurrentGameResult = (gameData) => {
  const wrongStageCount = gameData.progress.reduce((a, v) => {
    a += v === stageResult.wrong;
    return a;
  }, 0);
  const status = wrongStageCount > 3
    ? gameStatus.failed
    : gameStatus.success;
  const result = {
    progress: gameDataContext.progress.slice(),
    status,
    totalScore: 0,
    fastScore: 0,
    liveScore: 0,
    slowScore: 0,
    fullScore: 0,
  };
  if (result.status === gameStatus.failed) {
    return result;
  }

  const totalScore = gameData.progress.reduce((a, v) => {
    a += v !== stageResult.wrong && v !== stageResult.unknown ? SCORE_SUCCEED_STAGE : 0;
    return a;
  }, 0);
  const bonusLiveScore = gameData.livesRemaining * SCORE_LIVE_BONUS;
  const bonusFastScore = gameData.progress.reduce((a, v) => {
    a += v === stageResult.fast ? SCORE_FAST_BONUS : 0;
  }, 0);
  const penaltySlowScore = gameData.progress.reduce((a, v) => {
    a += v === stageResult.slow ? -SCORE_SLOTH_PENALTY : 0;
  }, totalScore);

  result.totalScore = totalScore;
  result.fastScore = bonusFastScore;
  result.liveScore = bonusLiveScore;
  result.slowScore = penaltySlowScore;
  result.fullScore += bonusLiveScore + bonusFastScore + penaltySlowScore;

  return result;
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
    // const currentGameResult = getCurrentGameResult(gameDataContext);
    // resultDataContext.push(currentGameResult);
    //const resultsData = resultDataContext.slice().reverse();

    //const contentTemplate = `
    //  ${getMainHeaderTemplate(gameDataContext)}
    //  ${getStatsTemplate(resultsData)}
    //  ${getMainFooterTemplate()}`;
    const contentTemplate = `
      ${getMainHeaderTemplate(gameDataContext)}
      ${getMainFooterTemplate()}`;
    const contentElement = contentBuilder.build(contentTemplate);

    bind(contentElement);
    subscribe();

    return contentElement;
  }
};
