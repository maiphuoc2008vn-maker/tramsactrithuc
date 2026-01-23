// ĐƯỜNG DẪN ÂM THANH: Bỏ '../' vì folder sounds nằm ngay cạnh file damboc.js
const snd = {
    punch: new Audio('sounds/punch.mp3'),
    hit: new Audio('sounds/hit.mp3'),
    win: new Audio('sounds/siuuu.mp3'), // Bạn có thể thay bằng tiếng reo hò
    lose: new Audio('sounds/lose.mp3')
};

function playSnd(name) {
    snd[name].currentTime = 0;
    snd[name].play().catch(e => console.log("Lỗi âm thanh: ", e));
}

const questions = {
    10: [
        { q: "Thiết bị nào là 'não bộ' của máy tính?", a: ["RAM", "CPU", "Chuột", "Loa"], c: 1 },
        { q: "1 Byte bằng bao nhiêu bit?", a: ["4", "8", "16", "32"], c: 1 },
        { q: "Hệ điều hành là phần mềm gì?", a: ["Ứng dụng", "Hệ thống", "Tiện ích", "Đồ họa"], c: 1 },
        { q: "Phím tắt để Copy là gì?", a: ["Ctrl+V", "Ctrl+C", "Ctrl+X", "Ctrl+Z"], c: 1 },
        { q: "1GB bằng bao nhiêu MB?", a: ["100", "1000", "1024", "128"], c: 2 },
        { q: "Phần mềm duyệt Web là?", a: ["Word", "Excel", "Chrome", "Paint"], c: 2 },
        { q: "Đâu là thiết bị vào?", a: ["Màn hình", "Loa", "Bàn phím", "Máy in"], c: 2 },
        { q: "Bộ nhớ RAM bị mất điện sẽ?", a: ["Mất dữ liệu", "Còn dữ liệu", "Cháy máy", "Không sao"], c: 0 },
        { q: "Tên miền .gov dành cho?", a: ["Công ty", "Trường học", "Chính phủ", "Cá nhân"], c: 2 },
        { q: "CPU viết tắt của từ gì?", a: ["Central Unit", "Control Unit", "Central Processing Unit", "Main Unit"], c: 2 }
    ],
    11: [
        { q: "Lệnh in trong Python là?", a: ["out()", "write()", "print()", "show()"], c: 2 },
        { q: "Kiểu số nguyên trong Python?", a: ["float", "str", "bool", "int"], c: 3 },
        { q: "Kết quả 10 % 3 là?", a: ["3", "1", "0", "3.3"], c: 1 },
        { q: "Vòng lặp biết trước số lần?", a: ["while", "for", "if", "else"], c: 1 }
    ],
    12: [
        { q: "CSDL là viết tắt của?", a: ["Cơ sở dữ liệu", "Cơ cấu dữ liệu", "Công sức", "Cổng số"], c: 0 },
        { q: "Lệnh lấy dữ liệu trong SQL?", a: ["GET", "TAKE", "SELECT", "FETCH"], c: 2 },
        { q: "Khóa chính dùng để?", a: ["Bảo mật", "Phân biệt bản ghi", "Sắp xếp", "Xóa"], c: 1 }
    ]
};

let pHP = 5, eHP = 5, currentQs = [], qIdx = 0;

function startGame(lv) {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';
    currentQs = [...questions[lv]].sort(() => Math.random() - 0.5);
    qIdx = 0; pHP = 5; eHP = 5;
    renderQuestion();
}

function renderQuestion() {
    if (qIdx >= currentQs.length) { alert("Hết câu hỏi!"); location.reload(); return; }
    const q = currentQs[qIdx];
    document.getElementById('question').innerText = q.q;
    const btnBox = document.getElementById('answer-grid');
    btnBox.innerHTML = '';
    q.a.forEach((ans, i) => {
        const btn = document.createElement('button');
        btn.innerText = ans;
        btn.onclick = () => checkAnswer(i === q.c);
        btnBox.appendChild(btn);
    });
}

function checkAnswer(isCorrect) {
    const p = document.getElementById('player'), e = document.getElementById('enemy');
    const pBox = document.getElementById('player-hp-slots'), eBox = document.getElementById('enemy-hp-slots');

    if (isCorrect) {
        playSnd('punch');
        p.classList.add('player-punch');
        setTimeout(() => {
            p.classList.remove('player-punch');
            e.classList.add('hit-shake');
            eBox.classList.add('damaged');
            eHP--;
            updateHP('enemy-hp-slots', eHP);
            setTimeout(() => { e.classList.remove('hit-shake'); eBox.classList.remove('damaged'); checkEnd(); }, 300);
        }, 200);
    } else {
        playSnd('hit');
        e.classList.add('enemy-punch');
        setTimeout(() => {
            e.classList.remove('enemy-punch');
            p.classList.add('hit-shake');
            pBox.classList.add('damaged');
            pHP--;
            updateHP('player-hp-slots', pHP);
            setTimeout(() => { p.classList.remove('hit-shake'); pBox.classList.remove('damaged'); checkEnd(); }, 300);
        }, 200);
    }
}

function updateHP(id, val) {
    const slots = document.getElementById(id).children;
    for (let i = 4; i >= val; i--) { if(slots[i]) slots[i].classList.add('lost'); }
}

function checkEnd() {
    if (eHP <= 0) showResult("win");
    else if (pHP <= 0) showResult("lose");
    else { qIdx++; renderQuestion(); }
}

function showResult(status) {
    document.getElementById('quiz-area').style.display = 'none';
    const screen = document.getElementById('result-screen');
    const img = document.getElementById('result-img');
    const title = document.getElementById('result-title');

    if (status === "win") {
        playSnd('win');
        title.innerText = "BẠN CHIẾN THẮNG!";
        img.src = "../images/hocsinh.jpg"; // Hoặc ảnh học sinh nâng cúp
        document.getElementById('result-msg').innerText = "BẠN ĐÃ ĐÁNH BẠI ROBOT!";
    } else {
        playSnd('lose');
        title.innerText = "ROBOT CHIẾN THẮNG!";
        img.src = "../images/robot-win.jpg"; // Ảnh robot nâng cúp
        document.getElementById('result-msg').innerText = "ROBOT ĐÃ CHIẾN THẮNG BẠN!";
    }
    screen.style.display = "flex";
}
