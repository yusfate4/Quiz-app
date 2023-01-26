const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectButton = e.target;
  const correct = selectButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What city is the current federal capital territory of Nigeria?",
    answers: [
      { text: "Lagos", correct: false },
      { text: "Osun", correct: false },
      { text: "Abuja", correct: true },
      { text: "Adamawa", correct: false },
    ],
  },

  {
    question:
      "What is the name of the first Nigerian to become a Noble Laureate?",
    answers: [
      { text: "Wole Soyinka", correct: true },
      { text: "Albert Marculay", correct: false },
      { text: "Robert Soyinka", correct: false },
      { text: "ADeyinka Adewale", correct: false },
    ],
  },

  {
    question: "What does centenary mean?",
    answers: [
      { text: "20 year", correct: false },
      { text: "200 years", correct: false },
      { text: "100 years", correct: true },
      { text: "500 years", correct: false },
    ],
  },

  {
    question:
      "What is the name of the Nigerian current speaker of the house of Assembly?",
    answers: [
      { text: "Babtunde Fashola", correct: false },
      { text: "Femi Gbajabiamila", correct: true },
      { text: "Akinwunmi Ambode", correct: false },
      { text: "Wole Soyinka", correct: false },
    ],
  },

  {
    question: "Which University is the premier university in Nigeria?",
    answers: [
      { text: "University of Abuja", correct: false },
      { text: "University of Nigeria", correct: false },
      { text: "University of Ibadan", correct: true },
      { text: "University of Lagos", correct: false },
    ],
  },

  {
    question: "How many local Governments does Nigeria have?",
    answers: [
      { text: "193", correct: false },
      { text: "774", correct: true },
      { text: "345", correct: false },
      { text: "190", correct: false },
    ],
  },

  {
    question: "Choose the correct spelling",
    answers: [
      { text: "Commitee", correct: false },
      { text: "Committee", correct: true },
      { text: "comittee", correct: false },
      { text: "committe", correct: false },
    ],
  },
];
