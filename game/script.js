/* DATA CÂU HỎI FULL */
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
         { image: "../images/11_python.jpg", answer: "PYTHON", hint: "Ngôn ngữ lập trình con trăn (6 ký tự)" },
         { image: "../images/11_bien.jpg", answer: "BIEN", hint: "Dùng để lưu trữ giá trị (4 ký tự)" },
         { image: "../images/11_if.jpg", answer: "IF", hint: "Câu lệnh kiểm tra điều kiện (2 ký tự)" },
         { image: "../images/11_for.jpg", answer: "VONGLAP", hint: "Thực hiện công việc lặp lại (7 ký tự)" },
         { image: "../images/11_array.jpg", answer: "MANG", hint: "Tập hợp các phần tử cùng kiểu (4 ký tự)" },
         { image: "../images/11_input.jpg", answer: "INPUT", hint: "Lệnh nhập dữ liệu từ bàn phím (5 ký tự)" },
         { image: "../images/11_print.jpg", answer: "PRINT", hint: "Lệnh xuất dữ liệu ra màn hình (5 ký tự)" },
         { image: "../images/11_int.jpg", answer: "INTEGER", hint: "Kiểu dữ liệu số nguyên (7 ký tự)" },
         { image: "../images/11_float.jpg", answer: "FLOAT", hint: "Kiểu dữ liệu số thực (5 ký tự)" },
         { image: "../images/11_string.jpg", answer: "STRING", hint: "Kiểu dữ liệu xâu ký tự (6 ký tự)" },
         { image: "../images/11_bug.jpg", answer: "BUG", hint: "Lỗi trong chương trình (3 ký tự)" },
         { image: "../images/11_debug.jpg", answer: "DEBUG", hint: "Quá trình sửa lỗi (5 ký tự)" }
    ],
    "12a1": [
         { image: "../images/12_csdl.jpg", answer: "CSDL", hint: "Viết tắt Cơ sở dữ liệu (4 ký tự)" },
         { image: "../images/12_access.jpg", answer: "ACCESS", hint: "Hệ quản trị CSDL của Microsoft (6 ký tự)" },
         { image: "../images/12_sql.jpg", answer: "SQL", hint: "Ngôn ngữ truy vấn dữ liệu (3 ký tự)" },
         { image: "../images/12_table.jpg", answer: "BANG", hint: "Nơi chứa dữ liệu gồm hàng và cột (4 ký tự)" },
         { image: "../images/12_key.jpg", answer: "KHOACHINH", hint: "Dùng để xác định duy nhất mỗi hàng (9 ký tự)" },
         { image: "../images/12_query.jpg", answer: "TRUYVAN", hint: "Hỏi và trích xuất dữ liệu (7 ký tự)" },
         { image: "../images/12_baocao.jpg", answer: "BAOCAO", hint: "Dùng để xuất dữ liệu ra giấy (6 ký tự)" },
         { image: "../images/12_html.jpg", answer: "HTML", hint: "Ngôn ngữ đánh dấu siêu văn bản (4 ký tự)" },
         { image: "../images/12_network.jpg", answer: "MANG", hint: "Kết nối các máy tính với nhau (4 ký tự)" },
         { image: "../images/12_wifi.jpg", answer: "WIFI", hint: "Mạng không dây (4 ký tự)" },
         { image: "../images/12_server.jpg", answer: "SERVER", hint: "Máy chủ lưu trữ dữ liệu (6 ký tự)" },
         { image: "../images/12_cloud.jpg", answer: "DAMMAY", hint: "Điện toán ... (6 ký tự)" }
    ]
};

/* BIẾN & ELEMENT */
let currentQuestions = [];
let currentIndex = 0;
let userAnswer = [];
let score = 0;
let canPlay = true;
let timerInterval;
let timeLeft = 60;
let isScoreSaved = false;

const els = {
    grade: document.getElementById("grade-select"),
    img: document.getElementById("current-image"),
    slots: document.getElementById("answer-container"),
    keyboard: document.getElementById("keyboard-container"),
    score: document.getElementById("score-value"),
    timer: document.getElementById("timer")
};

/* XÁO TRỘN */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/* KHỞI ĐỘNG */
function init() {
    console.log("Game đã kết nối!");
    score = parseInt(localStorage.getItem("gameScore")) || 0;
    if(els.score) els.score.innerText = score;
    
    if(els.grade) {
        els.grade.addEventListener("change", (e) => loadGrade(e.target.value));
        loadGrade("10a1");
    } else {
        loadGrade("10a1");
    }

    // Logic Mobile Menu
    window.toggleMobileMenu = function() {
        const menu = document.getElementById('mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        if(menu && overlay) {
            menu.classList.toggle('active');
            overlay.classList.toggle('active');
        }
    };

    // Logic Dark Mode
    const body = document.body;
    const themeBtn = document.getElementById('theme-toggle');
    
    function setTheme(isDark) {
        if (isDark) { body.classList.add('dark-mode'); localStorage.setItem('theme', 'dark'); }
        else { body.classList.remove('dark-mode'); localStorage.setItem('theme', 'light'); }
    }
    
    if (localStorage.getItem('theme') === 'dark') setTheme(true);
    if(themeBtn) themeBtn.addEventListener('click', () => setTheme(!body.classList.contains('dark-mode')));
}

function loadGrade(grade) {
    const rawData = questionDatabase[grade] || questionDatabase["10a1"];
    currentQuestions = shuffleArray([...rawData]); 
    currentIndex = 0;
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timerInterval);
    canPlay = true;
    isScoreSaved = false;

    if (!currentQuestions || currentIndex >= currentQuestions.length) {
        endGame();
        return;
    }

    const q = currentQuestions[currentIndex];

    // FIX LỖI TREO: Vẽ ô chữ NGAY LẬP TỨC
    userAnswer = Array(q.answer.length).fill("");
    renderSlots();
    renderKeyboard();
    startTimer();

    // XỬ LÝ ẢNH
    if(els.img) {
        els.img.style.opacity = 0.3;
        const spinner = document.querySelector('.loading-spinner');
        if(spinner) spinner.style.display = 'block';

        els.img.src = q.image;
        
        els.img.onload = () => { 
            els.img.style.opacity = 1; 
            if(spinner) spinner.style.display = 'none'; 
        };
        
        els.img.onerror = () => {
            console.log("Ảnh lỗi, dùng ảnh thay thế");
            els.img.src = `https://via.placeholder.com/400x200?text=${q.answer}`;
            els.img.style.opacity = 1; 
            if(spinner) spinner.style.display = 'none';
        };
    }
}

/* UI RENDER */
function renderSlots() {
    if(!els.slots) return;
    els.slots.innerHTML = "";
    userAnswer.forEach((char, i) => {
        const div = document.createElement("div");
        div.className = "slot" + (char ? " filled" : "");
        div.innerText = char;
        div.onclick = () => { if(canPlay && char !== "") { userAnswer[i] = ""; renderSlots(); } };
        els.slots.appendChild(div);
    });
}

function renderKeyboard() {
    if(!els.keyboard) return;
    els.keyboard.innerHTML = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    chars.split("").forEach(c => {
        const btn = document.createElement("button");
        btn.innerText = c;
        btn.className = "key-btn";
        btn.onclick = () => typeChar(c);
        els.keyboard.appendChild(btn);
    });
    
    const del = document.createElement("button");
    del.innerHTML = "<i class='fas fa-backspace'></i>";
    del.className = "key-btn key-del";
    del.onclick = () => {
        if (!canPlay) return;
        for (let i = userAnswer.length - 1; i >= 0; i--) {
            if (userAnswer[i]) { userAnswer[i] = ""; renderSlots(); return; }
        }
    };
    els.keyboard.appendChild(del);
}

function typeChar(char) {
    if (!canPlay) return;
    const idx = userAnswer.indexOf("");
    if (idx !== -1) {
        userAnswer[idx] = char;
        renderSlots();
        if (!userAnswer.includes("")) checkWin();
    }
}

/* LOGIC THẮNG/THUA */
function checkWin() {
    const correct = currentQuestions[currentIndex].answer;
    const inputAnswer = userAnswer.join("");

    if (inputAnswer === correct) {
        clearInterval(timerInterval);
        canPlay = false;
        score += 10;
        if(els.score) els.score.innerText = score;
        localStorage.setItem("gameScore", score);

        showModal('win', 'CHÍNH XÁC!', `Đáp án: <b>${correct}</b> (+10 điểm)`, 'Câu Tiếp', () => {
            currentIndex++;
            loadQuestion();
        });
    } else {
        if(els.slots) {
            els.slots.classList.add('shake-animation');
            setTimeout(() => els.slots.classList.remove('shake-animation'), 500);
        }
        document.querySelectorAll('.slot').forEach(s => { s.style.borderColor = "#ff7675"; s.style.color = "#ff7675"; });
        setTimeout(() => {
            document.querySelectorAll('.slot').forEach(s => { s.style.borderColor = "#b2bec3"; s.style.color = "#2d3436"; });
            renderSlots();
        }, 1000);
    }
}

function startTimer() {
    timeLeft = 60;
    if(els.timer) els.timer.innerText = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        if(els.timer) els.timer.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            canPlay = false;
            saveCurrentScoreSafe();
            showModal('lose', 'HẾT GIỜ!', `Điểm: <b>${score}</b>`, 'Chơi Lại', () => {
                localStorage.setItem("gameScore", 0);
                location.reload();
            });
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    saveCurrentScoreSafe();
    showModal('win', 'HOÀN THÀNH!', `Tổng điểm: <b>${score}</b>`, 'Về Menu', () => {
        localStorage.setItem("gameScore", 0);
        window.location.href = 'hub.html';
    });
}

function saveCurrentScoreSafe() {
    if (typeof window.saveScoreToFirebase === "function" && score > 0 && !isScoreSaved) {
        window.saveScoreToFirebase(score);
        isScoreSaved = true;
    }
}

/* MODAL & HELPERS */
window.showCurrentHint = function() {
    if(!canPlay) return;
    showModal('hint', 'GỢI Ý', currentQuestions[currentIndex].hint, 'Đã Hiểu');
}

let modalCallback = null;
function showModal(type, title, msg, btnText = "Đóng", callback = null) {
    const modal = document.getElementById('custom-modal');
    if(!modal) { alert(msg.replace(/<[^>]*>?/gm, '')); if(callback) callback(); return; }
    
    const iconMap = { 'win': '🎉', 'lose': '💔', 'hint': '💡' };
    modal.className = `modal-overlay active type-${type}`;
    document.getElementById('modal-icon').innerHTML = iconMap[type] || '🔔';
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-msg').innerHTML = msg;
    document.getElementById('modal-btn').innerText = btnText;

    const btn = document.getElementById('modal-btn');
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.onclick = () => { closeModal(); if(callback) callback(); };
}

window.closeModal = function() {
    const modal = document.getElementById('custom-modal');
    if(modal) modal.classList.remove('active');
}

document.addEventListener("DOMContentLoaded", init);
