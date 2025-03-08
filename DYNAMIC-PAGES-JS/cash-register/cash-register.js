let price = 0;
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
const cashInDrawerElement = document.getElementById("cash-in-drawer");
let scrollInterval;

// Display functions
const printPrice = () => {
  totalElement.innerHTML = "";
  totalElement.innerHTML += `Total: $${parseFloat(price)}`;
};

const generateResult = (status) => {
  changeElement.innerHTML = "";
  const cashFromClient = parseFloat(cashInput.value);
  let result = "Enter the total amount to be paid";
  if (cashFromClient < price) {
    result = "Customer does not have enough money to purchase the item";
  } else if (cashFromClient == price) {
    result = "No change due - customer paid with exact cash";
  } else if (status) {
    result = "Status: " + status;
    if (status != "INSUFFICIENT_FUNDS") {
      for (let i = 0; i < changeArray.length; i++) {
        result += " " + changeArray[i][0] + ": $" + changeArray[i][1] + " ";
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    changeElement.innerHTML += `<span>${result}</span>`;
  }
};

const displayCashInDrawer = () => {
  cashInDrawerElement.innerHTML = "";
  cid.forEach((element) => {
    cashInDrawerElement.innerHTML += `<p class="value-in-drawer">${element[0]}: $${element[1]}</p>`;
  });
  cashInDrawerElement.innerHTML += `<p class="value-in-drawer"><b>TOTAL: $${calculateCashInDrawer()}</b></p>`;
};

const scrollText = () => {
  if (scrollInterval) {
    clearInterval(scrollInterval); // Detener cualquier animación existente
  }
  let scrollPosition = 0;
  const textWidth = changeElement.offsetWidth;
  const containerWidth = changeElement.parentElement.offsetWidth;
  scrollInterval = setInterval(() => {
    scrollPosition -= 15;
    changeElement.style.transform = `translateX(${scrollPosition}px)`;
    if (-scrollPosition > textWidth) {
      changeElement.style.transform = `translateX(${containerWidth - 18}px)`;
      scrollPosition = containerWidth - 18;
    }
  }, 200);
};

// Calculation functions
const calculateChange = () => {
  return (cashInput.value - price).toFixed(2);
};

const calculateCashInDrawer = () => {
  let total = 0;
  cid.forEach((element) => {
    total += element[1];
  });
  return total.toFixed(2);
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
      cid[i][1] -= value;
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
    price = 0;
    return "OPEN";
  }
};

// User interaction functions
const showAlerts = () => {
  const cashFromClient = cashInput.value;
  const priceToPay = price;
  if (cashFromClient < priceToPay) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cashFromClient == priceToPay) {
    alert("No change due - customer paid with exact cash");
  }
};

const clearDisplay = () => {
  price = 0;
  printPrice();
  generateResult();
};

const updatePrice = (newDigit) => {
  if (newDigit === ".") {
    if (price.toString().includes(".")) {
      return; // Ya hay un punto decimal, no hacer nada
    } else {
      price = price.toString() + "."; // Concatenar el punto decimal como cadena
    }
  } else if (newDigit === "0" && price === 0) {
    return; // Evitar agregar ceros al inicio si el precio es 0
  } else {
    price = price.toString() + newDigit; // Concatenar dígitos como cadena
  }
  printPrice();
  generateResult();
};

const deleteDigit = () => {
  price = parseFloat(price.toString().slice(0, -1));
  if (!price) {
    price = 0;
  }
  printPrice();
  generateResult();
};

// Event listeners
document.querySelectorAll(".key").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    if (value === "clear") {
      clearDisplay();
    } else if (value === "open") {
      cashInDrawerElement.style.display = "grid";
      cashInDrawerElement.style.gridTemplateColumns = "1fr 1fr";
      const lastSpace = cashInDrawerElement.lastElementChild;
      const antepenultimateSpace =
        cashInDrawerElement.children[cashInDrawerElement.children.length - 2];
      lastSpace.style.gridColumn = "1 / -1";
      antepenultimateSpace.style.gridColumn = "1 / -1";
      displayCashInDrawer();
    } else if (value === "close") {
      cashInDrawerElement.style.display = "none";
    } else if (value === "enter") {
      purchase.click();
    } else if (value === "delete") {
      deleteDigit();
    } else {
      updatePrice(value);
    }
  });
});

purchase.addEventListener("click", (e) => {
  e.preventDefault();
  generateResult(defineStatus());
  displayCashInDrawer();
  scrollText();
  showAlerts();
  cashInput.value = "";
});

window.addEventListener("load", () => {
  displayCashInDrawer();
  printPrice();
  generateResult();
  scrollText();
});
