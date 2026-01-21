// File: game/score-saver.js
import { db } from "../firebase-config.js";
import { doc, updateDoc, increment, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Hàm này sẽ được gọi từ các file game khác
window.saveScoreToFirebase = async function(points) {
    const userStr = localStorage.getItem('user_info_sql');
    if (!userStr) return; // Chưa đăng nhập thì không lưu

    const user = JSON.parse(userStr);
    const userRef = doc(db, "users", user.uid);

    try {
        // Cộng điểm vào Database (dùng increment để cộng dồn an toàn)
        await updateDoc(userRef, {
            score: increment(points)
        });
        console.log(`Đã cộng ${points} điểm lên Firebase!`);
        
        // Kiểm tra thăng hạng (Optional)
        const snap = await getDoc(userRef);
        const newScore = snap.data().score;
        let title = "Tân Binh";
        if(newScore > 5000) title = "Cao Thủ";
        if(newScore > 10000) title = "Huyền Thoại";
        
        if(snap.data().title !== title) {
            updateDoc(userRef, { title: title });
            alert(`Chúc mừng! Bạn đã thăng hạng: ${title}`);
        }

    } catch (e) {
        console.error("Lỗi lưu điểm:", e);
    }
}
