// Sử dụng CDN để nhập Firebase module
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

// Cấu hình Firebase
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

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Kiểm tra trạng thái đăng nhập người dùng
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Nếu người dùng đã đăng nhập
    document.getElementById("loginButton").style.display = "none"; // Ẩn nút Login
    document.getElementById("logoutButton").style.display = "block"; // Hiện nút Logout
    document.getElementById("userInfo").style.display = "block"; // Hiện thông tin người dùng

    // Hiển thị tên người dùng (nếu có)
    document.getElementById("userName").innerText = user.email;
  } else {
    // Nếu người dùng chưa đăng nhập
    document.getElementById("loginButton").style.display = "block"; // Hiện nút Login
    document.getElementById("logoutButton").style.display = "none"; // Ẩn nút Logout
    document.getElementById("userInfo").style.display = "none"; // Ẩn thông tin người dùng
  }
});

// Đăng xuất người dùng khi bấm nút "Logout"
document.getElementById("logoutButton").addEventListener("click", async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
    window.location.href = "index.html"; // Chuyển hướng về trang chính sau khi đăng xuất
  } catch (error) {
    console.error("Error logging out:", error);
    alert("Đăng xuất thất bại:" + error.message);
  }
});

// Chuyển hướng đến trang đăng nhập khi bấm nút "Login"
document.getElementById("loginButton").addEventListener("click", () => {
  window.location.href = "login.html";
});

// Hiển thị danh sách game từ Firebase
async function displayGames() {
  const gamesRef = ref(db, 'games/');  // Truy cập đến node "games" trong Realtime Database
  const snapshot = await get(gamesRef);
  if (snapshot.exists()) {
    const games = snapshot.val();
    const gamesListDiv = document.getElementById('games-list');
    for (const gameId in games) {
      const game = games[gameId];
      const gameElement = document.createElement('div');
      gameElement.innerHTML = `
        <h2><a href="game-detail.html?gameId=${gameId}">${game.name}</a></h2>
        <img src="${game.imageUrl}" alt="${game.name}" width="200">
      `;
      gamesListDiv.appendChild(gameElement);
    }
  } else {
    document.getElementById('games-list').innerHTML = "Không có game nào!";
  }
}

displayGames();
