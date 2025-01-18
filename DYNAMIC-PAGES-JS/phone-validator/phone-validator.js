const validatePhoneNumber = (e) => {
  e.preventDefault();
  const resultsDiv = document.getElementById("results-div");
  const userInput = document.getElementById("user-input").value;
  var validPhoneNumber =
    /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/;

  if (!userInput) {
    alert("Please provide a phone number");
  } else if (validPhoneNumber.test(userInput)) {
    resultsDiv.textContent = "Valid US number: " + userInput;
    resultsDiv.classList.add("valid-msg");
  } else {
    resultsDiv.textContent = "Invalid US number: " + userInput;
    resultsDiv.classList.add("error-msg");
  }
};

document
  .getElementById("check-btn")
  .addEventListener("click", (e) => validatePhoneNumber(e));

document.getElementById("clear-btn").addEventListener("click", function () {
  document.getElementById("results-div").textContent = "";
});
