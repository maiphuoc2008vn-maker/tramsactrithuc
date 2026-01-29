/* 
   tailieu.js - BẢN SỬA LỖI THEO ĐÚNG MODEL GEMINI 3 
   Model: gemini-3-flash-preview
*/

import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CẤU HÌNH ---
    const CLOUD_NAME = "dbmh7rkrx"; 
    const UPLOAD_PRESET = "weblop12a4"; 
    const GEMINI_API_KEY = "AIzaSyC3WLjDRwWl756s-_jBwI-BJwM7pAfMgNA"; 

    // Chờ Firebase khởi tạo
    const checkDB = setInterval(() => {
        if (window.fb_db) {
            clearInterval(checkDB);
            loadDocuments(); 
        }
    }, 500);

    const uploadModal = document.getElementById('upload-modal');
    const fileInput = document.getElementById('docFile');
    const filePreview = document.getElementById('fileListPreview');
    const uploadForm = document.getElementById('uploadForm');
    const btnSubmit = document.getElementById('btnSubmitUpload');

    document.getElementById('btnOpenUpload').onclick = () => uploadModal.classList.add('active');
    document.getElementById('btnCloseUpload').onclick = () => {
        uploadModal.classList.remove('active');
        uploadForm.reset();
        filePreview.innerHTML = "";
    };

    fileInput.onchange = function() {
        if (this.files.length > 0) filePreview.innerHTML = `<b>Đã chọn:</b> ${this.files[0].name}`;
    };

    // --- 2. HÀM TẢI TÀI LIỆU ---
    uploadForm.onsubmit = async (e) => {
        e.preventDefault();
        const file = fileInput.files[0];
        if (!file) return alert("Vui lòng chọn file!");
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = 'Đang tải...';

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);
            const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, { method: 'POST', body: formData });
            const cloudData = await cloudRes.json();

            await addDoc(collection(window.fb_db, "documents"), {
                title: uploadForm.title.value || file.name,
                category: uploadForm.category.value,
                file_url: cloudData.secure_url,
                file_size: (file.size / 1024).toFixed(1) + " KB",
                createdAt: new Date(),
                uploader: "Thành viên 12A4"
            });
            alert("Tải lên thành công!");
            uploadModal.classList.remove('active');
            loadDocuments(); 
        } catch (err) { alert("Lỗi: " + err.message); }
        finally { btnSubmit.disabled = false; btnSubmit.innerHTML = 'Bắt đầu tải lên'; }
    };

    // --- 3. HÀM HIỂN THỊ DANH SÁCH ---
    async function loadDocuments() {
        const container = document.getElementById('doc-list-container');
        if (!container) return;
        try {
            const q = query(collection(window.fb_db, "documents"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            container.innerHTML = "";
            querySnapshot.forEach((doc) => {
                const d = doc.data();
                container.innerHTML += `
                <div class="doc-card" data-category="${d.category}">
                    <div class="file-icon"><i class="fas fa-file-alt"></i></div>
                    <h3>${d.title}</h3>
                    <div class="doc-meta">Cỡ: ${d.file_size} • Ngày: ${d.createdAt.toDate().toLocaleDateString('vi-VN')}</div>
                    <a href="${d.file_url}" target="_blank" class="btn-dl">Tải xuống →</a>
                </div>`;
            });
        } catch (e) { console.error(e); }
    }

    // --- 4. BỘ LỌC ---
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
