/* 1. KHO DỮ LIỆU CÂU HỎI ĐỒ SỘ */
const questionDatabase = {
    "10a1": [
        { image: "../images/10.jpg", answer: "BANPHIM", hint: "Thiết bị nhập liệu chính (7 ký tự)" },
        { image: "../images/100.jpg", answer: "CHUOT", hint: "Thiết bị điều khiển con trỏ (5 ký tự)" },
        { image: "../images/101.jpg", answer: "MANHINH", hint: "Thiết bị xuất hình ảnh (7 ký tự)" },
        { image: "../images/102.jpg", answer: "MAYIN", hint: "Dùng để đưa dữ liệu ra giấy (5 ký tự)" },
        { image: "../images/110.jpg", answer: "WINDOWS", hint: "Hệ điều hành phổ biến nhất (7 ký tự)" },
        { image: "../images/111.jpg", answer: "PHANMEM", hint: "Các chương trình chạy trong máy (7 ký tự)" },
        { image: "../images/112.jpg", answer: "OCUNG", hint: "Nơi lưu trữ dữ liệu lâu dài (5 ký tự)" },
        { image: "../images/113.jpg", answer: "LOA", hint: "Thiết bị phát âm thanh (3 ký tự)" },
        { image: "../images/114.jpg", answer: "BONHO", hint: "RAM còn được gọi là gì? (5 ký tự)" },
        { image: "../images/115.jpg", answer: "CARD", hint: "Thiết bị xử lý đồ họa (4 ký tự)" }
    ],
    "11a1": [
         { image: "../images/103.jpg", answer: "PYTHON", hint: "Ngôn ngữ lập trình dễ học (6 ký tự)" },
         { image: "../images/104.jpg", answer: "BIEN", hint: "Dùng để lưu trữ giá trị (4 ký tự)" },
         { image: "../images/105.jpg", answer: "VONGLAP", hint: "Cấu trúc for hoặc while (7 ký tự)" },
         { image: "../images/116.jpg", answer: "HAM", hint: "Một khối lệnh thực hiện việc cụ thể (3 ký tự)" },
         { image: "../images/117.jpg", answer: "MANG", hint: "Danh sách các phần tử (4 ký tự)" },
         { image: "../images/118.jpg", answer: "KIEU", hint: "Số nguyên, số thực gọi là ... dữ liệu (4 ký tự)" },
         { image: "../images/119.jpg", answer: "BUG", hint: "Lỗi trong chương trình (3 ký tự)" },
         { image: "../images/120.jpg", answer: "IF", hint: "Câu lệnh rẽ nhánh (2 ký tự)" },
         { image: "../images/121.jpg", answer: "INPUT", hint: "Lệnh nhập từ bàn phím (5 ký tự)" },
         { image: "../images/122.jpg", answer: "STRING", hint: "Kiểu dữ liệu xâu ký tự (6 ký tự)" }
    ],
    "12a1": [
         { image: "../images/106.jpg", answer: "CSDL", hint: "Cơ sở dữ liệu viết tắt (4 ký tự)" },
         { image: "../images/107.jpg", answer: "ACCESS", hint: "Phần mềm quản trị CSDL của MS (6 ký tự)" },
         { image: "../images/108.jpg", answer: "SQL", hint: "Ngôn ngữ truy vấn cấu trúc (3 ký tự)" },
         { image: "../images/109.jpg", answer: "BANG", hint: "Cấu trúc gồm hàng và cột (4 ký tự)" },
         { image: "../images/123.jpg", answer: "KHOA", hint: "Dùng để liên kết các bảng (4 ký tự)" },
         { image: "../images/124.jpg", answer: "TRUYVAN", hint: "Lấy dữ liệu từ bảng (7 ký tự)" },
         { image: "../images/125.jpg", answer: "BAOCAO", hint: "Kết quả cuối cùng để in ấn (6 ký tự)" },
         { image: "../images/126.jpg", answer: "SERVER", hint: "Máy chủ lưu trữ trang web (6 ký tự)" },
         { image: "../images/127.jpg", answer: "WIFI", hint: "Kết nối mạng không dây (4 ký tự)" },
         { image: "../images/128.jpg", answer: "INTERNET", hint: "Mạng toàn cầu (8 ký tự)" }
    ]
};

/* 2. CÁC BIẾN ĐIỀU KHIỂN */
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

/* 3. HÀM KHỞI TẠO */
function init() {
    score = 0;
    if(els.score) els.score.innerText = score;
    if(els.grade) {
        els.grade.onchange = (e) => loadGrade(e.target.value);
    }
    loadGrade("10a1");
}

function loadGrade(grade) {
    if (!questionDatabase[grade]) return;
    // Xáo trộn thứ tự câu hỏi để mỗi lần chơi mỗi khác
    currentQuestions = [...questionDatabase[grade]].sort(() => Math.random() - 0.5);
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

    // Hiển thị ảnh với hiệu ứng mờ dần
    if(els.img) {
        els.img.style.opacity = 0;
        els.img.src = q.image;
        els.img.onload = () => els.img.style.opacity = 1;
        els.img.onerror = () => {
            els.img.src = "https://via.placeholder.com/400x200?text=Anh+So+" + q.image.split('/').pop();
            els.img.style.opacity = 1;
        };
    }
}

/* 4. VẼ GIAO DIỆN */
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
    const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    keys.forEach(c => {
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

    // Nút Xóa
    const del = document.createElement("button");
    del.innerHTML = "Xóa";
    del.className = "key-btn";
    del.style.background = "#ff7675";
    del.onclick = () => {
        for(let i=userAnswer.length-1; i>=0; i--) {
            if(userAnswer[i] !== "") { userAnswer[i] = ""; renderSlots(); break; }
        }
    };
    els.keyboard.appendChild(del);
}

/* 5. XỬ LÝ THẮNG/THUA */
function checkWin() {
    const correct = currentQuestions[currentIndex].answer;
    if (userAnswer.join("") === correct) {
        clearInterval(timerInterval);
        canPlay = false;
        score += 10;
        els.score.innerText = score;
        showModal('win', 'TUYỆT VỜI!', `Đáp án: ${correct}`, 'Tiếp tục', () => {
            currentIndex++;
            loadQuestion();
        });
    } else {
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
            showModal('lose', 'HẾT GIỜ!', `Bạn đã đạt được ${score} điểm`, 'Chơi lại', () => location.reload());
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
    showModal('win', 'XUẤT SẮC!', `Bạn đã hoàn thành tất cả câu hỏi với ${score} điểm!`, 'Về Menu', () => {
        window.location.href = 'hub.html';
    });
}

document.addEventListener("DOMContentLoaded", init);
