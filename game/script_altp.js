// =========================================================================
// 1. CẤU HÌNH ÂM THANH
// =========================================================================
const sounds = {
    bg: new Audio('sounds/bg.mp3'),
    correct: new Audio('sounds/correct.mp3'),
    wrong: new Audio('sounds/wrong.mp3'),
    wait: new Audio('sounds/wait.mp3'),
    call: new Audio('sounds/call.mp3'),
};
sounds.bg.loop = true; 
sounds.bg.volume = 0.4;

// =========================================================================
// 2. DỮ LIỆU CÂU HỎI
// =========================================================================
const questionData = {
    "10": [
        { q: "Thiết bị nào sau đây là thiết bị NHẬP?", a: ["Màn hình", "Máy in", "Bàn phím", "Loa"], c: 2, m: "200.000" },
        { q: "1 Byte bằng bao nhiêu Bit?", a: ["2", "8", "10", "16"], c: 1, m: "400.000" },
        { q: "Hệ điều hành phổ biến nhất trên PC là?", a: ["Linux", "MacOS", "Windows", "Android"], c: 2, m: "600.000" },
        { q: "Phím tắt để Copy văn bản là?", a: ["Ctrl+V", "Ctrl+X", "Ctrl+C", "Ctrl+Z"], c: 2, m: "1.000.000" },
        { q: "CPU được ví như bộ phận nào của con người?", a: ["Tim", "Bộ não", "Tay chân", "Mắt"], c: 1, m: "2.000.000" },
        { q: "Phần mềm nào dùng để soạn thảo văn bản?", a: ["Excel", "PowerPoint", "Word", "Access"], c: 2, m: "3.000.000" },
        { q: "Virus máy tính là gì?", a: ["Con bọ", "Phần cứng hỏng", "Đoạn mã độc", "Bụi bẩn"], c: 2, m: "6.000.000" },
        { q: "Bộ nhớ nào bị mất dữ liệu khi tắt máy?", a: ["ROM", "HDD", "RAM", "USB"], c: 2, m: "10.000.000" },
        { q: "Hệ đếm dùng trong máy tính là hệ gì?", a: ["Thập phân", "Nhị phân", "Bát phân", "La Mã"], c: 1, m: "14.000.000" },
        { q: "Unicode là bảng mã chuẩn dùng để làm gì?", a: ["Mã hóa tiếng Việt", "Chơi game", "Nghe nhạc", "Lướt web"], c: 0, m: "22.000.000" },
        { q: "Luật An ninh mạng Việt Nam có hiệu lực từ năm nào?", a: ["2017", "2018", "2019", "2020"], c: 2, m: "30.000.000" },
        { q: "IoT là viết tắt của thuật ngữ nào?", a: ["Internet of Tech", "Internet of Things", "Input of Time", "Intranet of Tool"], c: 1, m: "40.000.000" },
        { q: "Chuẩn kết nối màn hình chất lượng cao phổ biến hiện nay?", a: ["VGA", "HDMI", "PS/2", "COM"], c: 1, m: "60.000.000" },
        { q: "Python là ngôn ngữ dạng nào?", a: ["Thông dịch", "Biên dịch", "Máy", "Hợp ngữ"], c: 0, m: "85.000.000" },
        { q: "Ai là người sáng lập Microsoft?", a: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"], c: 1, m: "150.000.000" }
    ],
    "11": [
        { q: "Ngôn ngữ lập trình Python do ai tạo ra?", a: ["Guido van Rossum", "Bill Gates", "Ada Lovelace", "Dennis Ritchie"], c: 0, m: "200.000" },
        { q: "Để in dữ liệu ra màn hình trong Python dùng lệnh gì?", a: ["input()", "write()", "print()", "cout"], c: 2, m: "400.000" },
        { q: "Kiểu dữ liệu số nguyên trong Python là gì?", a: ["float", "int", "str", "bool"], c: 1, m: "600.000" },
        { q: "Kết quả của 10 // 3 trong Python là?", a: ["3.33", "3", "1", "3.0"], c: 1, m: "1.000.000" },
        { q: "Cấu trúc rẽ nhánh dùng từ khóa nào?", a: ["for", "while", "if", "def"], c: 2, m: "2.000.000" },
        { q: "Để nhập dữ liệu từ bàn phím dùng hàm nào?", a: ["print()", "cin", "scan()", "input()"], c: 3, m: "3.000.000" },
        { q: "Danh sách (List) trong Python được bao bởi dấu gì?", a: ["()", "{}", "[]", "<>"], c: 2, m: "6.000.000" },
        { q: "Vòng lặp nào dùng khi biết trước số lần lặp?", a: ["while", "for", "do..while", "repeat"], c: 1, m: "10.000.000" },
        { q: "Lỗi cú pháp trong lập trình gọi là gì?", a: ["Logic Error", "Runtime Error", "Syntax Error", "Bug"], c: 2, m: "14.000.000" },
        { q: "Hàm len() dùng để làm gì?", a: ["Tính tổng", "Đếm số phần tử", "Tìm max", "Sắp xếp"], c: 1, m: "22.000.000" },
        { q: "Thuật toán tìm kiếm nhị phân áp dụng cho danh sách nào?", a: ["Ngẫu nhiên", "Đã sắp xếp", "Rỗng", "Số thực"], c: 1, m: "30.000.000" },
        { q: "Độ phức tạp của thuật toán sắp xếp nổi bọt là?", a: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], c: 2, m: "40.000.000" },
        { q: "Thư viện Python dùng để vẽ đồ thị là?", a: ["math", "random", "matplotlib", "os"], c: 2, m: "60.000.000" },
        { q: "Biến toàn cục được khai báo bằng từ khóa gì?", a: ["global", "local", "def", "class"], c: 0, m: "85.000.000" },
        { q: "Python ra đời năm nào?", a: ["1989", "1991", "1995", "2000"], c: 1, m: "150.000.000" }
    ],
    "12": [
        { q: "CSDL là viết tắt của từ gì?", a: ["Cơ sở dữ liệu", "Chỉ số dữ liệu", "Cơ sở đường lối", "Chuyển số dữ liệu"], c: 0, m: "200.000" },
        { q: "Access là hệ quản trị CSDL của hãng nào?", a: ["Google", "Oracle", "Microsoft", "IBM"], c: 2, m: "400.000" },
        { q: "HTML là ngôn ngữ dùng để làm gì?", a: ["Lập trình app", "Tạo trang web", "Quản lý CSDL", "Xử lý ảnh"], c: 1, m: "600.000" },
        { q: "AI là viết tắt của thuật ngữ nào?", a: ["Artificial Intelligence", "Auto Internet", "Apple Inc", "Area Info"], c: 0, m: "1.000.000" },
        { q: "Khóa chính (Primary Key) có đặc điểm gì?", a: ["Cho phép trùng", "Không được để trống", "Là số thực", "Có thể xóa"], c: 1, m: "2.000.000" },
        { q: "CSS dùng để làm gì trong thiết kế web?", a: ["Tạo khung", "Xử lý logic", "Định dạng, trang trí", "Lưu dữ liệu"], c: 2, m: "3.000.000" },
        { q: "Thiết bị nào dùng để kết nối mạng không dây?", a: ["Switch", "Router Wifi", "Hub", "Cáp quang"], c: 1, m: "6.000.000" },
        { q: "SQL là ngôn ngữ gì?", a: ["Truy vấn dữ liệu", "Lập trình web", "Hệ điều hành", "Mã hóa"], c: 0, m: "10.000.000" },
        { q: "Mạng LAN là gì?", a: ["Mạng diện rộng", "Mạng cục bộ", "Mạng toàn cầu", "Mạng không dây"], c: 1, m: "14.000.000" },
        { q: "Trong mô hình quan hệ, Cột được gọi là gì?", a: ["Bộ (Tuple)", "Thuộc tính", "Bảng", "Khóa"], c: 1, m: "22.000.000" },
        { q: "Giao thức truyền tải siêu văn bản là?", a: ["FTP", "SMTP", "HTTP", "TCP"], c: 2, m: "30.000.000" },
        { q: "Học máy (Machine Learning) là lĩnh vực con của?", a: ["IoT", "Big Data", "AI", "Blockchain"], c: 2, m: "40.000.000" },
        { q: "Địa chỉ IP v4 gồm bao nhiêu bit?", a: ["16 bit", "32 bit", "64 bit", "128 bit"], c: 1, m: "60.000.000" },
        { q: "Thẻ HTML nào tạo liên kết?", a: ["<img>", "<p>", "<a>", "<div>"], c: 2, m: "85.000.000" },
        { q: "Phép thử Turing dùng để kiểm tra điều gì?", a: ["Tốc độ máy", "Dung lượng RAM", "Trí tuệ nhân tạo", "Độ bền CPU"], c: 2, m: "150.000.000" }
    ]
};

// =========================================================================
// 3. LOGIC XỬ LÝ GAME
// =========================================================================
let currentQuestions = [];
let currIdx = 0;
let isPlaying = false;
let timer;
let timeLeft = 30;
let modalCallback = null;

function startGame() {
    const grade = document.getElementById("grade-select").value;
    currentQuestions = questionData[grade];

    document.getElementById("start-overlay").classList.add("hidden");
    currIdx = 0;
    
    sounds.bg.play().catch(e => console.log("Cần tương tác người dùng để phát nhạc"));
    loadQuestion();
}

function loadQuestion() {
    // Nếu vượt qua 15 câu
    if (currIdx >= currentQuestions.length) {
        showSupportModal("CHÚC MỪNG!", "BẠN LÀ TRIỆU PHÚ!<br>Bạn đã vượt qua 15 câu hỏi của chương trình.", "fa-trophy", "win", () => location.reload());
        return;
    }

    let data = currentQuestions[currIdx];
    document.getElementById("question-text").innerText = data.q;
    document.getElementById("q-index").innerText = "CÂU HỎI " + (currIdx + 1);
    document.getElementById("money-val").innerText = data.m + " VNĐ";
    
    // Reset các nút đáp án
    for(let i=0; i<4; i++) {
        let btn = document.getElementById("btn-" + i);
        btn.querySelector(".text").innerText = data.a[i];
        btn.className = "ans-item"; 
        btn.disabled = false;
        btn.style.opacity = 1;
    }

    startTimer();
    isPlaying = true;
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById("timer").innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if(timeLeft <= 0) {
            clearInterval(timer);
            isPlaying = false;
            sounds.wrong.play();
            showSupportModal("HẾT GIỜ!", "Bạn đã hết thời gian suy nghĩ.", "fa-hourglass-end", "lose", () => location.reload());
        }
    }, 1000);
}

function chooseAnswer(index) {
    if(!isPlaying) return;
    isPlaying = false;
    clearInterval(timer);
    
    sounds.bg.pause();
    sounds.wait.play();

    let btn = document.getElementById("btn-" + index);
    btn.classList.add("selected");

    // Tạo độ trễ kịch tính 2 giây
    setTimeout(() => {
        sounds.wait.pause();
        sounds.wait.currentTime = 0;
        checkResult(index);
    }, 2000);
}

function checkResult(index) {
    let correct = currentQuestions[currIdx].c;
    let btnSelected = document.getElementById("btn-" + index);
    let btnCorrect = document.getElementById("btn-" + correct);

    if(index === correct) {
        // ĐÚNG
        btnSelected.classList.add("correct");
        sounds.correct.play();
        setTimeout(() => {
            currIdx++;
            sounds.bg.play();
            loadQuestion();
        }, 2000);
    } else {
        // SAI
        btnSelected.classList.add("wrong");
        btnCorrect.classList.add("correct");
        sounds.wrong.play();
        
        // Tính tiền thưởng theo mốc
        let prize = "0";
        if (currIdx >= 10) prize = "22.000.000";
        else if (currIdx >= 5) prize = "2.000.000";
        else prize = "0";

        setTimeout(() => {
            showSupportModal(
                "KẾT THÚC", 
                `<div style="text-align: center;">
                    <h2 style="color: #e74c3c; margin-bottom: 10px;">BẠN ĐÃ TRẢ LỜI SAI RỒI!</h2>
                    <p>Đáp án đúng là: <b style="color:#f1c40f">${String.fromCharCode(65+correct)}</b></p>
                    <p style="margin-top:15px">Số tiền thưởng bạn nhận được:</p>
                    <h2 style="color:#f1c40f; font-size:30px">${prize} VNĐ</h2>
                </div>`, 
                "fa-times-circle", 
                "lose", 
                () => location.reload()
            );
        }, 2000);
    }
}

// =========================================================================
// 4. QUYỀN TRỢ GIÚP
// =========================================================================

function use5050() {
    if(!isPlaying) return;
    document.getElementById("help-5050").classList.add("used");
    document.getElementById("help-5050").disabled = true;

    let correct = currentQuestions[currIdx].c;
    let wrongIndices = [0,1,2,3].filter(i => i !== correct);
    wrongIndices.sort(() => Math.random() - 0.5);
    
    // Ẩn 2 đáp án sai
    document.getElementById("btn-" + wrongIndices[0]).querySelector(".text").innerText = "";
    document.getElementById("btn-" + wrongIndices[0]).disabled = true;
    document.getElementById("btn-" + wrongIndices[1]).querySelector(".text").innerText = "";
    document.getElementById("btn-" + wrongIndices[1]).disabled = true;
}

function useCall() {
    if(!isPlaying) return;
    document.getElementById("help-call").classList.add("used");
    document.getElementById("help-call").disabled = true;

    sounds.bg.pause();
    sounds.call.play();

    setTimeout(() => {
        let correctChar = String.fromCharCode(65 + currentQuestions[currIdx].c);
        showSupportModal("GỌI ĐIỆN THOẠI", `Người thân nói: "Theo mình biết thì đáp án đúng phải là ${correctChar}!"`, "fa-phone", "normal", () => {
            sounds.bg.play();
        });
    }, 3000);
}

function useCrowd() {
    if(!isPlaying) return;
    document.getElementById("help-crowd").classList.add("used");
    document.getElementById("help-crowd").disabled = true;

    let correct = currentQuestions[currIdx].c;
    let percents = [0,0,0,0];
    percents[correct] = Math.floor(Math.random() * 41) + 50; 
    
    let remain = 100 - percents[correct];
    let others = [0,1,2,3].filter(x => x !== correct);
    
    let p1 = Math.floor(Math.random() * remain);
    percents[others[0]] = p1;
    remain -= p1;
    
    let p2 = Math.floor(Math.random() * remain);
    percents[others[1]] = p2;
    percents[others[2]] = remain - p2;

    let html = `<div style="display:flex; justify-content:space-around; align-items:flex-end; height:120px; margin-top:20px;">`;
    ['A','B','C','D'].forEach((l, i) => {
        html += `<div style="text-align:center; width:40px;">
                    <div style="background:#f1c40f; height:${percents[i]}px; border-radius:3px 3px 0 0;"></div>
                    <div style="font-weight:bold; font-size:12px; margin-top:5px;">${l}<br>${percents[i]}%</div>
                 </div>`;
    });
    html += `</div>`;

    showSupportModal("Ý KIẾN KHÁN GIẢ", html, "fa-users");
}

// =========================================================================
// 5. HỆ THỐNG MODAL
// =========================================================================
function showSupportModal(title, content, icon, type, callback) {
    const modal = document.getElementById("support-modal");
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-body").innerHTML = content;
    document.getElementById("modal-icon").className = "fas " + icon;
    
    modalCallback = callback;
    modal.classList.remove("hidden");
}

function closeSupportModal() {
    document.getElementById("support-modal").classList.add("hidden");
    if(modalCallback) {
        modalCallback();
        modalCallback = null;
    }
}
