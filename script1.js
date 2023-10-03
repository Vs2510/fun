// DOM elements
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");

// Initialize user name
let userName = "";

// Initialize question index
let currentQuestionIndex = -1;

// Function to start the game by asking for the user's name
function startGame() {
    questionContainer.innerHTML = `
        <label for="name-input">Enter Your Name:</label>
        <input type="text" id="name-input" placeholder="Enter your name">
        <button id="start-button">Start</button>
    `;

    // Add event listener to the "Start" button
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", handleStart);
}

// Function to handle the "Start" button click
function handleStart() {
    const nameInput = document.getElementById("name-input");
    userName = nameInput.value.trim();
    if (userName === "") {
        alert("Please enter your name.");
        return;
    }

    // Start the first question
    currentQuestionIndex = 0;
    loadQuestion();
}

// Sample questions and compatibility scoring
const questions = [
    {
        question: "What's her favorite color?",
        options: [
            { option: "Red", score: 0 },
            { option: "Black", score: 5 },
           
        ],
    },
    {
        question: "Which dress does she prefer?",
        options: [
            { option: "Traditional", score: 5 },
            { option: "Western", score: 4 },
            
        ],
    },
    {
        question: "Do she likes to travel?",
        options: [
            { option: "Yes", score: 5 },
            { option: "No", score: 1 },
        ],
    },
    {
        question: "Somali's Fav food?",
        options: [
            { option: "Chinese", score: 5 },
            { option: "Italian", score: 1 },
        ],
    },
    {
        question: "Her fav movie?",
        options: [
            { option: "Kuch kuch hota hai", score: 1},
            { option: "Jab we met", score: 5 },
        ],
    },
];

// Initialize compatibility score
let compatibilityScore = 0;

// Function to start the game by asking for the user's name
function startGame() {
    questionContainer.innerHTML = `
        <label for="name-input">Enter Your Name:</label>
        <input type="text" id="name-input" placeholder="Enter your name">
        <button id="start-button">Start</button>
    `;

    // Add event listener to the "Start" button
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", handleStart);
}

// Function to handle the "Start" button click
function handleStart() {
    const nameInput = document.getElementById("name-input");
    userName = nameInput.value.trim();
    if (userName === "") {
        alert("Please enter your name.");
        return;
    }

    // Start the first question
    currentQuestionIndex = 0;
    loadQuestion();
}

// Function to load and display questions
function loadQuestion() {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = `
            <p>${question.question}</p>
            <ul>
                ${question.options.map(
                    (option, index) => `
                    <li>
                        <input type="radio" name="answer" value="${option.score}" id="option${index}">
                        <label for="option${index}">${option.option}</label>
                    </li>
                `
                ).join("")}
            </ul>
            <button id="next-button">Next</button>
        `;

        // Add event listener to the "Next" button
        const nextButton = document.getElementById("next-button");
        nextButton.addEventListener("click", handleNext);
    } else {
        // Display compatibility result
        displayResult();
    }
}

// Function to handle the "Next" button click
function handleNext() {
    const selectedAnswer = document.querySelector("input[name='answer']:checked");

    if (selectedAnswer) {
        compatibilityScore += parseInt(selectedAnswer.value);
        currentQuestionIndex++;
        loadQuestion();
    } else {
        alert("Please select an answer.");
    }
}

// Function to display compatibility result
function displayResult() {
    questionContainer.style.display = "none";
    const percentageScore = ((compatibilityScore / (questions.length * 5)) * 100).toFixed(2);

    let resultMessage = "";

    // Set the threshold for eligibility (e.g., 70% for eligibility)
    const eligibilityThreshold = 70;

    if (percentageScore >= eligibilityThreshold) {
        resultMessage = `Congratulations, ${userName}! You are eligible.`;
    } else {
        resultMessage = `Sorry, ${userName}, you are not eligible.`;
    }

    resultContainer.style.display = "block";
    resultContainer.innerHTML = `
        <p>Your compatibility score is: ${percentageScore}%</p>
        <p>${resultMessage}</p>
    `;
}

// Start the game by asking for the user's name
startGame();