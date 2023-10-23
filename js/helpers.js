export const paintCorrectAnswer = (contentAnswer, correctAnswer) => {
    const alternatives = document.querySelectorAll(".answer span");
    const ArrayAlternatives = [...alternatives]
    const alternativecorrect = ArrayAlternatives.find(element => element.textContent === correctAnswer)

    alternativecorrect.classList.add(alternativecorrect.textContent === contentAnswer ? 'good' : 'bad')
}

export const createAnswers = (answers) => {
    const divAnswers = document.querySelector(".answer");
    const spans = answers.map((answer) => `<span>${answer}</span>`).join("");
    divAnswers.innerHTML = spans;
};

export const scroolToTop = () => {
    scrollTo({ top: 0, behavior: "smooth" })
}


export const createLives = () => {
    const hearts = document.querySelector(".hearts");
    hearts.innerHTML = `<div class='icon-score'><i class="bi bi-star-fill"></i><span>0</span></div>
                        <div class='icon-heart'><i class="bi bi-heart-fill"></i><span>5</span></div>`;
};

export const createQuestion = (question) => {
    const containerQuestion = document.querySelector(".question");
    containerQuestion.innerHTML = `<h3>${question}</h3>`;
};

export const optionSelected = () => {
    const alternatives = document.querySelectorAll(".answer span");
    alternatives.forEach((option) => {
        option.addEventListener("click", () => {
            alternatives.forEach(removeClassOnElement);

            option.classList.add("selected");
        });
    });
};

export const removeClassOnElement = (item) => {
    item.removeAttribute("class");
};

export const verifyGameOverMessage = parentElement => {
    const gameoverMessage = document.querySelector('.game-over-message')
    if (gameoverMessage) {
        parentElement.removeChild(gameoverMessage)
    }
}

export const setMessageAboutAnswer = (message, status, divMessage) => {
    divMessage.innerHTML = `<div class='message ${status}'>${message}</div>`;
};

export const setGameOverMessage = () => {
    const span = document.createElement('span')
    span.classList.add('game-over-message')
    span.textContent = 'Game Over'
    return span
}

export const setStyleStartButton = button => {
    const divButtonStart = button.parentElement
    divButtonStart.style.display = 'block'
    button.style.backgroundColor = '#f26b6b'
    button.textContent = 'Ah tadinho, vai chorar ou tentar de novo? Clica aqui!'
    button.style.fontSize = '1.5em'
}
