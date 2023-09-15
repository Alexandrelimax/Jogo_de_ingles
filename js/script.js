const divActions = document.querySelector(".actions");
const divMessage = document.querySelector(".message");
const container = document.querySelector(".main-container");
const start = document.querySelector(".menu li:first-child a");
const nextQuestionButton = document.querySelector(".next");
const confirmQuestionButton = document.querySelector(".confirm");
const gameArea = document.querySelector('.game-area')

let correctAnswer;
start.addEventListener("click", (event) => {
  event.preventDefault();
  setDisplayGame();
  createLives();
  startNewGame();
});

const startNewGame = async () => {
  try {
    const data = await getQuestionsByAPI();
    const { question, answers, correctAnswer:correctAnswerAPI } = selectQuestion(data);
    correctAnswer = correctAnswerAPI;
    createQuestion(question);
    createAnswers(answers);
    optionSelected();
    confirmQuestionButton.addEventListener("click", sendAnswer);
  } catch (error) {
    console.error(error);
  }
};

nextQuestionButton.addEventListener("click", () => {
  confirmQuestionButton.removeEventListener("click", sendAnswer);
  startNewGame();
});

const sendAnswer = () => {
  const selectAnswer = document.querySelector(".selected");
  if (!selectAnswer) return;
  const contentAnswer = selectAnswer.textContent;
  const [message, status, callbackFunction] = verifyAnswer(contentAnswer,correctAnswer);
  paintCorrectAnswer(contentAnswer, correctAnswer)
  setMessageAboutAnswer(message, status);
  callbackFunction();
  resetGame()
};

const paintCorrectAnswer = (contentAnswer, correctAnswer)=>{
  const alternatives = document.querySelectorAll(".answer span");
  const ArrayAlternatives = [...alternatives]
  const alternativecorrect = ArrayAlternatives.find(element => element.textContent === correctAnswer)
  
  alternativecorrect.classList.add(alternativecorrect.textContent === contentAnswer ? 'good': 'bad')
}

const resetGame = ()=>{
  setTimeout(()=>{
    divMessage.innerHTML = ''
    startNewGame();
  },500)
}

const addScore = () => {
  const score = document.querySelector(".icon-score span");
  const formatScore = parseInt(score.textContent);
  score.innerHTML = formatScore + 10
};

const removeLives = () => {
  const hearts = document.querySelector(".icon-heart span");

  hearts.innerHTML = Number(--hearts.textContent);

  if (hearts.textContent === "0") gameOver();
};


const createLives = () => {
  const hearts = document.querySelector(".hearts");
  hearts.innerHTML = `<div class='icon-score'><i class="bi bi-star-fill"></i><span>0</span></div>
                      <div class='icon-heart'><i class="bi bi-heart-fill"></i><span>5</span></div>`;
};

const createQuestion = (question) => {
  const containerQuestion = document.querySelector(".question");
  containerQuestion.innerHTML = `<h3>${question}</h3>`;
};

const createAnswers = (answers) => {
  const divAnswers = document.querySelector(".answer");
  const spans = answers.map((answer) => `<span>${answer}</span>`).join("");
  divAnswers.innerHTML = spans;
};
const setDisplayGame = () => {
  gameArea.style.display = 'flex'
  divActions.style.display = `flex`;
};

const optionSelected = () => {
  const alternatives = document.querySelectorAll(".answer span");
  alternatives.forEach((option) => {
    option.addEventListener("click", () => {
      alternatives.forEach(removeClassOnElement);

      option.classList.add("selected");
    });
  });
};

const removeClassOnElement = (item) => {
  item.removeAttribute("class");
};

const verifyAnswer = (contentAnswer, correctAnswer) => {
  const isCorrect = contentAnswer === correctAnswer;
  const message = isCorrect ? "Você acertou!" : "Você errou, que pena";
  const status = isCorrect ? "success" : "failed";
  const callbackFunction = isCorrect ? addScore : removeLives;

  return [message, status, callbackFunction];
};

const setMessageAboutAnswer = (message, status) => {
  divMessage.innerHTML = `<div class='message ${status}'>${message}</div>`;
};

const gameOver = () => {
  container.classList.replace('main-container','game_over')
  container.innerHTML = `<span>Game Over!</span>`;
};

const getQuestionsByAPI = async () => {
  try {
    const response = await fetch('../db/data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("problema na api");
  }
};


const selectQuestion = data =>{
  const randomQuestion = Math.floor(Math.random() * data.length)
  return data[randomQuestion]
}