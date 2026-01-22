import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    // --- THÔNG TIN CẤU HÌNH (DÀNH RIÊNG CHO BẠN) ---
    const CLOUD_NAME = "dbmh7rkrx"; 
    const UPLOAD_PRESET = "weblop12a4"; // Bạn nhớ đã vào Cloudinary đổi cái này sang "Unsigned" nhé

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

    // 3. HÀM TẢI TÀI LIỆU LÊN (Dùng Cloudinary + Firebase)
    uploadForm.onsubmit = async (e) => {
        e.preventDefault();
        const file = fileInput.files[0];
        const title = uploadForm.title.value;
        const category = uploadForm.category.value;

        if (!file) return alert("Vui lòng chọn file trước khi tải lên!");

        // Đổi trạng thái nút bấm
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';

        try {
            // Bước A: Gửi file lên Cloudinary (Kho lưu trữ file miễn phí)
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);

            const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
                method: 'POST',
                body: formData
            });
            const cloudData = await cloudRes.json();

            if (!cloudData.secure_url) {
                throw new Error("Lỗi Cloudinary: Bạn hãy kiểm tra lại Upload Preset trong cài đặt Cloudinary đã để là 'Unsigned' chưa?");
            }

            // Bước B: Lưu thông tin và link file vào Firebase Database
            await addDoc(collection(window.fb_db, "documents"), {
                title: title || file.name,
                category: category,
                file_url: cloudData.secure_url, // Link tải file vĩnh viễn
                file_size: (file.size / 1024).toFixed(1) + " KB",
                createdAt: new Date(),
                uploader: "Thành viên 12A4"
            });

            alert("Chúc mừng! Tài liệu đã được đăng thành công.");
            uploadModal.classList.remove('active');
            uploadForm.reset();
            filePreview.innerHTML = "";
            loadDocuments(); // Cập nhật danh sách mới nhất

        } catch (err) {
            console.error("Lỗi:", err);
            alert("Không tải lên được: " + err.message);
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = 'Bắt đầu tải lên';
        }
    };

    // 4. HÀM TẢI DANH SÁCH TÀI LIỆU TỪ DATABASE
    async function loadDocuments() {
        const container = document.getElementById('doc-list-container');
        if (!container) return;
        container.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Đang lấy dữ liệu tài liệu...</p>';

        try {
            const q = query(collection(window.fb_db, "documents"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            
            container.innerHTML = "";
            if (querySnapshot.empty) {
                container.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Chưa có tài liệu nào. Hãy là người đầu tiên đóng góp!</p>';
                return;
            }

            querySnapshot.forEach((doc) => {
                const d = doc.data();
                let icon = 'fa-file-alt';
                const name = d.title.toLowerCase();
                if (name.includes('pdf')) icon = 'fa-file-pdf';
                else if (name.includes('doc')) icon = 'fa-file-word';
                else if (name.includes('ppt')) icon = 'fa-file-powerpoint';
                else if (name.includes('xls')) icon = 'fa-file-excel';

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
            console.error(e);
            container.innerHTML = "Lỗi khi kết nối Database. Bạn hãy kiểm tra lại tab Rules trong Firebase Firestore.";
        }
    }

    // 5. LOGIC LỌC THEO MÔN HỌC
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

    // 6. CHATBOT ROBOT (ĐƠN GIẢN)
    const chatWin = document.getElementById('chat-window');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    document.getElementById('chatbot-toggle').onclick = () => chatWin.classList.toggle('active');
    document.getElementById('chat-send').onclick = () => {
        const val = chatInput.value.trim();
        if(!val) return;
        const u = document.createElement('div'); u.className = 'msg user'; u.innerText = val;
        chatBody.appendChild(u); chatInput.value = "";
        setTimeout(() => {
            const b = document.createElement('div'); b.className = 'msg bot'; b.innerText = "Robot 12A4 chào bạn! Bạn cần tìm tài liệu gì hãy nhắn nhé.";
            chatBody.appendChild(b); chatBody.scrollTop = chatBody.scrollHeight;
        }, 600);
    };
});
