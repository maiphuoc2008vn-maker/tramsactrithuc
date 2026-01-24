document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Màn hình chào ---
    const btnEnter = document.getElementById('btn-enter-site');
    if (btnEnter) {
        btnEnter.onclick = () => {
            document.getElementById('intro-overlay').style.opacity = '0';
            setTimeout(() => { 
                document.getElementById('intro-overlay').style.display = 'none'; 
            }, 800);
        };
    }

    // --- 2. Chế độ Dark Mode ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.onclick = () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        };
        // Load lại setting cũ
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // --- 3. Chatbot AI (Sửa lỗi API) ---
    const chatWin = document.getElementById('chat-window');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const btnOpenChat = document.getElementById('bot-open');
    const btnCloseChat = document.getElementById('bot-close');
    const btnSendChat = document.getElementById('chat-send-btn');

    // Ghép API Key
    const K1 = "AIzaSy";
    const K2 = "CtWzrCrEwT_OsS69tpjbS-_vKWNnd2dGc";
    const API_KEY = K1 + K2;

    const toggleChat = () => chatWin.classList.toggle('active');
    if (btnOpenChat) btnOpenChat.onclick = toggleChat;
    if (btnCloseChat) btnCloseChat.onclick = toggleChat;

    async function handleChat() {
        const text = chatInput.value.trim();
        if (!text) return;

        appendMsg(text, 'user');
        chatInput.value = '';

        const botMsgId = "bot-" + Date.now();
        appendMsg("Đang suy nghĩ...", 'bot', botMsgId);

        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `Bạn là trợ lý ảo thân thiện của lớp 12A4 THPT Đạm Ri. Hãy trả lời ngắn gọn: ${text}` }] }]
                })
            });

            const data = await response.json();
            const aiText = data.candidates[0].content.parts[0].text;
            document.getElementById(botMsgId).innerText = aiText;
        } catch (err) {
            document.getElementById(botMsgId).innerText = "Lỗi kết nối rồi bạn ơi!";
        }
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function appendMsg(txt, type, id = '') {
        const div = document.createElement('div');
        div.className = `msg ${type}`;
        if (id) div.id = id;
        div.innerText = txt;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    if (btnSendChat) btnSendChat.onclick = handleChat;
    if (chatInput) {
        chatInput.onkeypress = (e) => { if (e.key === 'Enter') handleChat(); };
    }

    // --- 4. Bảo vệ truy cập & Modal ---
    const loginModal = document.getElementById('login-modal');
    const cards = document.querySelectorAll('.glass-card');
    const btnCloseModal = document.getElementById('modal-close-btn');

    cards.forEach(card => {
        card.onclick = () => {
            const type = card.getAttribute('data-type');
            const link = card.getAttribute('data-link');
            if (type === 'tailieu') {
                loginModal.classList.add('active');
            } else {
                window.location.href = link;
            }
        };
    });

    if (btnCloseModal) {
        btnCloseModal.onclick = () => loginModal.classList.remove('active');
    }
});
