const questions = {
    10: [
        { q: "Thiết bị nào là 'não bộ' của máy tính?", a: ["RAM", "CPU", "Chuột", "Loa"], c: 1 },
        { q: "1 Byte bằng bao nhiêu bit?", a: ["4", "8", "16", "32"], c: 1 },
        { q: "Hệ điều hành là phần mềm gì?", a: ["Ứng dụng", "Hệ thống", "Tiện ích", "Đồ họa"], c: 1 },
        { q: "Phím tắt để Sao chép (Copy) là?", a: ["Ctrl + V", "Ctrl + C", "Ctrl + X", "Ctrl + Z"], c: 1 },
        { q: "Đơn vị đo dung lượng lớn nhất là?", a: ["KB", "MB", "GB", "TB"], c: 3 },
        { q: "Phần mềm nào sau đây là trình duyệt web?", a: ["Word", "Excel", "Chrome", "PowerPoint"], c: 2 },
        { q: "Internet là mạng kết nối?", a: ["2 máy tính", "Trong 1 nhà", "Toàn cầu", "Trong 1 phòng"], c: 2 },
        { q: "Bộ nhớ RAM sẽ mất dữ liệu khi?", a: ["Tắt máy", "Đang dùng", "Mở thêm file", "Cắm điện"], c: 0 },
        { q: "Thành phần nào dùng để lưu trữ dữ liệu lâu dài?", a: ["RAM", "Ổ cứng", "CPU", "Nguồn"], c: 1 },
        { q: "Tên miền .edu thường dùng cho?", a: ["Chính phủ", "Công ty", "Giáo dục", "Giải trí"], c: 2 }
    ],
    11: [
        { q: "Trong Python, để in ra màn hình ta dùng lệnh?", a: ["out()", "write()", "print()", "show()"], c: 2 },
        { q: "Kiểu dữ liệu số nguyên trong Python là?", a: ["float", "str", "bool", "int"], c: 3 },
        { q: "Dấu nào dùng để ghi chú 1 dòng trong Python?", a: ["//", "/*", "#", "--"], c: 2 },
        { q: "Lệnh input() trả về kiểu dữ liệu gì?", a: ["int", "float", "string", "list"], c: 2 },
        { q: "Để lặp với số lần biết trước, ta dùng vòng lặp?", a: ["while", "for", "do-while", "repeat"], c: 1 },
        { q: "Kết quả của 10 // 3 trong Python là?", a: ["3.33", "3", "1", "0"], c: 1 },
        { q: "Để thêm phần tử vào cuối danh sách trong Python dùng?", a: ["add()", "push()", "append()", "insert()"], c: 2 },
        { q: "Python là ngôn ngữ lập trình?", a: ["Bậc thấp", "Bậc cao", "Máy", "Hợp ngữ"], c: 1 },
        { q: "Đâu là tên biến đúng trong Python?", a: ["1_ten", "ten hsg", "ten_hsg", "ten-hsg"], c: 2 },
        { q: "Thư viện nào dùng để vẽ biểu đồ?", a: ["math", "random", "matplotlib", "time"], c: 2 }
    ],
    12: [
        { q: "CSDL là viết tắt của từ gì?", a: ["Cơ sở dữ liệu", "Cơ cấu dữ liệu", "Công sức dữ liệu", "Cổng số dữ liệu"], c: 0 },
        { q: "Trong SQL, để lấy dữ liệu ta dùng lệnh?", a: ["GET", "TAKE", "SELECT", "FETCH"], c: 2 },
        { q: "Khóa chính dùng để làm gì?", a: ["Bảo mật", "Phân biệt bản ghi", "Sắp xếp", "Xóa nhanh"], c: 1 },
        { q: "Mạng máy tính diện rộng viết tắt là?", a: ["LAN", "MAN", "WAN", "PAN"], c: 2 },
        { q: "Thiết bị kết nối các mạng khác nhau gọi là?", a: ["Hub", "Switch", "Router", "Bridge"], c: 2 },
        { q: "Lệnh SQL nào dùng để xóa dữ liệu?", a: ["REMOVE", "DELETE", "DROP", "CLEAR"], c: 1 },
        { q: "Mô hình CSDL phổ biến nhất là?", a: ["Phân cấp", "Mạng", "Quan hệ", "Đối tượng"], c: 2 },
        { q: "Phần mềm Microsoft Access dùng để?", a: ["Soạn thảo", "Tính toán", "Quản trị CSDL", "Vẽ hình"], c: 2 },
        { q: "Để sắp xếp dữ liệu tăng dần trong SQL dùng?", a: ["DESC", "ORDER BY", "ASC", "GROUP BY"], c: 2 },
        { q: "Lệnh SELECT * FROM hocsinh có nghĩa là?", a: ["Xóa bảng", "Lấy tất cả cột", "Sửa tên bảng", "Tìm học sinh"], c: 1 }
    ]
};

let pHP = 5, eHP = 5, currentQs = [], qIdx = 0;

function startGame(lv) {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';
    currentQs = questions[lv].sort(() => Math.random() - 0.5);
    qIdx = 0;
    pHP = 5; eHP = 5; // Reset máu
    renderQuestion();
}

function renderQuestion() {
    if (qIdx >= currentQs.length) {
        alert("Bạn đã trả lời hết câu hỏi có sẵn!");
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
        ronaldo.classList.add('player-punch');
        setTimeout(() => {
            ronaldo.classList.remove('player-punch');
            messi.classList.add('hit-shake');
            eHP--;
            updateHP('enemy-hp-slots', eHP);
            setTimeout(() => {
                messi.classList.remove('hit-shake');
                checkEnd();
            }, 300);
        }, 200);
    } else {
        messi.classList.add('enemy-punch');
        setTimeout(() => {
            messi.classList.remove('enemy-punch');
            ronaldo.classList.add('hit-shake');
            pHP--;
            updateHP('player-hp-slots', pHP);
            setTimeout(() => {
                ronaldo.classList.remove('hit-shake');
                checkEnd();
            }, 300);
        }, 200);
    }
}

function updateHP(id, val) {
    const slots = document.getElementById(id).children;
    for (let i = 4; i >= val; i--) {
        slots[i].classList.add('lost');
    }
}

function checkEnd() {
    if (eHP <= 0) {
        setTimeout(() => { alert("RONALDO CHIẾN THẮNG! SIUUUUU!"); location.reload(); }, 300);
    } else if (pHP <= 0) {
        setTimeout(() => { alert("MESSI CHIẾN THẮNG! BẠN ĐÃ THUA."); location.reload(); }, 300);
    } else {
        qIdx++;
        renderQuestion();
    }
}
