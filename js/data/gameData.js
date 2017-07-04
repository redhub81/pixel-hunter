/** @module data/gameData */

const stageTypeEnum = {
  one: `one`,
  two: `two`,
  three: `three`,
};

const stageResultEnum = {
  unknown: `unknown`,
  wrong: `wrong`,
  correct: `correct`,
  slow: `slow`,
  fast: `fast`,
};

const gameStatusEnum = {
  success: `success`,
  failed: `failed`,
};


const stages = [
  {
    stageType: stageTypeEnum.one,
    task: `Угадай, фото или рисунок?`,
    questions: [{
      name: `question1`,
      description: `Option 1`,
      imageSource: `http://placehold.it/705x455`,
      isPhoto: true,
    }]
  },
  {
    stageType: stageTypeEnum.two,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    questions: [{
      name: `question1`,
      description: `Option 1`,
      imageSource: `http://placehold.it/468x458`,
      isPhoto: true,
    }, {
      name: `question2`,
      description: `Option 2`,
      imageSource: `http://placehold.it/468x458`,
      isPhoto: false,
    }]
  },
  {
    stageType: stageTypeEnum.three,
    task: `Найдите рисунок среди изображений`,
    questions: [{
      name: `question1`,
      description: `Option 1`,
      imageSource: `http://placehold.it/304x455`,
      isPhoto: true,
    }, {
      name: `question2`,
      description: `Option 2`,
      imageSource: `http://placehold.it/304x455`,
      isPhoto: false,
    }, {
      name: `question3`,
      description: `Option 3`,
      imageSource: `http://placehold.it/304x455`,
      isPhoto: false,
    }]
  }
];
let currentStageNumber;


export const stageResult = stageResultEnum;
export const gameStatus = gameStatusEnum;
export const gameConfig = {
  livesTotal: 3,
};

export const gameData = {
  livesRemaining: 2,
  timeRemaining: 30,
  stage: null,
  progress: [
    stageResult.wrong,
    stageResult.slow,
    stageResult.fast,
    stageResult.correct,
    stageResult.unknown,
    stageResult.unknown,
    stageResult.unknown,
    stageResult.unknown,
    stageResult.unknown,
    stageResult.unknown,
  ],
  set stageNumber(value) {
    this.stage = value !== null ? stages[value] : null;
    currentStageNumber = value;
  },
  get stageNumber() {
    return currentStageNumber;
  }
};
