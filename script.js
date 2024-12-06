// 초기값 설정
let plateCounts = {
  blue: 0,
  red: 0,
};
let savePlatePrice = {};
let totalCount = 0;

// 유틸리티 함수: 새로운 그릇 HTML 생성
function createPlateElement(plateName, platePrice) {
  const newPlateDiv = document.createElement("div");
  newPlateDiv.className = "plate";
  newPlateDiv.setAttribute("data-plate", plateName);
  newPlateDiv.innerHTML = `
    <div class="input-group">
      <input type="number" id="${plateName}-price" value="${platePrice}"class="form-control" min="0">
      <span data-key="currencyUnit" class="input-group-text currencyUnit">円</span>
    </div>
    <div class="glow">
      <button class="btn btn-outline-danger" onclick="decrement('${plateName}')">-</button>
      <span id="${plateName}-count" class="count">0</span>
      <button class="btn btn-outline-success" onclick="increment('${plateName}')">+</button>
    </div>
  `;
  return newPlateDiv;
}

// 가격 및 데이터 업데이트
function updateTotalPrice() {
  let totalPrice = 0;
  for (let plate in plateCounts) {
    const price = document.getElementById(`${plate}-price`).value;
    savePlatePrice[`${plate}-price`] = price;
    totalPrice += plateCounts[plate] * parseInt(price, 10);
  }
  document.getElementById("total-prices").innerText = totalPrice;
  document.getElementById("total-count").innerText = totalCount;
  saveData();
}

// 수량 증가 및 감소
function increment(plate) {
  plateCounts[plate]++;
  totalCount++;
  document.getElementById(`${plate}-count`).innerText = plateCounts[plate];
  updateTotalPrice();
}
function decrement(plate) {
  if (plateCounts[plate] > 0) {
    plateCounts[plate]--;
    totalCount--;
    document.getElementById(`${plate}-count`).innerText = plateCounts[plate];
    updateTotalPrice();
  }
}

// 새로운 그릇 추가
function addNewPlate() {
  const platePrice = document.getElementById("new-plate-prices").value;
  if (!platePrice) {
    alert("가격을 입력해주세요.");
    return;
  }
  const plateContainer = document.getElementById("plate-container");
  const plateName = `plate-${Object.keys(plateCounts).length}`;
  plateContainer.appendChild(createPlateElement(plateName, platePrice));
  plateCounts[plateName] = 0;
  document.getElementById("new-plate-prices").value = "";
  loadLanguage();
  updateTotalPrice();
}

// 데이터 저장
function saveData() {
  localStorage.setItem("plateCounts", JSON.stringify(plateCounts));
  localStorage.setItem("savePlatePrice", JSON.stringify(savePlatePrice));
  localStorage.setItem("totalCount", JSON.stringify(totalCount));
}

// 데이터 로드
function loadData() {
  const savedData = JSON.parse(localStorage.getItem("savePlatePrice") || "{}");
  const savedCounts = JSON.parse(localStorage.getItem("plateCounts") || "{}");
  const savedTotalCount = localStorage.getItem("totalCount");

  const plateContainer = document.getElementById("plate-container");

  // 현재 DOM에 있는 plate ID 가져오기
  const existingPlateIds = [...document.querySelectorAll("[id$='-price']")].map(el => el.id);

  // 새로 추가된 접시 복구
  Object.keys(savedData).forEach((id) => {
    if (!existingPlateIds.includes(id)) {
      const plateName = id.replace("-price", "");
      plateContainer.appendChild(createPlateElement(plateName, savedData[id]));
    } else {
      // 기존 plate의 value 값 복구
      document.getElementById(id).value = savedData[id];
    }
  });

  // 데이터 복구
  plateCounts = { ...plateCounts, ...savedCounts };
  totalCount = savedTotalCount ? parseInt(savedTotalCount, 10) : 0;

  // UI 업데이트
  Object.keys(plateCounts).forEach((plate) => {
    const countElement = document.getElementById(`${plate}-count`);
    if (countElement) {
      countElement.innerText = plateCounts[plate];
    }
  });
  
  loadLanguage();
  updateTotalPrice();
}



// 저장 데이터 초기화
function resetSave() {
  localStorage.clear();
  location.reload();
}

// 다크모드
function darkMode() {
  document.getElementById("body").classList.toggle("darkmode");
  document.getElementsByTagName("html")[0].classList.toggle("darkmode");
}

//serviceWorker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/HowMuch/service-worker.js')
  .then(() => console.log('Service Worker registered!'));
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e; // 이벤트 저장
  document.getElementById('install-button').style.display = 'block'; // 버튼 표시
});

document.addEventListener('DOMContentLoaded', () => {
  const installButton = document.getElementById('install-button');
  if (installButton) {
    installButton.addEventListener('click', () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('PWA 설치됨');
          } else {
            console.log('PWA 설치 취소됨');
          }
          deferredPrompt = null;
        });
      }
    });
  } else {
    console.error("Install button not found in DOM");
  }
});

document.documentElement.requestFullscreen();

