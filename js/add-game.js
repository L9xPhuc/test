import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

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
const auth = getAuth();
const db = getDatabase(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Nếu người dùng đã đăng nhập, kiểm tra quyền hạn của họ
        const userRef = ref(db, 'users/' + user.uid); // Lấy thông tin người dùng từ Realtime Database
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userRole = snapshot.val().role;  // Lấy quyền hạn của người dùng
                if (userRole !== "admin" && userRole !== "owner") {
                    // Nếu người dùng không phải admin hoặc owner, chuyển hướng họ
                    alert("Bạn không có quyền truy cập trang này!");
                    window.location.href = "index.html";  // Chuyển hướng về trang chính
                }
            }
        });
    } else {
        // Nếu người dùng chưa đăng nhập, chuyển hướng về trang đăng nhập
        alert("Bạn cần đăng nhập để truy cập trang này!");
        window.location.href = "login.html";
    }
});

document.getElementById('addGameForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const imageUrl = document.getElementById('imageUrl').value;
  const description = document.getElementById('description').value;
  const minSystemRequirements = document.getElementById('minSystemRequirements').value;
  const recommendedSystemRequirements = document.getElementById('recommendedSystemRequirements').value;
  const latestVersionDownloadLink = document.getElementById('latestVersionDownloadLink').value;
  const oldVersionDownloadLink = document.getElementById('oldVersionDownloadLink').value;
  const updateLinkOldVersion = document.getElementById('updateLinkOldVersion').value;
  const releaseDate = document.getElementById('releaseDate').value;
  const updateDate = document.getElementById('updateDate').value;
  const version = document.getElementById('version').value;
  const category = document.getElementById('category').value;

  const newGameRef = ref(db, 'games/' + new Date().getTime());
  await set(newGameRef, {
    name,
    imageUrl,
    description,
    minSystemRequirements,
    recommendedSystemRequirements,
    latestVersionDownloadLink,
    oldVersionDownloadLink,
    updateLinkOldVersion,
    releaseDate,
    updateDate,
    version,
    category
  });

  alert("Game đã được thêm!");
});