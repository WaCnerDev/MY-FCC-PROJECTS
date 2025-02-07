let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];
let valuePerUnit = {
  "ONE HUNDRED": 100,
  TWENTY: 20,
  TEN: 10,
  FIVE: 5,
  ONE: 1,
  QUARTER: 0.25,
  DIME: 0.1,
  NICKEL: 0.05,
  PENNY: 0.01,
};
let changeArray = [];
const cashInput = document.getElementById("cash");
const purchase = document.getElementById("purchase-btn");
const totalElement = document.getElementById("total");
const changeElement = document.getElementById("change-due");
let scrollInterval;
const generateNewPrice = () => {
  price = (Math.random() * 100).toFixed(2);
};

const printPrice = () => {
  totalElement.innerHTML += `Total: $${price}`;
};

const calculateChange = () => {
  return (cashInput.value - price).toFixed(2);
};

const calculateCashInDrawer = () => {
  let total = 0;
  cid.forEach((element) => {
    total += element[1];
  });
  return total;
};

const scrollText = () => {
  if (scrollInterval) {
    clearInterval(scrollInterval); // Detener cualquier animación existente
  }
  let scrollPosition = 0;
  const textWidth = changeElement.offsetWidth;
  const containerWidth = changeElement.parentElement.offsetWidth;
  scrollInterval =setInterval(() => {
    scrollPosition -= 15;
    changeElement.style.transform = `translateX(${scrollPosition}px)`;
    if (-scrollPosition > textWidth) {
      changeElement.style.transform = `translateX(${containerWidth - 18}px)`;
      scrollPosition = containerWidth - 18;
    }
  }, 200);
};

const canGiveChange = () => {
  changeArray = [];
  let changeDue = parseFloat(calculateChange());
  let remainingChange = changeDue;
  for (let i = cid.length - 1; i >= 0; i--) {
    let currency = cid[i][0];
    let available = cid[i][1];
    let value = valuePerUnit[currency];
    let amountToReturn = 0;
    while (remainingChange >= value && available > 0) {
      remainingChange = (remainingChange - value).toFixed(2);
      available -= value;
      amountToReturn += value;
    }

    if (amountToReturn > 0) {
      changeArray.push([currency, amountToReturn]);
    }
  }
  return remainingChange == 0;
};

const defineStatus = () => {
  let haveChange = canGiveChange();
  let changeDue = parseFloat(calculateChange());
  let cashInDrawer = calculateCashInDrawer();
  if (cashInDrawer < changeDue || !haveChange) {
    return "INSUFFICIENT_FUNDS";
  } else if (cashInDrawer == changeDue) {
    return "CLOSED";
  } else if (cashInDrawer > changeDue && haveChange) {
    return "OPEN";
  }
};

const showAlerts = () => {
  const cashFromClient = cashInput.value;
  const priceToPay = price;
  if (cashFromClient < priceToPay) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cashFromClient == priceToPay) {
    alert("No change due - customer paid with exact cash");
  }
};

const generateResult = (status) => {
  changeElement.innerHTML = "";
  let result = "########################";
  if (status) {
    result = "Status: " + status;
    for (let i = 0; i < changeArray.length; i++) {
      result += " " + changeArray[i][0] + ": $" + changeArray[i][1] + " ";
    }
  }
  for (let i = 0; i < 3; i++) {
    changeElement.innerHTML += `<span> ${result} </span>`;
  }
};
printPrice();
generateResult();
scrollText();

purchase.addEventListener("click", (e) => {
  e.preventDefault();
  generateResult(defineStatus());
  scrollText();
  showAlerts();
  cashInput.value = "";
});
