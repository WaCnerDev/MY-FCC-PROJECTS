const btnConvert = document.getElementById("convert-btn");
const input = document.getElementById("number");
const output = document.getElementById("output");
const type = document.getElementById("type");

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
};

const convertToRoman = (num) => {
  output.style.textTransform = "uppercase";
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

const convertToGreek = (num) => {
  let numInt = parseInt(num);
  output.style.textTransform = "none";
  const greekNumeral = {
    1: 'α',
    2: 'β',
    3: 'γ',
    4: 'δ',
    5: 'ε',
    6: 'ϛ',
    7: 'ζ',
    8: 'η',
    9: 'θ',
    10: 'ι',
    20: 'κ',
    30: 'λ',
    40: 'μ',
    50: 'ν',
    60: 'ξ',
    70: 'ο',
    80: 'π',
    90: 'ϟ',
    100: 'ρ',
    200: 'σ',
    300: 'τ',
    400: 'υ',
    500: 'φ',
    600: 'χ',
    700: 'ψ',
    800: 'ω',
    900: 'ϡ',
  };
  if(greekNumeral[numInt]){
    return greekNumeral[numInt];
  }else{
    let greek = "";
    const keys = Object.keys(greekNumeral).reverse();
    for (let key of keys) {
      while (numInt >= key) {
      greek += greekNumeral[key];
      numInt -= key;
      }
    }
    return greek;
  }
};

const convertToBinary = (num) => {
  return parseInt(num).toString(2);
};

const convertToHexadecimal = (num) => {
  return parseInt(num).toString(16).toUpperCase();
};

const convertToOctal = (num) => {
  return parseInt(num).toString(8);
};

btnConvert.addEventListener("click", (e) => {
  e.preventDefault();
  const number = input.value;
  if (validateInput(number)) {
    const selectedType = type.value;
    let result;
    switch (selectedType) {
      case "roman":
        result = convertToRoman(number);
        break;
      case "greek":
        result = convertToGreek(number);
        break;
      case "binary":
        result = convertToBinary(number);
        break;
      case "hexadecimal":
        result = convertToHexadecimal(number);
        break;
      case "octal":
        result = convertToOctal(number);
        break;
      default:
        showErrorMessage("Invalid conversion type selected");
        return;
    }
    showOutput(result);
  }
});
