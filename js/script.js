const container = document.querySelector(".main-container");
const hearts = document.querySelector('.hearts span')
const start = document.querySelector(".menu li:first-child a");
const spans = document.querySelectorAll(".answer span");
const buttonConfirm = document.querySelector(".confirm");
const buttonNext = document.querySelector(".next");

const createQuestion = ({ question }) => {
  const h3 = document.createElement("h3");

  h3.innerHTML = question;
  return h3;
};


const appendQuestionOnDiv = (content_question) => {
  const containerQuestion = document.querySelector(".question");
  containerQuestion.innerHTML = "";
  containerQuestion.appendChild(content_question);
};


const setAnswerOnSpan = ({ answers }) => {
  spans.forEach((span, index) => {
    span.innerHTML = answers[index];
  });
};


const removeClassOnElement = (item) => {
  item.removeAttribute("class");
};


const choosenAnswer = () => {
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
  buttonConfirm.addEventListener("click", () => {
    const userAnswer = document.querySelector(".selected");
    if (!userAnswer) return;
    const contentAnswer = userAnswer.textContent;
    const result = verifyAnswer(contentAnswer, questions);
    setMessageAboutAnswer(result);
    
    checkLives(result, hearts);
  });
};


start.addEventListener("click", (event) => {
  event.preventDefault();
  container.style.display = 'flex';
  hearts.innerHTML = '5'
  const question = createQuestion(arr[0]);

  appendQuestionOnDiv(question);

  setAnswerOnSpan(arr[0]);

  choosenAnswer();
sendAnswer(arr[0]);


});

const checkLives = (result, hearts) =>{    
    const status = result.split('|')[1];

    if(status === 'error'){
        hearts.innerHTML = Number(--hearts.textContent)
    }
    
    if(hearts.textContent === '0'){
        console.log('game over');
    }
}


const setMessageAboutAnswer = (result) => {
  resetMessage(container);
  const div = document.createElement("div");

  const [message, status] = result.split("|");

  div.innerHTML = message;
  div.classList.add("message");
  div.classList.add(status);
  container.insertAdjacentElement("afterbegin", div);
};


const resetMessage = (parent) => {
  const divMessage = document.querySelector(".message");
  divMessage && parent.removeChild(divMessage);
};







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
