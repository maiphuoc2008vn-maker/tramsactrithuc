const questions = {
    10: [
        { q: "Thiết bị nào là 'não bộ' của máy tính?", a: ["RAM", "CPU", "Chuột", "Loa"], c: 1 },
        { q: "1 Byte bằng bao nhiêu bit?", a: ["4", "8", "16", "32"], c: 1 },
        { q: "Hệ điều hành là phần mềm gì?", a: ["Ứng dụng", "Hệ thống", "Tiện ích", "Đồ họa"], c: 1 },
        { q: "Phím tắt để Sao chép (Copy) là?", a: ["Ctrl + V", "Ctrl + C", "Ctrl + X", "Ctrl + Z"], c: 1 },
        { q: "Đơn vị đo dung lượng lớn nhất là?", a: ["KB", "MB", "GB", "TB"], c: 3 }
    ],
    11: [
        { q: "Trong Python, để in ra màn hình ta dùng lệnh?", a: ["out()", "write()", "print()", "show()"], c: 2 },
        { q: "Kiểu dữ liệu số nguyên trong Python là?", a: ["float", "str", "bool", "int"], c: 3 },
        { q: "Dấu nào dùng để ghi chú 1 dòng trong Python?", a: ["//", "/*", "#", "--"], c: 2 },
        { q: "Lệnh input() trả lời trả về kiểu gì?", a: ["int", "float", "string", "list"], c: 2 },
        { q: "Để lặp với số lần biết trước, ta dùng vòng lặp?", a: ["while", "for", "do-while", "repeat"], c: 1 }
    ],
    12: [
        { q: "CSDL là viết tắt của từ gì?", a: ["Cơ sở dữ liệu", "Cơ cấu dữ liệu", "Công sức dữ liệu", "Cổng số dữ liệu"], c: 0 },
        { q: "Trong SQL, để lấy dữ liệu ta dùng lệnh?", a: ["GET", "TAKE", "SELECT", "FETCH"], c: 2 },
        { q: "Khóa chính dùng để làm gì?", a: ["Bảo mật", "Phân biệt bản ghi", "Sắp xếp", "Xóa nhanh"], c: 1 },
        { q: "Mạng máy tính diện rộng viết tắt là?", a: ["LAN", "MAN", "WAN", "PAN"], c: 2 },
        { q: "Thiết bị kết nối các mạng khác nhau gọi là?", a: ["Hub", "Switch", "Router", "Bridge"], c: 2 }
    ]
};

let pHP = 5, eHP = 5, currentQs = [], qIdx = 0;

function startGame(lv) {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';
    // Lấy câu hỏi và xáo trộn
    currentQs = questions[lv].sort(() => Math.random() - 0.5);
    qIdx = 0;
    renderQuestion();
}

function renderQuestion() {
    if (qIdx >= currentQs.length) {
        alert("Hết câu hỏi! Trận đấu hòa.");
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
    const ronaldo = document.getElementById('player');
    const messi = document.getElementById('enemy');

    if (isCorrect) {
        // Trả lời đúng -> Ronaldo (Bạn) đấm Messi
        ronaldo.classList.add('player-punch');
        setTimeout(() => {
            ronaldo.classList.remove('player-punch');
            messi.classList.add('hit-shake');
            eHP--;
            updateHP('enemy-hp-slots', eHP);
            setTimeout(() => messi.classList.remove('hit-shake'), 300);
            checkEnd();
        }, 200);
    } else {
        // Trả lời sai -> Messi đấm Ronaldo (Bạn)
        messi.classList.add('enemy-punch');
        setTimeout(() => {
            messi.classList.remove('enemy-punch');
            ronaldo.classList.add('hit-shake');
            pHP--;
            updateHP('player-hp-slots', pHP);
            setTimeout(() => ronaldo.classList.remove('hit-shake'), 300);
            checkEnd();
        }, 200);
    }
}

function updateHP(id, val) {
    const slots = document.getElementById(id).children;
    // Đánh dấu slot bị mất (lost) từ phải sang trái
    for (let i = 4; i >= val; i--) {
        slots[i].classList.add('lost');
    }
}

function checkEnd() {
    if (eHP <= 0) {
        setTimeout(() => { 
            alert("RONALDO CHIẾN THẮNG! SIUUUUUUU!"); 
            location.reload(); 
        }, 500);
    } else if (pHP <= 0) {
        setTimeout(() => { 
            alert("MESSI CHIẾN THẮNG! BẠN ĐÃ BỊ ĐO VÁN."); 
            location.reload(); 
        }, 500);
    } else {
        qIdx++;
        setTimeout(renderQuestion, 600);
    }
}
