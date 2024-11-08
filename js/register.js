import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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
const db = getDatabase(app);

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user
        console.log("User registered:", user);
        const userRef = ref(db, 'users/' + user.uid);
        await set(userRef, {
            role: "member"
        });
        alert("Đăng ký thành công");
        window.location.href = "login.html";
    } catch (error) {
        console.error("Error registering user:", error);
        alert("Đăng ký thất bại: "+ error.message);
    }
});