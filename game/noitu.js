/* --- noitu.js --- */

/* --- KHO TỪ VỰNG TIN HỌC 600+ TỪ (LỚP 10, 11, 12) --- */
const dictionary = {
    10: [
        "Máy tính", "Tính toán", "Toán học", "Học tập", "Tập tin", "Tin học", "Học hỏi", "Hỏi đáp", "Đáp án", "Án bản",
        "Thông tin", "Tin nhắn", "Nhắn gửi", "Gửi gắm", "Lưu trữ", "Trữ lượng", "Lượng tử", "Tử số", "Số hóa", "Hóa học",
        "Phần cứng", "Cứng cáp", "Cáp quang", "Quang học", "Phần mềm", "Mềm mại", "Thiết bị", "Bị động", "Động cơ", "Cơ chế",
        "Hệ điều hành", "Hành vi", "Vi xử lý", "Lý thuyết", "Thuyết minh", "Minh họa", "Họa sĩ", "Sĩ số", "Số liệu", "Liệu pháp",
        "Dữ liệu", "Liệu hình", "Hình ảnh", "Ảnh số", "Số thực", "Thực hành", "Hành động", "Động lực", "Lực chọn", "Chọn lọc",
        "Mạng máy", "Máy in", "In ấn", "Ấn tượng", "Tượng đài", "Đài báo", "Báo cáo", "Cáo bạch", "Bạch cầu", "Cầu nối",
        "Kết nối", "Nối kết", "Kết quả", "Quả nhiên", "Nhiên liệu", "Liệu trình", "Trình duyệt", "Duyệt web", "Trang web", "Website",
        "Số nhị phân", "Phân thân", "Thân thiện", "Thiện cảm", "Cảm biến", "Biến đổi", "Đổi mới", "Mới lạ", "Lạ lẫm", "Lẫm liệt",
        "An ninh", "Ninh bình", "Bình đẳng", "Đẳng cấp", "Cấp bậc", "Bậc thang", "Thang đo", "Đo lường", "Lường trước", "Trước tiên",
        "Bảo mật", "Mật mã", "Mã nguồn", "Nguồn điện", "Điện năng", "Năng lượng", "Lượng hình", "Hình thức", "Thức tỉnh", "Tỉnh táo",
        "Internet", "Vạn vật", "Vật lý", "Lý giải", "Giải mã", "Mã hóa", "Hóa thân", "Thân máy", "Máy trạm", "Trạm sạc",
        "Bộ nhớ", "Nhớ nhung", "Nhung lụa", "Lụa đào", "Đào tạo", "Tạo lập", "Lập trình", "Trình bày", "Bày biện", "Biện luận",
        "Công nghệ", "Nghệ thuật", "Thuật toán", "Toán lý", "Lý sự", "Sự việc", "Việc làm", "Làm giàu", "Giàu có", "Có ích",
        "Thiết kế", "Kế hoạch", "Hoạch định", "Định vị", "Vị trí", "Trí tuệ", "Tuệ minh", "Minh bạch", "Bạch kim", "Kim loại",
        "Sản phẩm", "Phẩm chất", "Chất lượng", "Lượng đồ", "Đồ họa", "Họa đồ", "Đồ dùng", "Dùng thử", "Thử nghiệm", "Nghiệm thu",
        "Thực tế", "Tế bào", "Bào mòn", "Mòn mỏi", "Mỏi mắt", "Mắt xích", "Xích lại", "Lại qua", "Qua loa", "Loa đài",
        "Chuột máy", "Máy chiếu", "Chiếu sáng", "Sáng tạo", "Tạo mẫu", "Mẫu mã", "Mã số", "Số hiệu", "Hiệu năng", "Năng suất",
        "Đĩa cứng", "Cứng đầu", "Đầu ra", "Ra lệnh", "Lệnh bài", "Bài học", "Học đường", "Đường truyền", "Truyền tin", "Tin cậy",
        "Lưu động", "Động thái", "Thái độ", "Độ phân giải", "Giải trí", "Trí lực", "Lực lượng", "Lượng giá", "Giá trị", "Trị số"
    ],
    11: [
        "Lập trình", "Trình tự", "Tự động", "Biến số", "Số nguyên", "Nguyên mẫu", "Mẫu mã", "Mã lệnh", "Lệnh cấm", "Cấm đoán",
        "Python", "Cấu trúc", "Trúc đào", "Đào sâu", "Sâu sắc", "Sắc thái", "Thái độ", "Độ dài", "Dài dòng", "Dòng điện",
        "Danh sách", "Sách vở", "Vở kịch", "Kịch tính", "Tính cách", "Cách làm", "Làm việc", "Việc nghĩa", "Nghĩa vụ", "Vụ án",
        "Vòng lặp", "Lặp lại", "Tại sao", "Sao chép", "Chép tay", "Tay chân", "Chân thật", "Thật sự", "Sự tình", "Tình báo",
        "Hàm số", "Số thực", "Thực thi", "Thi thố", "Thố lộ", "Lộ diện", "Diện tích", "Tích tụ", "Tụ điểm", "Điểm số",
        "Câu lệnh", "Lệnh tổng", "Tổng hợp", "Hợp tác", "Tác động", "Động từ", "Từ khóa", "Khóa ngoại", "Ngoại lệ", "Lệ phí",
        "Mảng một chiều", "Chiều chuộng", "Chuộng ngoại", "Ngoại hạng", "Hạng mục", "Mục tiêu", "Tiêu điểm", "Điểm yếu", "Yếu ớt", "Ớt cay",
        "Kiểu dữ liệu", "Liệu hồn", "Hồn nhiên", "Nhiên liệu", "Liệu trình", "Trình diễn", "Diễn thuyết", "Thuyết phục", "Phục hồi", "Hồi đáp",
        "Cơ sở dữ liệu", "Liệu pháp", "Pháp luật", "Luật sư", "Sư phụ", "Phụ cấp", "Cấp dưỡng", "Dưỡng khí", "Khí chất", "Chất vấn",
        "Truy vấn", "Vấn đáp", "Đáp lễ", "Lễ hội", "Hội nhập", "Nhập khẩu", "Khẩu vị", "Vị giác", "Giác ngộ", "Ngộ nhận",
        "Tham số", "Số dư", "Dư thừa", "Thừa kế", "Kế toán", "Toán học", "Học phí", "Phí lời", "Lời chào", "Chào hỏi",
        "Khởi tạo", "Tạo ra", "Ra vào", "Vào đời", "Đời sống", "Sống sót", "Sót lại", "Lại đây", "Đây đó", "Đó đây",
        "Thư viện", "Viện phí", "Phí phạm", "Phạm quy", "Quy định", "Định hướng", "Hướng dẫn", "Dẫn đầu", "Đầu tư", "Tư duy",
        "Thuật toán", "Toán đồ", "Đồ vật", "Vật giá", "Giá cả", "Cả gan", "Gan dạ", "Dạ quang", "Quang vinh", "Vinh hạnh",
        "Đệ quy", "Quy trình", "Trình ký", "Ký tên", "Tên tuổi", "Tuổi trẻ", "Trẻ con", "Con cái", "Cái cân", "Cân bằng",
        "Biến cục bộ", "Bộ phận", "Phận sự", "Sự cố", "Cố gắng", "Gắng sức", "Sức mạnh", "Mạnh bạo", "Bạo động", "Động não",
        "Đối tượng", "Tượng hình", "Hình vuông", "Vuông vức", "Vức bỏ", "Bỏ qua", "Qua đường", "Đường đi", "Đi đứng", "Đứng đầu",
        "Chỉ mục", "Mục lục", "Lục địa", "Địa lý", "Lý luận", "Luận điểm", "Điểm dừng", "Dừng chân", "Chân lý", "Lý lẽ",
        "Phát triển", "Triển khai", "Khai thác", "Thác nước", "Nước mắt", "Mắt nhìn", "Nhìn nhận", "Nhận dạng", "Dạng thức", "Thức ăn"
    ],
    12: [
        "Trí tuệ nhân tạo", "Tạo lập", "Lập dị", "Dị dạng", "Dạng số", "Số đề", "Đề bài", "Bài thi", "Thi hào", "Hào khí",
        "Mạng không dây", "Dây điện", "Điện tử", "Tử tế", "Tế độ", "Độ lượng", "Lượng hình", "Hình học", "Học lực", "Lực bất tòng tâm",
        "Giao thức", "Thức khuya", "Khuya khoắt", "Khoắt tay", "Tay hòm chìa khóa", "Khóa cửa", "Cửa sổ", "Sổ tay", "Tay chơi", "Chơi bời",
        "Địa chỉ IP", "Phòng vệ", "Vệ tinh", "Tinh tú", "Tú tài", "Tài năng", "Năng khiếu", "Khiếu nại", "Nại ra", "Ra khơi",
        "Băng thông", "Thông thái", "Thái bình", "Bình an", "An lạc", "Lạc quan", "Quan sát", "Sát sao", "Sao hỏa", "Hỏa tốc",
        "Điện toán đám mây", "Mây trắng", "Trắng tay", "Tay trắng", "Trắng đen", "Đen đủi", "Đủi ro", "Ro ro", "Ro bốt", "Bốt điện",
        "An toàn mạng", "Mạng sống", "Sống động", "Động viên", "Viên mãn", "Mãn hạn", "Hạn ngạch", "Ngạch cửa", "Cửa nhà", "Nhà xe",
        "Robot", "Bốt gác", "Gác kiếm", "Kiếm tìm", "Tìm kiếm", "Kiếm đạo", "Đạo đức", "Đức hạnh", "Hạnh phúc", "Phúc đức",
        "Website", "Tế lễ", "Lễ nghĩa", "Nghĩa cử", "Cử hành", "Hành lễ", "Lễ độ", "Độ lượng", "Lượng từ", "Từ trường",
        "Tường lửa", "Lửa trại", "Trại giam", "Giam cầm", "Cầm đồ", "Đồ đạc", "Đạc điền", "Điền vào", "Vào cuộc", "Cuộc đời",
        "Kết nối không dây", "Dây dưa", "Dưa hấu", "Hấu đá", "Đá bóng", "Bóng đá", "Đá quý", "Quý trọng", "Trọng dụng", "Dụng cụ",
        "Internet vạn vật", "Vật phẩm", "Phẩm hạnh", "Hạnh kiểm", "Kiểm tra", "Tra khảo", "Khảo sát", "Sát nhân", "Nhân nghĩa", "Nghĩa địa",
        "Truyền dữ liệu", "Liệu hình", "Hình phạt", "Phạt đền", "Đền thờ", "Thờ phụng", "Phụng sự", "Sự đời", "Đời đời", "Đời sau",
        "Trình duyệt", "Duyệt binh", "Binh lính", "Lính thủy", "Thủy triều", "Triều đại", "Đại học", "Học sinh", "Sinh hoạt", "Hoạt náo",
        "Thiết bị thông minh", "Minh tinh", "Tinh nghịch", "Nghịch ngợm", "Ngợm đời", "Đời thường", "Thường xuyên", "Xuyên thấu", "Thấu hiểu", "Hiểu lầm",
        "Bảo mật đa tầng", "Tầng lớp", "Lớp học", "Học hành", "Hành hung", "Hung dữ", "Dữ tợn", "Tợn gan", "Gan lì", "Lì lợm",
        "Dữ liệu lớn", "Lớn mạnh", "Mạnh mẽ", "Mẽ ngoài", "Ngoài da", "Da thịt", "Thịt thà", "Thà rằng", "Rằng thì", "Thì thôi",
        "Thực tế ảo", "Ảo thuật", "Thuật lại", "Lại đây", "Đây mà", "Mà thôi", "Thôi xong", "Xong xuôi", "Xuôi dòng", "Dòng đời"
    ]
};

let currentLevel = 10;
let lastWord = "";
let usedWords = [];
let score = 0;
let timeLeft = 15;
let timerInterval;
let isPlaying = false;

// DOM Elements
const elScore = document.getElementById("score");
const elCurrentWord = document.getElementById("currentWord");
const elInput = document.getElementById("userInput");
const elMessage = document.getElementById("message");
const elTimerBar = document.getElementById("timerBar");
const btnSubmit = document.getElementById("btnSubmit");
const btnRestart = document.getElementById("btnRestart");

// Lắng nghe sự kiện chọn level từ các nút (nếu bạn đã thêm vào HTML)
document.querySelectorAll(".btn-lvl").forEach(btn => {
    btn.addEventListener("click", function() {
        if (isPlaying) return; // Không cho đổi khi đang chơi
        document.querySelectorAll(".btn-lvl").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        currentLevel = parseInt(this.dataset.lvl);
        initGame();
    });
});

function initGame() {
    isPlaying = true;
    score = 0;
    usedWords = [];
    elScore.innerText = score;
    
    btnRestart.style.display = "none";
    btnSubmit.style.display = "inline-block";
    elInput.disabled = false;
    elInput.value = "";
    elInput.focus();

    // Máy chọn từ bắt đầu từ từ điển của lớp đã chọn
    const pool = dictionary[currentLevel];
    lastWord = pool[Math.floor(Math.random() * pool.length)];
    usedWords.push(lastWord.toLowerCase());
    
    elCurrentWord.innerText = lastWord;
    elMessage.innerText = "Đến lượt bạn nối từ: " + getLastName(lastWord);
    elMessage.className = "text-success";

    resetTimer();
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    updateTimerBar();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerBar();
        if (timeLeft <= 0) {
            gameOver("Hết thời gian!");
        }
    }, 1000);
}

function updateTimerBar() {
    const percent = (timeLeft / 15) * 100;
    elTimerBar.style.width = percent + "%";
    elTimerBar.style.background = timeLeft <= 5 ? "#d63031" : "#ff4757";
}

function checkAnswer() {
    if (!isPlaying) return;

    let userWord = elInput.value.trim();
    userWord = userWord.replace(/\s+/g, ' ');

    if (!userWord) return;

    const parts = userWord.split(' ');
    if (parts.length < 2) {
        gameOver("Sai luật: Phải nhập từ ít nhất 2 tiếng!");
        return;
    }

    const firstPart = parts[0].toLowerCase();
    const requiredPart = getLastName(lastWord).toLowerCase();

    // Kiểm tra xem từ người chơi nhập có nối đúng với từ trước không
    if (firstPart !== requiredPart) {
        gameOver(`Sai rồi! Phải bắt đầu bằng từ "${requiredPart}"`);
        return;
    }

    // Kiểm tra xem từ này đã dùng chưa
    if (usedWords.includes(userWord.toLowerCase())) {
        gameOver("Từ này đã được sử dụng rồi!");
        return;
    }

    // Chấp nhận từ của người chơi
    score++;
    elScore.innerText = score;
    usedWords.push(userWord.toLowerCase());
    elInput.value = "";

    // MÁY PHẢN CÔNG
    const lastPartUser = parts[parts.length - 1].toLowerCase();
    const machineResponse = findMachineWord(lastPartUser);

    if (machineResponse) {
        lastWord = machineResponse;
        usedWords.push(lastWord.toLowerCase());
        elCurrentWord.innerText = lastWord;
        elMessage.innerText = "Máy đáp: " + lastWord;
        resetTimer();
    } else {
        // Nếu máy không tìm được từ nối tiếp
        score += 5;
        elScore.innerText = score;
        gameOver("Máy không tìm được từ nối! Bạn thắng cuộc! +5 điểm.");
    }
}

// Hàm tìm từ trong từ điển để máy đáp lại
function findMachineWord(prefix) {
    const pool = dictionary[currentLevel];
    const choices = pool.filter(w => 
        w.toLowerCase().startsWith(prefix) && 
        !usedWords.includes(w.toLowerCase())
    );
    
    if (choices.length > 0) {
        return choices[Math.floor(Math.random() * choices.length)];
    }
    return null;
}

function getLastName(word) {
    const p = word.split(' ');
    return p[p.length - 1];
}

function gameOver(msg) {
    clearInterval(timerInterval);
    isPlaying = false;
    elInput.disabled = true;
    elMessage.innerText = msg + ` - Điểm: ${score}`;
    elMessage.className = "text-error";
    btnSubmit.style.display = "none";
    btnRestart.style.display = "inline-block";
}

btnSubmit.addEventListener("click", checkAnswer);
btnRestart.addEventListener("click", initGame);
elInput.addEventListener("keypress", (e) => { if (e.key === "Enter") checkAnswer(); });

// Khởi động game mặc định lớp 10
initGame();
