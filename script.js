// 초기값 설정
let plateCounts = {
  blue: 0,
  red: 0,
};
let totalCount = 0;

// 가격 업데이트 함수
function updateTotalPrice() {
  let totalPrice = 0;

  // 각 그릇의 가격 * 수량을 계산
  for (let plate in plateCounts) {
    // let count = 0;
    const price = document.getElementById(`${plate}-price`).value;
    // count = document.getElementByClassName(count);
    // console.log("document.getElementByClassName(count)" + document.getElementByClassName(count));
    totalPrice += plateCounts[plate] * parseInt(price, 10);
    // totalCount += count;
  }

  const elements = document.querySelectorAll('plate');
  
  for (let count in elements){
    console.log("count: " + count);
    console.log("elements " + elements);
  }

  // 총 가격 업데이트
  document.getElementById("total-price").innerText = totalPrice;

 // 총 갯수 업데이트
  // document.getElementById("total-count").innerText = totalCount;
}

// 수량 증가 함수
function increment(plate) {
  plateCounts[plate]++;
  document.getElementById(`${plate}-count`).innerText = plateCounts[plate];
  updateTotalPrice();
}

// 수량 감소 함수
function decrement(plate) {
  if (plateCounts[plate] > 0) {
    plateCounts[plate]--;
    document.getElementById(`${plate}-count`).innerText = plateCounts[plate];
    updateTotalPrice();
  }
}

// 새로운 그릇 추가 함수
function addNewPlate() {
  const platePrice = document.getElementById("new-plate-price").value;

  if (platePrice) {
    // HTML에 새로운 그릇 요소 추가
    const plateContainer = document.getElementById("plate-container");
    const newPlateDiv = document.createElement("div");
    newPlateDiv.className = "plate";
    newPlateDiv.setAttribute("data-plate", platePrice);

    newPlateDiv.innerHTML = `
    <div class="input-group">
        <input type="number" id="${platePrice}-price" value="${platePrice}" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" min="0">
        <span class="input-group-text">円</span>
    </div>
    <div class="glow">
        <button class="btn btn-outline-danger" onclick="decrement('${platePrice}')">-</button>
        <span id="${platePrice}-count" class="count">0</span>
        <button class="btn btn-outline-success" onclick="increment('${platePrice}')">+</button>
    </div>
      `;

    // HTML에 새 그릇 추가
    plateContainer.appendChild(newPlateDiv);

    // plateCounts 객체에 새로운 그릇 추가
    plateCounts[platePrice] = 0;

    // 입력 필드 초기화
    document.getElementById("new-plate-price").value = "";

    // 총 가격 업데이트
    updateTotalPrice();
  } else {
    alert("가격을 입력해주세요.");
  }
}

const myModal = document.getElementById("myModal");
const myInput = document.getElementById("myInput");

myModal.addEventListener("shown.bs.modal", () => {
  myInput.focus();
});
