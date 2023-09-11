const container = document.querySelector(".main-container");

const start = document.querySelector(".menu li:first-child a");

const buttonNext = document.querySelector(".next");

const createQuestion = ({ question }) => {
  const containerQuestion = document.querySelector(".question");
  containerQuestion.innerHTML = `<h3>${question}</h3>`
};

const removeClassOnElement = (item) => {
  item.removeAttribute("class");
};
const createAnswers = ({answers}) =>{
  const divAnswers = document.querySelector(".answer");

  const spans = answers.map(answer =>`<span>${answer}</span>`).join('');
  divAnswers.innerHTML = spans
}

const choosenAnswer = () => {
  const spans = document.querySelectorAll('.answer span')
  spans.forEach((choosen) => {
    choosen.addEventListener("click", () => {
      spans.forEach(removeClassOnElement);

      choosen.classList.add("selected");
    });
  });
};


const verifyAnswer = (contentAnswer, { correctAnswer }) => {
  const isCorrect = contentAnswer === correctAnswer;
  const message = isCorrect ? "Você acertou!" : "Você errou, que pena";
  const status = isCorrect ? "success" : "error";

  return `${message}|${status}`;
};

const sendAnswer = (questions) => {
  const buttonConfirm = document.querySelector(".confirm");

  buttonConfirm.addEventListener("click", () => {
    const userAnswer = document.querySelector(".selected");
    if (!userAnswer) return;
    const contentAnswer = userAnswer.textContent;
    console.log('ola');
    const result = verifyAnswer(contentAnswer, questions);
    setMessageAboutAnswer(result);

    checkLives(result);
  });
};

start.addEventListener("click", (event) => {
  event.preventDefault();
  createLives()
  createQuestion(arr[0]);
  createAnswers(arr[0])
  createButtonsActions()
  choosenAnswer();
  sendAnswer(arr[0]);

});

const createLives = () =>{
  const hearts = document.querySelector(".hearts");
  hearts.innerHTML = `<i class="bi bi-heart-fill"></i><span>5</span>`
}


const checkLives = (result) => {
  const quantityLives = document.querySelector('.hearts span')

  const status = result.split("|")[1];

  if (status === "error") {
    quantityLives.innerHTML = Number(--quantityLives.textContent);
  }

  if (quantityLives.textContent === "0") {
    gameOver();
  }
};

const gameOver = ()=>{
  container.innerHTML = `<div class='game_over'>Game Over!</div>`
  container.style.backgroundColor = '#9c0808'
}


const setMessageAboutAnswer = (result) => {
  const divMessage = document.querySelector('.message')
  const [message, status] = result.split("|");
  divMessage.innerHTML = `<div class='message ${status}'>${message}</div>`
};



const createButtonsActions =()=>{
  const divActions = document.querySelector('.actions')
  divActions.innerHTML = `<button class="confirm">Confirmar resposta</button>
                          <button class="next">Pular resposta</button>`
}


















let arr = [
  {
    question: "Qual a capital do Brasil",
    answers: ["rio de janeiro", "sao paulo", "minas gerais"],
    correctAnswer: "rio de janeiro",
  },
  { question: "bla bla", answers: ["1", "2", "3"], correctAnswer: "2" },
  { question: "bla bla", answers: ["1", "2", "3"], correctAnswer: "2" },
  { question: "bla bla", answers: ["1", "2", "3"], correctAnswer: "2" },
  { question: "bla bla", answers: ["1", "2", "3"], correctAnswer: "2" },
  { question: "bla bla", answers: ["1", "2", "3"], correctAnswer: "2" },
  { question: "bla bla", answers: ["1", "2", "3"], correctAnswer: "2" },
  { question: "bla bla", answers: ["1", "2", "3"], correctAnswer: "2" },
  { question: "bla bla", answers: ["1", "2", "3"], correctAnswer: "2" },
];
