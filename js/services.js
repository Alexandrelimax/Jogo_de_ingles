// const container = document.querySelector(".main-container");

//  const createQuestion = (question) => {
//   const containerQuestion = document.querySelector(".question");
//   containerQuestion.innerHTML = `<h3>${question}</h3>`;
// };

//  const createAnswers = (answers) => {
//   const divAnswers = document.querySelector(".answer");
//   const spans = answers.map((answer) => `<span>${answer}</span>`).join("");
//   divAnswers.innerHTML = spans;
// };

//  const createLives = () => {
//   const hearts = document.querySelector(".hearts");
//   hearts.innerHTML = `<i class="bi bi-heart-fill"></i><span>5</span>`;
// };

//  const removeClassOnElement = (item) => {
//   item.removeAttribute("class");
// };

// const gameOver = () => {
//   container.innerHTML = `<div class='game_over'>Game Over!</div>`;
//   container.style.backgroundColor = "#9c0808";
//   container.style.backgroundImage = "none";
// };

//  const createButtonsActions = () => {
//   const divActions = document.querySelector(".actions");
//   divActions.innerHTML = `<button class="confirm">Confirmar resposta</button>
//                             <button class="next">Pular resposta</button>`;
// };

//  const setMessageAboutAnswer = (resultAnswer) => {
//   const divMessage = document.querySelector(".message");
//   const [message, status] = resultAnswer.split("|");
//   divMessage.innerHTML = `<div class='message ${status}'>${message}</div>`;
// };

// const getQuestionsByAPI = async () => {
//   const url = "http://localhost:3000/getQuestion";
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("problema na api");
//   }
// };

// module.exports = {
//   setMessageAboutAnswer,
//   createAnswers,
//   gameOver,
//   createButtonsActions,
//   removeClassOnElement,
//   createLives,
//   createQuestion,
//   getQuestionsByAPI
// };