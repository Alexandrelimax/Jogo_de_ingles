const container = document.querySelector(".main-container");
const start = document.querySelector(".menu li:first-child a");

const createQuestion = (question) => {
  const containerQuestion = document.querySelector(".question");
  containerQuestion.innerHTML = `<h3>${question}</h3>`;
};

const createAnswers = (answers) => {
  const divAnswers = document.querySelector(".answer");

  const spans = answers.map((answer) => `<span>${answer}</span>`).join("");
  divAnswers.innerHTML = spans;
};

const createLives = () => {
  const hearts = document.querySelector(".hearts");
  hearts.innerHTML = `<i class="bi bi-heart-fill"></i><span>5</span>`;
};

const removeClassOnElement = (item) => {
  item.removeAttribute("class");
};
//----------------------------------------------------------------------------------------------------
const choosenAnswer = () => {
  const spans = document.querySelectorAll(".answer span");
  spans.forEach((choosen) => {
    choosen.addEventListener("click", () => {
      spans.forEach(removeClassOnElement);

      choosen.classList.add("selected");
    });
  });
};

const verifyAnswer = (contentAnswer, correctAnswer) => {
  const isCorrect = contentAnswer === correctAnswer;
  const message = isCorrect ? "Você acertou!" : "Você errou, que pena";
  const status = isCorrect ? "success" : "error";

  return `${message}|${status}`;
};


const sendAnswer = (correctAnswer) => {
  const buttonConfirm = document.querySelector(".confirm");

  buttonConfirm.removeEventListener("click", confirmAnswerEvent);
  buttonConfirm.addEventListener("click", confirmAnswerEvent);


  function confirmAnswerEvent() {
    const selectAnswer = document.querySelector(".selected");
    if (!selectAnswer) return;
    console.log(correctAnswer);
    const contentAnswer = selectAnswer.textContent;
    const resultAnswer = verifyAnswer(contentAnswer, correctAnswer);
    
    setMessageAboutAnswer(resultAnswer);
    checkLives(resultAnswer);
    
  }
};


const setMessageAboutAnswer = (resultAnswer) => {
  const divMessage = document.querySelector(".message");
  const [message, status] = resultAnswer.split("|");
  divMessage.innerHTML = `<div class='message ${status}'>${message}</div>`;
};

start.addEventListener("click", async(event) => {
  event.preventDefault();
  try {
    const data = await getQuestionsByAPI();
    createLives();
    createButtonsActions();

    startNewGame(data);
    nextQuestion(data)
  } catch (error) {
    console.error(error);
  }
});

const startNewGame = (data) => {
  const { question, answers, correctAnswer} = selectQuestion(data);
  
  createQuestion(question);
  createAnswers(answers);
  choosenAnswer();
  sendAnswer(correctAnswer);
  
};

const nextQuestion = (data)=>{
  const nextQuestion = document.querySelector(".next");
  nextQuestion.addEventListener("click", () => {
    startNewGame(data)
  })
}

const checkLives = (result) => {
  const quantityLives = document.querySelector(".hearts span");

  const status = result.split("|")[1];

  if (status === "error") {
    quantityLives.innerHTML = Number(--quantityLives.textContent);
  } 

  if (quantityLives.textContent === "0") {

    gameOver();
  }
};

const gameOver = () => {
  container.innerHTML = `<div class='game_over'>Game Over!</div>`;
  container.style.backgroundColor = "#9c0808";
  container.style.backgroundImage = "none";
};

const createButtonsActions = () => {
  const divActions = document.querySelector(".actions");
  divActions.innerHTML = `<button class="confirm">Confirmar resposta</button>
                          <button class="next">Pular resposta</button>`;
};


const getQuestionsByAPI = async () => {
  const url = "http://localhost:3000/getQuestion";
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("problema na api");
  }
};

const selectQuestion = (data) => {
  const randomQuestion = Math.floor(Math.random() * data.length);
  const newQuestion = data[randomQuestion];
  console.log(newQuestion);
  return newQuestion;
};


