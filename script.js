let startTime, endTime;
let inputParagraph = "";
let typedParagraph = "";
let timerStarted = false;

function startTypingTest() {
    inputParagraph = document.getElementById("inputParagraph").value;
    if (inputParagraph.trim() === "") {
        alert("Please enter a paragraph to practice.");
        return;
    }

    document.getElementById("displayParagraph").innerText = inputParagraph;
    document.getElementById("typingArea").disabled = false;
    document.getElementById("typingArea").focus();
    document.getElementById("typingTestSection").style.display = "block";
    document.getElementById("inputParagraph").disabled = true;
    document.getElementById("inputParagraph").style.display = "none";
}

function startTimer() {
    if (!timerStarted) {
        startTime = new Date();
        timerStarted = true;
    }
}

function submitTypingTest() {
    endTime = new Date();
    typedParagraph = document.getElementById("typingArea").value;

    const timeTaken = (endTime - startTime) / 1000; // time in seconds
    const totalWords = typedParagraph.split(/\s+/).length;
    const errors = calculateErrors(inputParagraph, typedParagraph);
    const accuracy = ((totalWords - errors.count) / totalWords) * 100;

    document.getElementById("totalWords").innerText = totalWords;
    document.getElementById("errors").innerText = errors.count;
    document.getElementById("accuracy").innerText = accuracy.toFixed(2);
    document.getElementById("typingTime").innerText = timeTaken.toFixed(2);
    document.getElementById("highlightedErrors").innerHTML = errors.highlightedText;

    document.getElementById("resultsSection").style.display = "block";
    document.getElementById("typingArea").disabled = true;
}

function calculateErrors(original, typed) {
    const originalWords = original.split(/\s+/);
    const typedWords = typed.split(/\s+/);
    let errorCount = 0;
    let highlightedText = "";

    for (let i = 0; i < originalWords.length; i++) {
        if (i >= typedWords.length) {
            highlightedText += `<span id="error">${originalWords[i]} </span>`;
            errorCount++;
        } else if (originalWords[i] !== typedWords[i]) {
            highlightedText += `<span id="error">${typedWords[i] || ''}</span> `;
            errorCount++;
        } else {
            highlightedText += `${typedWords[i]} `;
        }
    }

    return { count: errorCount, highlightedText: highlightedText.trim() };
}

function resetTest() {
    document.getElementById("inputParagraph").value = "";
    document.getElementById("typingArea").value = "";
    document.getElementById("typingArea").disabled = true;
    document.getElementById("inputParagraph").disabled = false;
    document.getElementById("inputParagraph").style.display = "block";
    document.getElementById("typingTestSection").style.display = "none";
    document.getElementById("resultsSection").style.display = "none";
    timerStarted = false;
}
