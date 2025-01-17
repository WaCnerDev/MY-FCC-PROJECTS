const btnConvert = document.getElementById("convert-btn");
const input = document.getElementById("number");
const output = document.getElementById("output");

const validateInput = (input) => {
  if (input === "") {
    showErrorMessage("Please enter a valid number");
    return false;
  } else if (parseInt(input) < 1) {
    showErrorMessage("Please enter a number greater than or equal to 1");
    return false;
  } else if (parseInt(input) > 3999) {
    showErrorMessage("Please enter a number less than or equal to 3999");
    return false;
  }
  return true;
};

const showErrorMessage = (message) => {
  output.innerText = message;
  output.classList.add("error-msg");
  output.classList.remove("hidden");
};


const showOutput = (result) => {
  output.innerText = result;
  output.classList.remove("hidden");
  output.classList.remove("error-msg");
}

const convertToRoman = (num) => {
  const romanNumeral = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let roman = "";

  for (let key in romanNumeral) {
    while (num >= romanNumeral[key]) {
      roman += key;
      num -= romanNumeral[key];
    }
  }
  return roman;
};

btnConvert.addEventListener("click", (e) => {
  e.preventDefault();
  const number = input.value;
  if (validateInput(number)) {
    const romanNumeral = convertToRoman(number);
    showOutput(romanNumeral);
  }
});
