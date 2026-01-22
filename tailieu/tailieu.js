import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const CLOUD_NAME = "dbmh7rkrx"; 
    const UPLOAD_PRESET = "weblop12a4"; 

    const checkDB = setInterval(() => {
        if (window.fb_db) { clearInterval(checkDB); loadDocuments(); }
    }, 500);

    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('docFile');
    const btnSubmit = document.getElementById('btnSubmitUpload');

    if(uploadForm) {
        uploadForm.onsubmit = async (e) => {
            e.preventDefault();
            const file = fileInput.files[0];
            if(!file) return alert("Chưa chọn file!");

            btnSubmit.disabled = true;
            btnSubmit.innerHTML = 'Đang tải...';

            try {
                // Bước 1: Upload lên Cloudinary
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', UPLOAD_PRESET);

                console.log("Đang gửi file lên Cloudinary...");
                const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
                    method: 'POST',
                    body: formData
                });
                
                const cloudData = await res.json();
                console.log("Kết quả Cloudinary:", cloudData);

                if(!cloudData.secure_url) {
                    throw new Error(cloudData.error ? cloudData.error.message : "Lỗi upload file lên Cloudinary");
                }

                // Bước 2: Lưu vào Firebase
                console.log("Đang lưu link vào Firebase...");
                await addDoc(collection(window.fb_db, "documents"), {
                    title: document.getElementsByName('title')[0].value || file.name,
                    category: document.getElementsByName('category')[0].value,
                    file_url: cloudData.secure_url,
                    file_size: (file.size / 1024).toFixed(1) + " KB",
                    createdAt: new Date()
                });

                alert("Tải lên thành công!");
                location.reload();
            } catch (err) {
                console.error("LỖI CHI TIẾT:", err);
                alert("Lỗi rồi bạn ơi: " + err.message);
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = 'Bắt đầu tải lên';
            }
        };
    }

    async function loadDocuments() {
        const container = document.getElementById('doc-list-container');
        try {
            const q = query(collection(window.fb_db, "documents"), orderBy("createdAt", "desc"));
            const snap = await getDocs(q);
            container.innerHTML = "";
            snap.forEach(doc => {
                const d = doc.data();
                container.innerHTML += `
                <div class="doc-card">
                    <div class="file-icon"><i class="fas fa-file-alt"></i></div>
                    <h3>${d.title}</h3>
                    <a href="${d.file_url}" target="_blank" class="btn-dl">Tải xuống</a>
                </div>`;
            });
        } catch (e) { console.error("Lỗi load tài liệu:", e); }
    }
});
