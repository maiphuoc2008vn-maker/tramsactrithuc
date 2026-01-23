const questions = [
    {
        code: `<span class="kwd">if</span> x = 5:\n    <span class="func">print</span>(<span class="str">"Hello"</span>)`,
        q: "Lỗi sai trong dòng lệnh IF này là gì?",
        options: ["Thiếu dấu (:)", "Dùng sai toán tử (==)", "Lệnh print viết sai", "Biến x chưa khai báo"],
        correct: 1,
        explain: "Trong Python, so sánh bằng phải dùng '=='."
    },
    {
        code: `my_list = [1, 2, 3]\n<span class="func">print</span>(my_list[3])`,
        q: "Chương trình sẽ báo lỗi gì?",
        options: ["SyntaxError", "IndexError", "NameError", "In ra số 3"],
        correct: 1,
        explain: "Danh sách có 3 phần tử thì index tối đa là 2."
    },
    {
        code: `<span class="kwd">for</span> i <span class="kwd">in</span> <span class="func">range</span>(5)\n    <span class="func">print</span>(i)`,
        q: "Đoạn code này thiếu ký tự nào?",
        options: ["Dấu chấm phẩy (;)", "Dấu ngoặc đơn ()", "Dấu hai chấm (:)", "Dấu chấm (.)"],
        correct: 2,
        explain: "Sau lệnh for/if/while bắt buộc phải có dấu hai chấm."
    }
];

let currentIdx = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
let canClick = true;

function initGame() {
    currentIdx = 0;
    score = 0;
    timeLeft = 60;
    canClick = true;
    document.getElementById('score').innerText = score;
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('feedback-overlay').classList.add('hidden');
    loadQuestion();
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 10) {
            document.getElementById('timer-box').style.background = "#ff4757";
        }
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showEndGame("HẾT GIỜ!");
        }
    }, 1000);
}

function loadQuestion() {
    if (currentIdx >= questions.length) {
        showEndGame("HOÀN THÀNH!");
        return;
    }
    canClick = true;
    document.getElementById('feedback-overlay').classList.add('hidden');
    const data = questions[currentIdx];
    document.getElementById('code-display').innerHTML = data.code;
    document.getElementById('question-text').innerText = data.q;
    
    const optsDiv = document.getElementById('options-container');
    optsDiv.innerHTML = "";
    data.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'code-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optsDiv.appendChild(btn);
    });
}

function checkAnswer(index, btn) {
    if (!canClick) return;
    canClick = false;
    const data = questions[currentIdx];
    
    if (index === data.correct) {
        btn.classList.add('correct');
        score += 10;
        document.getElementById('score').innerText = score;
        showFeedback(true, "CHÍNH XÁC!", data.explain);
    } else {
        btn.classList.add('wrong');
        document.querySelectorAll('.code-btn')[data.correct].classList.add('correct');
        showFeedback(false, "SAI RỒI!", data.explain);
    }
}

function showFeedback(isCorrect, title, msg) {
    setTimeout(() => {
        document.getElementById('feedback-overlay').classList.remove('hidden');
        document.getElementById('feedback-icon').innerHTML = isCorrect ? '✅' : '❌';
        document.getElementById('feedback-title').innerText = title;
        document.getElementById('feedback-msg').innerText = msg;
    }, 600);
}

function nextQuestion() {
    if (currentIdx < questions.length - 1) {
        currentIdx++;
        loadQuestion();
    } else {
        showEndGame("HOÀN THÀNH!");
    }
}

function showEndGame(title) {
    clearInterval(timerInterval);
    document.getElementById('feedback-overlay').classList.remove('hidden');
    document.getElementById('feedback-icon').innerHTML = '🏆';
    document.getElementById('feedback-title').innerText = title;
    document.getElementById('feedback-msg').innerText = `Điểm của bạn: ${score}`;
    const nextBtn = document.getElementById('next-btn-text');
    nextBtn.innerText = "Về Kho Game";
    nextBtn.onclick = () => location.href = "hub.html";
}

// Chạy game
initGame();
