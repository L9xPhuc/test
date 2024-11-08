import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC7L9aFCDp_5fn5O5nRlQqy6Cw9lJvv5RY",
    authDomain: "death-squad-team-eb989.firebaseapp.com",
    databaseURL: "https://death-squad-team-eb989-default-rtdb.asia-southeast1.firebasedatabase.app",    
    projectId: "death-squad-team-eb989",
    storageBucket: "death-squad-team-eb989.firebasestorage.app",
    messagingSenderId: "1020908778574",
    appId: "1:1020908778574:web:48208ff0bac3f3603a3f1f",
    measurementId: "G-KPXJRVWVXQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User Logged in:", userCredential.user);
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error logging in:", error);
        alert("Đăng nhập thất bại:" + error.message);
    }
})