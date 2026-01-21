// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// --- QUAN TRỌNG: DÁN MÃ TỪ FIREBASE CONSOLE VÀO ĐÂY ---
// (Vào Firebase -> Project Settings -> Kéo xuống dưới copy config)
const firebaseConfig = {
     apiKey: "AIzaSyAag7aoIhAMWFkkd_ubM0WrPrOmWo3VBkE",
  authDomain: "tramsactrithuc-4faae.firebaseapp.com",
  projectId: "tramsactrithuc-4faae",
  storageBucket: "tramsactrithuc-4faae.firebasestorage.app",
  messagingSenderId: "384378012486",
  appId: "1:384378012486:web:877c64923c1f7fb6bb5b47"
};
// ------------------------------------------------------

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
