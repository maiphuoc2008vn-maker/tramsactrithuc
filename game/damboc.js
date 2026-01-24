// ÂM THANH: Thư mục sounds nằm trong game/ nên chỉ cần gọi sounds/
const snd = {
    punch: new Audio('sounds/punch.mp3'),
    hit: new Audio('sounds/hit.mp3'),
    win: new Audio('sounds/siuuu.mp3'),
    lose: new Audio('sounds/lose.mp3')
};

function play(name) {
    snd[name].currentTime = 0;
    snd[name].play().catch(() => {});
}

const questions = {
    10: [
        { q: "Thiết bị nào là 'não bộ' của máy tính?", a: ["RAM", "CPU", "Chuột", "Loa"], c: 1 },
        { q: "1 Byte bằng bao nhiêu bit?", a: ["4", "8", "16", "32"], c: 1 },
        { q: "Hệ điều hành là phần mềm gì?", a: ["Ứng dụng", "Hệ thống", "Tiện ích", "Đồ họa"], c: 1 },
        { q: "Phím tắt để Copy là gì?", a: ["Ctrl+V", "Ctrl+C", "Ctrl+X", "Ctrl+Z"], c: 1 }
        // ... (Bạn có thể thêm các câu hỏi khác vào đây)
    ],
    11: [],
    12: []
};

let pHP = 5, eHP = 5, currentQs = [], qIdx = 0;

function startGame(lv) {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';
    
    // Nếu khối lớp chưa có câu hỏi, dùng tạm câu hỏi lớp 10 để test
    const qs = questions[lv].length > 0 ? questions[lv] : questions[10];
    
    currentQs = [...qs].sort(() => Math.random() - 0.5);
    qIdx = 0; pHP = 5; eHP = 5;
    
    // Reset thanh máu về mặc định (xanh)
    resetHP();
    
    renderQuestion();
}

function resetHP() {
    // Xóa class 'lost' ở tất cả các slot máu
    const pSlots = document.getElementById('player-hp-slots').children;
    const eSlots = document.getElementById('enemy-hp-slots').children;
    for (let s of pSlots) s.classList.remove('lost');
    for (let s of eSlots) s.classList.remove('lost');
}

function renderQuestion() {
    if (qIdx >= currentQs.length) { 
        alert("Hết câu hỏi!"); 
        location.reload(); 
        return; 
    }
    const q = currentQs[qIdx];
    document.getElementById('question').innerText = q.q;
    const btnBox = document.getElementById('answers');
    btnBox.innerHTML = '';
    q.a.forEach((ans, i) => {
        const btn = document.createElement('button');
        btn.innerText = ans;
        btn.onclick = () => checkAnswer(i === q.c);
        btnBox.appendChild(btn);
    });
}

function checkAnswer(isCorrect) {
    const player = document.getElementById('player');
    const enemy = document.getElementById('enemy');
    const pBox = document.getElementById('player-hp-slots'), eBox = document.getElementById('enemy-hp-slots');

    if (isCorrect) {
        // Người chơi đánh
        play('punch');
        player.classList.add('player-punch');
        setTimeout(() => {
            player.classList.remove('player-punch');
            enemy.classList.add('hit-shake');
            eBox.classList.add('damaged');
            eHP--;
            updateHP('enemy-hp-slots', eHP);
            setTimeout(() => { enemy.classList.remove('hit-shake'); eBox.classList.remove('damaged'); checkEnd(); }, 300);
        }, 200);
    } else {
        // Robot đánh
        play('hit');
        enemy.classList.add('enemy-punch');
        setTimeout(() => {
            enemy.classList.remove('enemy-punch');
            player.classList.add('hit-shake');
            pBox.classList.add('damaged');
            pHP--;
            updateHP('player-hp-slots', pHP);
            setTimeout(() => { player.classList.remove('hit-shake'); pBox.classList.remove('damaged'); checkEnd(); }, 300);
        }, 200);
    }
}

function updateHP(id, val) {
    const slots = document.getElementById(id).children;
    // Cập nhật các ô máu bị mất
    for (let i = 4; i >= val; i--) { 
        if(slots[i]) slots[i].classList.add('lost'); 
    }
}

function checkEnd() {
    if (eHP <= 0) showResult("win");
    else if (pHP <= 0) showResult("lose");
    else { qIdx++; renderQuestion(); }
}

function showResult(status) {
    const screen = document.getElementById('result-screen');
    document.getElementById('quiz-area').style.display = 'none';
    
    const resultImg = document.getElementById('result-img');
    const resultTitle = document.getElementById('result-title');
    const resultMsg = document.getElementById('result-msg');

    if (status === "win") {
        play('win');
        resultTitle.innerText = "BẠN CHIẾN THẮNG!";
        // Ảnh Học sinh (.jpeg)
        resultImg.src = "../images/hocsinh.jpeg";
        resultMsg.innerText = "HỌC SINH ĐÃ ĐÁNH BẠI ROBOT!";
    } else {
        play('lose');
        resultTitle.innerText = "THẤT BẠI!";
        // Ảnh Robot (.jpeg) - Dùng ảnh robot thường nếu không có ảnh robot-win
        resultImg.src = "../images/robot.jpeg";
        resultMsg.innerText = "ROBOT ĐÃ CHIẾN THẮNG!";
    }
    screen.style.display = "flex";
}
