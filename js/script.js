import { getQuestionsByAPI, selectQuestion } from './apiquestion.js'
import { 
  paintCorrectAnswer,
  scroolToTop,
  createLives,
  createQuestion,
  createAnswers,
  optionSelected,
  verifyGameOverMessage,
  setMessageAboutAnswer,
  setGameOverMessage,
  setStyleStartButton,
} from './helpers.js'

const divActions = document.querySelector(".actions");
const messageContainer = document.querySelector(".message");
const container = document.querySelector(".main-container");
const start = document.querySelector('[data-js="start"]');
const nextQuestionButton = document.querySelector(".next");
const confirmQuestionButton = document.querySelector(".confirm");
const gameArea = document.querySelector('.game-area')

let correctAnswer;
start.addEventListener("click", () => {
  setDisplayGame();
  createLives();
  startNewGame();
});

const startNewGame = async () => {
  const data = await getQuestionsByAPI();
  const { question, answers, correctAnswer: correctAnswerAPI } = selectQuestion(data);
  correctAnswer = correctAnswerAPI;
  createQuestion(question);
  createAnswers(answers);
  optionSelected();
  confirmQuestionButton.addEventListener("click", sendAnswer);

};

nextQuestionButton.addEventListener("click", () => {
  confirmQuestionButton.removeEventListener("click", sendAnswer);
  startNewGame();
});

const sendAnswer = () => {
  const selectAnswer = document.querySelector(".selected");
  if (!selectAnswer) return;
  const contentAnswer = selectAnswer.textContent;
  const [message, status, actionAboutUserAnswer] = verifyAnswer(contentAnswer, correctAnswer);
  paintCorrectAnswer(contentAnswer, correctAnswer)
  setMessageAboutAnswer(message, status, messageContainer);
  actionAboutUserAnswer();
  scroolToTop()
  resetGame(messageContainer)
};

const verifyAnswer = (contentAnswer, correctAnswer) => {
  const isCorrect = contentAnswer === correctAnswer;
  const message = isCorrect ? "Você acertou!" : "Você errou, que pena";
  const status = isCorrect ? "success" : "failed";
  const actionAboutUserAnswer = isCorrect ? addScore : removeLives;

  return [message, status, actionAboutUserAnswer];
};

const setDisplayGame = () => {
  container.classList.replace('game_over', 'main-container')
  start.parentElement.style.display = 'none'
  verifyGameOverMessage(container)
  gameArea.style.display = 'flex'
  divActions.style.display = `flex`;
};

export const addScore = () => {
  const score = document.querySelector(".icon-score span");
  const formatScore = parseInt(score.textContent);
  score.innerHTML = formatScore + 10
};

export const removeLives = () => {
  const hearts = document.querySelector(".icon-heart span");
  hearts.innerHTML = Number(--hearts.textContent);
  if (hearts.textContent === "0") gameOver();
};

const resetGame = messageContainer => {
  setTimeout(() => {
    messageContainer.innerHTML = ''
    startNewGame();
  }, 500)
}

const gameOver = () => {
  container.classList.replace('main-container', 'game_over')
  const message = setGameOverMessage()
  container.append(message)
  setStyleStartButton(start)
  gameArea.style.display = 'none'
};