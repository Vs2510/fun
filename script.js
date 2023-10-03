// Sample compatibility scores for different factors
const compatibilityScores = {
    factor1: 4,
    factor2: 5,
    factor3: 3,
    factor4: 2,
    factor5: 4,
};

// DOM elements
const nameInput = document.getElementById("name-input");
const startTestButton = document.getElementById("start-test-button");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const canvas = document.getElementById("compatibility-chart");
const ctx = canvas.getContext("2d");

// Function to draw the compatibility radar chart
function drawRadarChart(scores) {
    const canvasSize = 400;
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    const maxScore = 5; // Maximum score for each factor

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw radar axes
    ctx.strokeStyle = "#008080"; // Teal color
    ctx.beginPath();
    for (let i = 0; i < Object.keys(scores).length; i++) {
        const angle = (Math.PI * 2 * i) / Object.keys(scores).length;
        const x = centerX + Math.cos(angle) * canvasSize / 2;
        const y = centerY + Math.sin(angle) * canvasSize / 2;
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = "rgba(0, 128, 128, 0.5)"; // Teal color with transparency
    ctx.beginPath();
    let firstPoint = true;
    let labelIndex = 0;

    for (const [factor, score] of Object.entries(scores)) {
        const angle = (Math.PI * 2 * labelIndex) / Object.keys(scores).length;
        const radius = (score / maxScore) * (canvasSize / 2);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
        } else {
            ctx.lineTo(x, y);
        }

        labelIndex++;
    }
    ctx.closePath();
    ctx.fill();
}

// Function to start the compatibility test
function startTest() {
    // Hide the test form and display the result container
    const userName = nameInput.value;
    resultContainer.style.display = "block";
    questionContainer.style.display = "none";

    // Call the function to draw the radar chart with compatibility scores
    drawRadarChart(compatibilityScores);
}

// Event listener for the "Start Test" button
startTestButton.addEventListener("click", startTest);
