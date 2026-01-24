/* tailieu.js - GIỮ NGUYÊN FIREBASE + TÍCH HỢP AI GEMINI */

import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. THÔNG TIN CẤU HÌNH (DÀNH RIÊNG CHO BẠN - GIỮ NGUYÊN) ---
    const CLOUD_NAME = "dbmh7rkrx"; 
    const UPLOAD_PRESET = "weblop12a4"; 

    // Chờ Firebase khởi tạo xong
    const checkDB = setInterval(() => {
        if (window.fb_db) {
            clearInterval(checkDB);
            console.log("Kết nối Database lớp thành công!");
            loadDocuments(); 
        }
    }, 500);

    const uploadModal = document.getElementById('upload-modal');
    const fileInput = document.getElementById('docFile');
    const filePreview = document.getElementById('fileListPreview');
    const uploadForm = document.getElementById('uploadForm');
    const btnSubmit = document.getElementById('btnSubmitUpload');

    // 1. XỬ LÝ ĐÓNG/MỞ MODAL
    document.getElementById('btnOpenUpload').onclick = () => uploadModal.classList.add('active');
    document.getElementById('btnCloseUpload').onclick = () => {
        uploadModal.classList.remove('active');
        uploadForm.reset();
        filePreview.innerHTML = "";
    };

    // 2. HIỂN THỊ TÊN FILE KHI CHỌN
    fileInput.onchange = function() {
        if (this.files.length > 0) {
            filePreview.innerHTML = `<b>Đã chọn:</b> ${this.files[0].name}`;
        }
    };

    // 3. HÀM TẢI TÀI LIỆU LÊN (Dùng Cloudinary + Firebase - GIỮ NGUYÊN)
    uploadForm.onsubmit = async (e) => {
        e.preventDefault();
        const file = fileInput.files[0];
        const title = uploadForm.title.value;
        const category = uploadForm.category.value;

        if (!file) return alert("Vui lòng chọn file trước khi tải lên!");

        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);

            const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
                method: 'POST',
                body: formData
            });
            const cloudData = await cloudRes.json();

            if (!cloudData.secure_url) {
                throw new Error("Lỗi Cloudinary: Hãy kiểm tra Upload Preset.");
            }

            await addDoc(collection(window.fb_db, "documents"), {
                title: title || file.name,
                category: category,
                file_url: cloudData.secure_url,
                file_size: (file.size / 1024).toFixed(1) + " KB",
                createdAt: new Date(),
                uploader: "Thành viên 12A4"
            });

            alert("Chúc mừng! Tài liệu đã được đăng thành công.");
            uploadModal.classList.remove('active');
            uploadForm.reset();
            loadDocuments(); 

        } catch (err) {
            console.error("Lỗi:", err);
            alert("Không tải lên được: " + err.message);
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = 'Bắt đầu tải lên';
        }
    };

    // 4. HÀM TẢI DANH SÁCH TÀI LIỆU (GIỮ NGUYÊN)
    async function loadDocuments() {
        const container = document.getElementById('doc-list-container');
        if (!container) return;
        container.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Đang lấy dữ liệu tài liệu...</p>';

        try {
            const q = query(collection(window.fb_db, "documents"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            
            container.innerHTML = "";
            if (querySnapshot.empty) {
                container.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Chưa có tài liệu nào.</p>';
                return;
            }

            querySnapshot.forEach((doc) => {
                const d = doc.data();
                let icon = 'fa-file-alt';
                if (d.title.toLowerCase().includes('pdf')) icon = 'fa-file-pdf';
                container.innerHTML += `
                <div class="doc-card" data-category="${d.category}">
                    <div class="file-icon"><i class="fas ${icon}"></i></div>
                    <div class="doc-tag">${d.category.toUpperCase()}</div>
                    <h3>${d.title}</h3>
                    <div class="doc-meta">Cỡ: ${d.file_size} • Ngày: ${d.createdAt.toDate().toLocaleDateString('vi-VN')}</div>
                    <a href="${d.file_url}" target="_blank" class="btn-dl">Tải xuống tài liệu →</a>
                </div>`;
            });
        } catch (e) {
            container.innerHTML = "Lỗi khi kết nối Database.";
        }
    }

    // 5. LOGIC LỌC THEO MÔN HỌC (GIỮ NGUYÊN)
    document.querySelectorAll('.pill').forEach(btn => {
        btn.onclick = function() {
            document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            document.querySelectorAll('.doc-card').forEach(card => {
                card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
            });
        };
    });

    // 6. CHATBOT AI GEMINI 1.5 FLASH (ĐÃ CẬP NHẬT KEY MỚI)
    const GEMINI_API_KEY = "AIzaSyDFP8Hi3KOeXqOLQ1KK4Q782eNvNJMHF7k"; 
    const chatWin = document.getElementById('chat-window');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const btnSend = document.getElementById('chat-send');

    document.getElementById('chatbot-toggle').onclick = () => chatWin.classList.toggle('active');

    async function handleChat() {
        const userText = chatInput.value.trim();
        if (!userText) return;

        // 1. Hiện tin nhắn của bạn
        appendMsg(userText, 'user');
        chatInput.value = "";

        // 2. Hiện tin nhắn chờ từ AI
        const botMsgId = "bot-" + Date.now();
        appendMsg("Đang suy nghĩ...", 'bot', botMsgId);
        chatBody.scrollTop = chatBody.scrollHeight;

        try {
            // 3. Gọi AI Gemini
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Bạn là trợ lý học tập thông minh 12A4 Nam Hà. 
                                   Hãy trả lời học sinh thật thân thiện và súc tích. 
                                   Câu hỏi: ${userText}`
                        }]
                    }]
                })
            });

            const data = await response.json();
            const aiText = data.candidates[0].content.parts[0].text;

            // 4. Thay thế nội dung "Đang suy nghĩ" bằng kết quả thật
            document.getElementById(botMsgId).innerText = aiText;

        } catch (error) {
            document.getElementById(botMsgId).innerText = "Lỗi kết nối AI. Bạn thử lại nhé!";
        }
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function appendMsg(text, sender, id = "") {
        const div = document.createElement('div');
        if (id) div.id = id;
        div.className = `msg ${sender}`;
        div.innerText = text;
        chatBody.appendChild(div);
    }

    btnSend.onclick = handleChat;
    chatInput.onkeypress = (e) => { if (e.key === "Enter") handleChat(); };
});
