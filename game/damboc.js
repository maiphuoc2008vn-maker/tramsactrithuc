/* --- FILE: damboc.js --- */
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
        { q: "Phím tắt để Copy là gì?", a: ["Ctrl+V", "Ctrl+C", "Ctrl+X", "Ctrl+Z"], c: 1 },
        { q: "RAM là bộ nhớ loại gì?", a: ["Chỉ đọc", "Truy cập ngẫu nhiên", "Lưu trữ lâu dài", "Ảo"], c: 1 },
        { q: "Hệ nhị phân (Binary) sử dụng hai ký số nào?", a: ["1 và 2", "0 và 1", "0 và 9", "A và B"], c: 1 },
        { q: "Thiết bị nào sau đây là thiết bị VÀO (Input)?", a: ["Màn hình", "Loa", "Bàn phím", "Máy in"], c: 2 },
        { q: "Đuôi file mở rộng của Python là gì?", a: [".py", ".exe", ".doc", ".cpp"], c: 0 },
        { q: "Lệnh in ra màn hình trong Python là gì?", a: ["cout", "write()", "print()", "show()"], c: 2 },
        { q: "Luật An ninh mạng Việt Nam có hiệu lực từ năm nào?", a: ["2018", "2019", "2020", "2021"], c: 1 },
        { q: "Phần mềm độc hại được gọi chung là gì?", a: ["Malware", "Hardware", "Software", "Freeware"], c: 0 },
        { q: "Đơn vị đo tốc độ xử lý của CPU là gì?", a: ["GB", "Hz (Hertz)", "Byte", "Pixel"], c: 1 },
        { q: "Phím tắt để dán (Paste) dữ liệu?", a: ["Ctrl+P", "Ctrl+V", "Ctrl+S", "Ctrl+A"], c: 1 },
        { q: "Để lưu văn bản, ta nhấn tổ hợp phím nào?", a: ["Ctrl+S", "Ctrl+O", "Ctrl+N", "Alt+F4"], c: 0 },
        { q: "ROM là viết tắt của từ gì?", a: ["Read Only Memory", "Random Access Memory", "Run On Memory", "Real Open Mind"], c: 0 },
        { q: "Thiết bị nào dùng để kết nối mạng Internet?", a: ["Modem/Router", "Máy in", "Loa", "Màn hình"], c: 0 }
    ],
    11: [
        { q: "Trong CSDL, 'Khóa chính' dùng để làm gì?", a: ["Bảo mật", "Xác định duy nhất bản ghi", "Sắp xếp tên", "Tạo màu sắc"], c: 1 },
        { q: "SQL là viết tắt của gì?", a: ["Structured Query Language", "Strong Quick Link", "Simple Question List", "System Quality Level"], c: 0 },
        { q: "Kiểu dữ liệu số nguyên trong Python là?", a: ["float", "int", "string", "bool"], c: 1 },
        { q: "Kết quả của 10 % 3 trong lập trình là?", a: ["3", "1", "3.33", "0"], c: 1 },
        { q: "Hàm nào dùng để nhập dữ liệu trong Python?", a: ["scan()", "get()", "input()", "read()"], c: 2 },
        { q: "Cấu trúc rẽ nhánh trong lập trình thường dùng từ khóa nào?", a: ["for", "if ... else", "while", "include"], c: 1 },
        { q: "Vòng lặp nào biết trước số lần lặp?", a: ["While", "For", "Do...While", "If"], c: 1 },
        { q: "Dữ liệu kiểu Boolean (bool) có mấy giá trị?", a: ["1", "2 (True/False)", "3", "Vô hạn"], c: 1 },
        { q: "Để chú thích 1 dòng trong Python ta dùng ký tự nào?", a: ["//", "#", "/*", "--"], c: 1 },
        { q: "Hệ quản trị CSDL phổ biến của Microsoft là?", a: ["Access", "Word", "Excel", "Paint"], c: 0 },
        { q: "Mảng (List) trong Python bắt đầu từ chỉ số mấy?", a: ["1", "0", "-1", "2"], c: 1 },
        { q: "Phép toán 'and' trả về True khi nào?", a: ["Cả hai đều sai", "Một trong hai đúng", "Cả hai đều đúng", "Không bao giờ"], c: 2 },
        { q: "File CSDL Access có đuôi mở rộng là gì?", a: [".docx", ".xlsx", ".accdb", ".pptx"], c: 2 }
    ],
    12: [
        { q: "AI là viết tắt của công nghệ gì?", a: ["Thực tế ảo", "Trí tuệ nhân tạo", "Dữ liệu lớn", "Điện toán đám mây"], c: 1 },
        { q: "IoT có nghĩa là gì?", a: ["Internet of Things", "Input of Tech", "Intel of Time", "Index of Text"], c: 0 },
        { q: "HTML dùng để làm gì?", a: ["Lập trình game", "Tạo trang web", "Xử lý ảnh", "Soạn thảo văn bản"], c: 1 },
        { q: "Thẻ nào trong HTML dùng để xuống dòng?", a: ["<br>", "<lb>", "<p>", "<b>"], c: 0 },
        { q: "Giao thức truyền tải siêu văn bản là?", a: ["FTP", "HTTP", "SMTP", "TCP"], c: 1 },
        { q: "Địa chỉ IP (IPv4) có bao nhiêu bit?", a: ["16", "32", "64", "128"], c: 1 },
        { q: "CSS trong thiết kế web dùng để làm gì?", a: ["Xử lý dữ liệu", "Định dạng giao diện", "Kết nối CSDL", "Bảo mật"], c: 1 },
        { q: "Dịch vụ lưu trữ đám mây của Google là?", a: ["OneDrive", "Dropbox", "Google Drive", "iCloud"], c: 2 },
        { q: "Trong HTML, thẻ <a> dùng để làm gì?", a: ["Chèn ảnh", "Tạo liên kết (Link)", "In đậm", "Tạo bảng"], c: 1 },
        { q: "Mạng LAN là gì?", a: ["Mạng diện rộng", "Mạng cục bộ", "Mạng toàn cầu", "Mạng không dây"], c: 1 },
        { q: "Facebook, Zalo, TikTok thuộc nhóm phần mềm nào?", a: ["Hệ điều hành", "Mạng xã hội", "Trình duyệt", "Diệt virus"], c: 1 },
        { q: "Big Data là gì?", a: ["Máy tính lớn", "Dữ liệu lớn", "Mạng lớn", "Màn hình lớn"], c: 1 }
    ]
};

let pHP = 5, eHP = 5, currentQs = [], qIdx = 0;

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function startGame(lv) {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';
    
    let qs = questions[lv];
    if (!qs || qs.length === 0) qs = questions[10];

    currentQs = shuffleArray([...qs]);
    qIdx = 0; pHP = 5; eHP = 5;
    
    resetHP();
    renderQuestion();
}

function resetHP() {
    const pSlots = document.getElementById('player-hp-slots').children;
    const eSlots = document.getElementById('enemy-hp-slots').children;
    for (let s of pSlots) s.classList.remove('lost');
    for (let s of eSlots) s.classList.remove('lost');
}

function renderQuestion() {
    if (qIdx >= currentQs.length) { 
        alert("Bạn đã trả lời hết câu hỏi của màn này!"); 
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

    let finalScore = (5 - eHP) * 20; 
    if(status === "win") finalScore = 100;

    // --- LƯU ĐIỂM ---
    if (typeof window.saveScoreToFirebase === "function") {
        window.saveScoreToFirebase(finalScore);
    }

    if (status === "win") {
        play('win');
        resultTitle.innerText = "BẠN CHIẾN THẮNG!";
        resultImg.src = "../images/hocsinh.jpeg";
        resultMsg.innerText = `HỌC SINH ĐÃ ĐÁNH BẠI ROBOT! (+${finalScore} điểm)`;
    } else {
        play('lose');
        resultTitle.innerText = "THẤT BẠI!";
        resultImg.src = "../images/robot.jpeg";
        resultMsg.innerText = `ROBOT ĐÃ CHIẾN THẮNG! (Bạn được ${finalScore} điểm)`;
    }
    screen.style.display = "flex";
}
