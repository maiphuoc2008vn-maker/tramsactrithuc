/* 1. KHO DỮ LIỆU CÂU HỎI */
const questionDatabase = {
    "10a1": [
        { image: "../images/5.jpg", answer: "BANPHIM", hint: "Thiết bị nhập dữ liệu (7 ký tự)" },
        { image: "../images/6.jpg", answer: "CHUOT", hint: "Thiết bị điều khiển con trỏ (5 ký tự)" },
        { image: "../images/19.jpg", answer: "USB", hint: "Thiết bị lưu trữ di động (3 ký tự)" },
        { image: "../images/28.jpg", answer: "WEBCAM", hint: "Camera kỹ thuật số (6 ký tự)" },
        { image: "../images/29.jpg", answer: "TAINGHE", hint: "Thiết bị âm thanh (7 ký tự)" },
        { image: "../images/44.jpg", answer: "HDD", hint: "Ổ cứng đĩa từ (3 ký tự)" },
        { image: "../images/45.jpg", answer: "SSD", hint: "Ổ cứng thể rắn (3 ký tự)" },
        { image: "../images/43.jpg", answer: "RAM", hint: "Bộ nhớ truy cập ngẫu nhiên (3 ký tự)" },
        { image: "../images/cpu.jpg", answer: "CPU", hint: "Bộ não máy tính (3 ký tự)" },
        { image: "../images/7.jpg", answer: "WINDOWS", hint: "Hệ điều hành của Microsoft (7 ký tự)" },
        { image: "../images/9.jpg", answer: "WORD", hint: "Phần mềm soạn thảo (4 ký tự)" },
        { image: "../images/3.jpg", answer: "EXCEL", hint: "Phần mềm bảng tính (5 ký tự)" },
        { image: "../images/15.jpg", answer: "GOOGLE", hint: "Công cụ tìm kiếm số 1 (6 ký tự)" }
    ],
    "11a1": [
         { image: "../images/11_python.jpg", answer: "PYTHON", hint: "Ngôn ngữ lập trình (6 ký tự)" },
         { image: "../images/11_bien.jpg", answer: "BIEN", hint: "Dùng để lưu trữ giá trị (4 ký tự)" },
         { image: "../images/11_if.jpg", answer: "IF", hint: "Câu lệnh điều kiện (2 ký tự)" },
         { image: "../images/11_for.jpg", answer: "VONGLAP", hint: "Công việc lặp lại (7 ký tự)" },
         { image: "../images/11_array.jpg", answer: "MANG", hint: "Tập hợp phần tử cùng kiểu (4 ký tự)" },
         { image: "../images/11_input.jpg", answer: "INPUT", hint: "Lệnh nhập dữ liệu (5 ký tự)" },
         { image: "../images/11_print.jpg", answer: "PRINT", hint: "Lệnh xuất dữ liệu (5 ký tự)" }
    ],
    "12a1": [
         { image: "../images/12_csdl.jpg", answer: "CSDL", hint: "Cơ sở dữ liệu (4 ký tự)" },
         { image: "../images/12_access.jpg", answer: "ACCESS", hint: "Hệ quản trị CSDL (6 ký tự)" },
         { image: "../images/12_sql.jpg", answer: "SQL", hint: "Ngôn ngữ truy vấn (3 ký tự)" },
         { image: "../images/12_table.jpg", answer: "BANG", hint: "Chứa dữ liệu hàng và cột (4 ký tự)" }
    ]
};

/* 2. BIẾN TOÀN CỤC */
let currentQuestions = [];
let currentIndex = 0;
let userAnswer = [];
let score = 0;
let canPlay = true;
let timerInterval;
let timeLeft = 60;

const els = {
    grade: document.getElementById("grade-select"),
    img: document.getElementById("current-image"),
    slots: document.getElementById("answer-container"),
    keyboard: document.getElementById("keyboard-container"),
    score: document.getElementById("score-value"),
    timer: document.getElementById("timer")
};

/* 3. LOGIC GAME */
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function init() {
    score = 0;
    if(els.score) els.score.innerText = score;
    if(els.grade) {
        els.grade.addEventListener("change", (e) => loadGrade(e.target.value));
    }
    loadGrade("10a1");
}

function loadGrade(grade) {
    currentQuestions = shuffle([...questionDatabase[grade]]);
    currentIndex = 0;
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timerInterval);
    if (currentIndex >= currentQuestions.length) {
        endGame();
        return;
    }

    const q = currentQuestions[currentIndex];
    userAnswer = Array(q.answer.length).fill("");
    canPlay = true;

    renderSlots();
    renderKeyboard();
    startTimer();

    // Hiển thị ảnh
    if(els.img) {
        els.img.style.opacity = 0.3;
        els.img.src = q.image;
        els.img.onload = () => els.img.style.opacity = 1;
        els.img.onerror = () => {
            els.img.src = "https://via.placeholder.com/400x200?text=Loi+Anh";
            els.img.style.opacity = 1;
        };
    }
}

function renderSlots() {
    els.slots.innerHTML = "";
    userAnswer.forEach((char, i) => {
        const div = document.createElement("div");
        div.className = "slot" + (char ? " filled" : "");
        div.innerText = char;
        div.onclick = () => { if(canPlay) { userAnswer[i] = ""; renderSlots(); } };
        els.slots.appendChild(div);
    });
}

function renderKeyboard() {
    els.keyboard.innerHTML = "";
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(c => {
        const btn = document.createElement("button");
        btn.innerText = c;
        btn.className = "key-btn";
        btn.onclick = () => {
            const emptyIdx = userAnswer.indexOf("");
            if (canPlay && emptyIdx !== -1) {
                userAnswer[emptyIdx] = c;
                renderSlots();
                if (!userAnswer.includes("")) checkWin();
            }
        };
        els.keyboard.appendChild(btn);
    });
}

function checkWin() {
    const correct = currentQuestions[currentIndex].answer;
    if (userAnswer.join("") === correct) {
        clearInterval(timerInterval);
        canPlay = false;
        score += 10;
        els.score.innerText = score;
        showModal('win', 'CHÍNH XÁC!', `Đáp án: ${correct}`, 'Câu tiếp', () => {
            currentIndex++;
            loadQuestion();
        });
    } else {
        // Hiệu ứng rung khi sai
        els.slots.style.animation = "shake 0.5s";
        setTimeout(() => els.slots.style.animation = "", 500);
    }
}

function startTimer() {
    timeLeft = 60;
    els.timer.innerText = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        els.timer.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            canPlay = false;
            showModal('lose', 'HẾT GIỜ!', `Điểm của bạn: ${score}`, 'Chơi lại', () => location.reload());
        }
    }, 1000);
}

function showModal(type, title, msg, btnText, callback) {
    const modal = document.getElementById('custom-modal');
    modal.className = `modal-overlay active type-${type}`;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-msg').innerText = msg;
    const btn = document.getElementById('modal-btn');
    btn.innerText = btnText;
    btn.onclick = () => { modal.classList.remove('active'); if(callback) callback(); };
}

window.showCurrentHint = function() {
    if(!canPlay) return;
    showModal('hint', 'GỢI Ý', currentQuestions[currentIndex].hint, 'Đã hiểu');
}

function endGame() {
    showModal('win', 'HOÀN THÀNH!', `Tổng điểm: ${score}`, 'Về Menu', () => {
        window.location.href = 'hub.html';
    });
}

document.addEventListener("DOMContentLoaded", init);
