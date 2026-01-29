/* --- FILE: script.js (Đuổi hình bắt chữ) --- */
/* 1. KHO DỮ LIỆU CÂU HỎI (Cập nhật theo hình ảnh thực tế) */
const questionDatabase = {
    // KHỐI 10: Phần cứng, Hệ điều hành, Phần mềm văn phòng
    "10a1": [
        { image: "../images/5.jpg", answer: "BANPHIM", hint: "Thiết bị nhập liệu chính (7 ký tự)" },
        { image: "../images/6.jpg", answer: "CHUOT", hint: "Thiết bị điều khiển con trỏ (5 ký tự)" },
        { image: "../images/7.jpg", answer: "WINDOWS", hint: "Hệ điều hành máy tính phổ biến nhất (7 ký tự)" },
        { image: "../images/8.jpg", answer: "ANDROID", hint: "Hệ điều hành điện thoại phổ biến (7 ký tự)" },
        { image: "../images/9.jpg", answer: "WORD", hint: "Phần mềm soạn thảo văn bản (4 ký tự)" },
        { image: "../images/3.jpg", answer: "EXCEL", hint: "Phần mềm bảng tính (5 ký tự)" },
        { image: "../images/19.jpg", answer: "USB", hint: "Thiết bị lưu trữ di động nhỏ gọn (3 ký tự)" },
        { image: "../images/28.jpg", answer: "WEBCAM", hint: "Camera gắn trên máy tính (6 ký tự)" },
        { image: "../images/43.jpg", answer: "RAM", hint: "Bộ nhớ truy cập ngẫu nhiên (3 ký tự)" },
        { image: "../images/44.jpg", answer: "OCUNG", hint: "Nơi lưu trữ dữ liệu lâu dài (5 ký tự)" }, // HDD
        { image: "../images/40.jpg", answer: "THUNGRAC", hint: "Nơi chứa các file đã xóa (8 ký tự)" },
        { image: "../images/12.jpg", answer: "WIFI", hint: "Mạng không dây (4 ký tự)" }
    ],
    // KHỐI 11: Lập trình Python, Thuật toán
    "11a1": [
        { image: "../images/10.jpg", answer: "PYTHON", hint: "Ngôn ngữ lập trình logo con rắn (6 ký tự)" },
        { image: "../images/35.jpg", answer: "STRING", hint: "Kiểu dữ liệu xâu ký tự (6 ký tự)" },
        { image: "../images/57.jpg", answer: "BIEN", hint: "Dùng để lưu trữ giá trị thay đổi (4 ký tự)" },
        { image: "../images/58.jpg", answer: "HANG", hint: "Giá trị không thay đổi trong chương trình (4 ký tự)" },
        { image: "../images/60.jpg", answer: "DEBUG", hint: "Quá trình tìm và sửa lỗi (5 ký tự)" },
        { image: "../images/18.jpg", answer: "BUG", hint: "Lỗi phần mềm (Con bọ) (3 ký tự)" },
        { image: "../images/67.jpg", answer: "IF", hint: "Câu lệnh kiểm tra điều kiện (2 ký tự)" },
        { image: "../images/68.jpg", answer: "VONGLAP", hint: "Thực hiện lặp lại một công việc (7 ký tự)" },
        { image: "../images/53.jpg", answer: "THUATTOAN", hint: "Các bước giải quyết vấn đề (9 ký tự)" }, // Flowchart
        { image: "../images/31.jpg", answer: "PRINT", hint: "Lệnh in ra màn hình (5 ký tự)" }
    ],
    // KHỐI 12: CSDL, Mạng, AI
    "12a1": [
        { image: "../images/81.jpg", answer: "CSDL", hint: "Nơi lưu trữ dữ liệu có tổ chức (4 ký tự)" },
        { image: "../images/83.jpg", answer: "ACCESS", hint: "Hệ quản trị CSDL của Microsoft (6 ký tự)" },
        { image: "../images/89.jpg", answer: "SQL", hint: "Ngôn ngữ truy vấn dữ liệu (3 ký tự)" },
        { image: "../images/87.jpg", answer: "KHOA", hint: "Dùng để xác định duy nhất hàng (4 ký tự)" },
        { image: "../images/96.jpg", answer: "HTML", hint: "Ngôn ngữ đánh dấu siêu văn bản (4 ký tự)" },
        { image: "../images/106.jpg", answer: "AI", hint: "Trí tuệ nhân tạo (2 ký tự)" },
        { image: "../images/107.jpg", answer: "HOCMAY", hint: "Machine Learning (6 ký tự)" },
        { image: "../images/102.jpg", answer: "SERVER", hint: "Máy chủ (6 ký tự)" },
        { image: "../images/110.jpg", answer: "TUONGLUA", hint: "Hệ thống bảo vệ mạng (8 ký tự)" }, // Firewall
        { image: "../images/11.jpg", answer: "INTERNET", hint: "Mạng toàn cầu (8 ký tự)" },
        { image: "../images/26.jpg", answer: "DAMMAY", hint: "Điện toán ... (Cloud) (6 ký tự)" },
        { image: "../images/101.jpg", answer: "LIENKET", hint: "Kết nối giữa các trang web (7 ký tự)" }
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
            // Placeholder nếu ảnh lỗi
            els.img.src = "https://via.placeholder.com/400x200?text=Loi+Anh+" + q.answer; 
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
            
            // --- LƯU ĐIỂM (TIMEOUT) ---
            if (typeof window.saveScoreToFirebase === "function") {
                window.saveScoreToFirebase(score);
            }
            
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
    // --- LƯU ĐIỂM (WIN ALL) ---
    if (typeof window.saveScoreToFirebase === "function") {
        window.saveScoreToFirebase(score);
    }

    showModal('win', 'XUẤT SẮC!', `Bạn đã hoàn thành tất cả câu hỏi với ${score} điểm!`, 'Về Menu', () => {
        window.location.href = 'hub.html';
    });
}

document.addEventListener("DOMContentLoaded", init);
