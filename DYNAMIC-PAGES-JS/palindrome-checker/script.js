const input = document.getElementById("text-input");
const resultContainer = document.getElementById("result-container");
const result = document.getElementById("result");
const btn = document.getElementById("check-btn");

const formatValue = (value) => {
  let regexFunction = /[^a-zA-Z0-9]/g;
  // Remove all non-alphanumeric characters from the string
  return value.replace(regexFunction, "").toLowerCase();
};

const validateInput = () => {
 if (input.value === "") {
   alert("Please input a value");
    return;
 }
}

const isPalindrome = (value) => {
  const formattedValue = formatValue(value);
  const reversedValue = formattedValue.split("").reverse().join("");
  return formattedValue === reversedValue;
};

btn.addEventListener("click", (event) => {
  event.preventDefault();
  validateInput();
  const value = input.value;
  const resultValue = isPalindrome(value)? `${value} is a palindrome` : `${value} is not a palindrome`;
  result.textContent = resultValue;
  resultContainer.classList.remove("hidden");
});
