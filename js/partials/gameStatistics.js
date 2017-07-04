/** @module screens/gameStatistics */

const getGameStatisticTemplate = (stageProgressData) => `
  <div class="stats">
    <ul class="stats">
      ${stageProgressData.map((result) => `<li class="stats__result stats__result--${result}"></li>`).join(`\n`)}
    </ul>
  </div>`;

export default getGameStatisticTemplate;
