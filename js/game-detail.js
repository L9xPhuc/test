const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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
const db = getDatabase(app);

async function displayGameDetail() {
  const gameRef = ref(db, 'games/' + gameId);  // Lấy thông tin game theo gameId
  const snapshot = await get(gameRef);
  if (snapshot.exists()) {
    const game = snapshot.val();
    document.title = game.name;
    const gameDetailElement = document.createElement('div');
    gameDetailElement.innerHTML = `
      <h2>${game.name}</h2>
      <img src="${game.imageUrl}" alt="${game.name}" width="300">
      <p><strong>Description:</strong> ${game.description}</p>
      <p><strong>Minimum Requirements:</strong> ${game.minSystemRequirements}</p>
      <p><strong>Recommended Requirements:</strong> ${game.recommendedSystemRequirements}</p>
      <p><strong>Latest Version:</strong> <a href="${game.latestVersionDownloadLink}">Download</a></p>
      <p><strong>Old Version:</strong> <a href="${game.oldVersionDownloadLink}">Download</a></p>
      <p><strong>Update for Old Version:</strong> <a href="${game.updateLinkOldVersion}">Update</a></p>
      <p><strong>Release Date:</strong> ${game.releaseDate}</p>
      <p><strong>Update Date:</strong> ${game.updateDate}</p>
      <p><strong>Version:</strong> ${game.version}</p>
      <p><strong>Category:</strong> ${game.category}</p>
    `;
    document.getElementById('game-detail').appendChild(gameDetailElement);
  } else {
    document.getElementById('game-detail').innerHTML = "Game not found";
  }
}

displayGameDetail();
