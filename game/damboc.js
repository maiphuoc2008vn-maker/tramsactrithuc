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
        { q: "CPU viết tắt của từ gì?", a: ["Central Unit", "Control Unit", "Central Processing Unit", "Main Unit"], c: 2 },
        { q: "Thông tin sau khi xử lý gọi là gì?", a: ["Dữ liệu", "Lệnh", "Vật mang tin", "Kết quả"], c: 0 },
        { q: "Bàn phím và Chuột thuộc nhóm nào?", a: ["Thiết bị ra", "Thiết bị vào", "Bộ nhớ", "CPU"], c: 1 },
        { q: "Trong Tin học, Bit là gì?", a: ["Số thập phân", "Ký tự", "Đơn vị nhỏ nhất", "Tệp tin"], c: 2 },
        { q: "Phần mềm soạn thảo văn bản là?", a: ["Excel", "Windows", "Word", "Photoshop"], c: 2 },
        { q: "Thành phần hiển thị hình ảnh là?", a: ["Chuột", "Bàn phím", "Màn hình", "Ổ cứng"], c: 2 },
        { q: "Virus máy tính thực chất là gì?", a: ["Vi khuẩn", "Một chương trình", "Bụi bẩn", "Lỗi phần cứng"], c: 1 },
        { q: "Mạng LAN kết nối trong phạm vi?", a: ["Toàn cầu", "Quốc gia", "Diện tích nhỏ", "Vũ trụ"], c: 2 },
        { q: "Thiết bị in văn bản ra giấy?", a: ["Màn hình", "Máy in", "Loa", "Máy quét"], c: 1 },
        { q: "Thùng rác trên Windows là?", a: ["Control Panel", "My Computer", "Recycle Bin", "Desktop"], c: 2 },
        { q: "Đơn vị đo tốc độ xử lý CPU là?", a: ["Hz", "Byte", "Bit", "Kg"], c: 0 }
    ],
    11: [
        { q: "Lệnh in trong Python là?", a: ["out()", "write()", "print()", "show()"], c: 2 },
        { q: "Kiểu số nguyên trong Python?", a: ["float", "str", "bool", "int"], c: 3 },
        { q: "Dấu chú thích trong Python?", a: ["//", "/*", "#", "--"], c: 2 },
        { q: "Kết quả 10 % 3 là?", a: ["3", "1", "0", "3.3"], c: 1 },
        { q: "Vòng lặp biết trước số lần?", a: ["while", "for", "if", "else"], c: 1 },
        { q: "Python là ngôn ngữ?", a: ["Bậc thấp", "Bậc cao", "Máy", "Hợp ngữ"], c: 1 },
        { q: "Lệnh input() mặc định là kiểu?", a: ["int", "float", "string", "bool"], c: 2 },
        { q: "Thêm phần tử vào list dùng?", a: ["add", "append", "push", "insert"], c: 1 },
        { q: "10 // 3 bằng mấy?", a: ["3.33", "3", "1", "0"], c: 1 },
        { q: "Thư viện vẽ biểu đồ là?", a: ["math", "time", "matplotlib", "random"], c: 2 },
        { q: "Để thoát khỏi vòng lặp dùng lệnh?", a: ["exit", "stop", "break", "end"], c: 2 },
        { q: "Đâu là tên biến Python đúng?", a: ["2name", "my-name", "my_name", "my name"], c: 2 },
        { q: "Kết quả của 'Hello' * 2 là?", a: ["HelloHello", "Hello 2", "Lỗi", "Hello*2"], c: 0 },
        { q: "Hàm tính độ dài danh sách là?", a: ["size()", "len()", "count()", "length()"], c: 1 },
        { q: "Kiểu dữ liệu số thực trong Python?", a: ["int", "float", "string", "double"], c: 1 },
        { q: "Cấu trúc rẽ nhánh trong Python?", a: ["if-else", "for-in", "while", "break"], c: 0 },
        { q: "Lệnh range(5) tạo ra dãy số từ?", a: ["1 đến 5", "0 đến 5", "0 đến 4", "1 đến 4"], c: 2 },
        { q: "Python ra đời năm nào?", a: ["1989", "1991", "1995", "2000"], c: 1 },
        { q: "Toán tử so sánh bằng trong Python là?", a: ["=", "==", "===", "equals"], c: 1 },
        { q: "Lệnh nào dùng để khai báo hàm?", a: ["func", "function", "def", "define"], c: 2 }
    ],
    12: [
        { q: "CSDL là viết tắt của?", a: ["Cơ sở dữ liệu", "Cơ cấu dữ liệu", "Công sức", "Cổng số"], c: 0 },
        { q: "Lệnh lấy dữ liệu trong SQL?", a: ["GET", "TAKE", "SELECT", "FETCH"], c: 2 },
        { q: "Khóa chính dùng để?", a: ["Bảo mật", "Phân biệt bản ghi", "Sắp xếp", "Xóa"], c: 1 },
        { q: "Mạng diện rộng là?", a: ["LAN", "MAN", "WAN", "PAN"], c: 2 },
        { q: "Thiết bị định tuyến gọi là?", a: ["Hub", "Switch", "Router", "Bridge"], c: 2 },
        { q: "Lệnh xóa dữ liệu SQL?", a: ["REMOVE", "DELETE", "DROP", "CLEAR"], c: 1 },
        { q: "Phần mềm quản trị CSDL?", a: ["Word", "Access", "Excel", "Chrome"], c: 1 },
        { q: "Sắp xếp tăng dần SQL dùng?", a: ["DESC", "ASC", "ORDER", "BY"], c: 1 },
        { q: "SQL là ngôn ngữ?", a: ["Lập trình", "Truy vấn", "Đồ họa", "Máy"], c: 1 },
        { q: "Lệnh SELECT * FROM hocsinh?", a: ["Xóa bảng", "Lấy tất cả", "Sửa bảng", "Thêm"], c: 1 },
        { q: "Khóa ngoại dùng để làm gì?", a: ["Tạo mật khẩu", "Liên kết các bảng", "Xóa bảng", "Tính toán"], c: 1 },
        { q: "Hệ quản trị CSDL viết tắt là?", a: ["DBMS", "OS", "HTML", "RAM"], c: 0 },
        { q: "Bản ghi trong CSDL tương ứng với?", a: ["Cột", "Hàng", "Trang", "Tệp"], c: 1 },
        { q: "Trường trong CSDL tương ứng với?", a: ["Hàng", "Cột", "Bảng", "Ô"], c: 1 },
        { q: "Để thêm dữ liệu vào SQL dùng?", a: ["ADD", "PUT", "INSERT INTO", "CREATE"], c: 2 },
        { q: "Mối quan hệ phổ biến trong CSDL?", a: ["1-1", "1-Nhiều", "Nhiều-Nhiều", "Tất cả"], c: 3 },
        { q: "Dư thừa dữ liệu dẫn đến?", a: ["Nhanh hơn", "Lãng phí bộ nhớ", "Bảo mật hơn", "Dễ dùng"], c: 1 },
        { q: "Lệnh UPDATE dùng để?", a: ["Xóa dữ liệu", "Thêm dữ liệu", "Sửa dữ liệu", "Tạo bảng"], c: 2 },
        { q: "Thứ tự các cột trong CSDL gọi là?", a: ["Cấu trúc bảng", "Dữ liệu bảng", "Bản ghi", "Khóa"], c: 0 },
        { q: "Điều kiện lọc trong SQL bắt đầu bằng?", a: ["IF", "WHERE", "WHEN", "FILTER"], c: 1 }
    ]
};

let pHP = 5, eHP = 5, currentQs = [], qIdx = 0;

function startGame(lv) {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';
    
    // TRỘN CÂU HỎI
    currentQs = [...questions[lv]].sort(() => Math.random() - 0.5);
    
    qIdx = 0; pHP = 5; eHP = 5;
    resetHPDisplay();
    renderQuestion();
}

function resetHPDisplay() {
    const pSlots = document.getElementById('player-hp-slots').children;
    const eSlots = document.getElementById('enemy-hp-slots').children;
    for (let i = 0; i < 5; i++) {
        pSlots[i].classList.remove('lost');
        eSlots[i].classList.remove('lost');
    }
}

function renderQuestion() {
    if (qIdx >= currentQs.length) {
        alert("Bạn đã hoàn thành hết bộ câu hỏi!");
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
            setTimeout(() => { messi.classList.remove('hit-shake'); checkEnd(); }, 300);
        }, 200);
    } else {
        messi.classList.add('enemy-punch');
        setTimeout(() => {
            messi.classList.remove('enemy-punch');
            ronaldo.classList.add('hit-shake');
            pHP--;
            updateHP('player-hp-slots', pHP);
            setTimeout(() => { ronaldo.classList.remove('hit-shake'); checkEnd(); }, 300);
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
    if (eHP <= 0) {
        setTimeout(() => { alert("RONALDO CHIẾN THẮNG! SIUUUUU!"); location.reload(); }, 300);
    } else if (pHP <= 0) {
        setTimeout(() => { alert("BẠN ĐÃ THUA! MESSI THẮNG."); location.reload(); }, 300);
    } else {
        qIdx++;
        renderQuestion();
    }
}
