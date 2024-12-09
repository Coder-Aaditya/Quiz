const totalQuestions = 100; // Update if you add more questions
const correctAnswers = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3,0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3,0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3,0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3,0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3,0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3,0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3,0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3,0, 0, 0, 1]; // Correct answer indices for Question 1 and Question 2
let userName = "";
let userRollNo = "";

function startQuiz() {
    const name = document.getElementById('name').value.trim();
    const rollNo = document.getElementById('rollNo').value.trim();

    if (!name || !rollNo) {
        alert("Please enter both your name and roll number.");
        return;
    }

    userName = name;
    userRollNo = rollNo;

    // Hide intro and show quiz
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('quizContainer').classList.remove('hidden');
}

function submitQuiz() {
    let userScore = 0;

    // Iterate through all questions
    for (let i = 1; i <= totalQuestions; i++) {
        const userAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        if (!userAnswer) {
            alert(`Please answer Question ${i}!`);
            return;
        }

        const options = document.querySelectorAll(`input[name="q${i}"]`);
        options.forEach((option, index) => {
            option.disabled = true; // Disable all options

            if (parseInt(option.value) === correctAnswers[i - 1]) {
                option.parentElement.classList.add('correct-text'); // Correct answer text color
            } else if (option === userAnswer && parseInt(option.value) !== correctAnswers[i - 1]) {
                option.parentElement.classList.add('incorrect-text'); // Wrong answer text color
            }
        });

        // Increment score if the answer is correct
        if (parseInt(userAnswer.value) === correctAnswers[i - 1]) {
            userScore++;
        }
    }

    const percentage = ((userScore / totalQuestions) * 100).toFixed(0);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <table class="result-table">
            <tr>
                <th>Marks Scored</th>
                <th>Percentage</th>
            </tr>
            <tr>
                <td>${userScore}/${totalQuestions}</td>
                <td>${percentage}%</td>
            </tr>
        </table>
    `;

    // Populate certificate content
    document.getElementById('certName').textContent = userName;
    document.getElementById('certRollNo').textContent = userRollNo;
    document.getElementById('certTotalMarks').textContent = `${userScore}/${totalQuestions}`;
    document.getElementById('certPercentage').textContent = `${percentage}%`;

    // Show certificate and download button
    document.getElementById('certificate').style.display = 'block';
    document.getElementById('downloadBtn').style.display = 'inline-block';
}

function downloadCertificate() {
    const certificate = document.getElementById('certificate');
    html2canvas(certificate, { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'Certificate.png';
        link.click();
    });
}
