$(document).ready(function () {
  let display = $("#display");
  let currentInput = "0"; // Inicializamos con '0'

  function updateDisplay(newChar) {
    display.text(display.text() + newChar);
  }

  function resetCalculator() {
    currentInput = "0";
    operator = null;
    firstOperand = null;
    waitingForSecondOperand = false;
    display.text("0"); // clear display
  }

  function deleteLastCharacter() {
    const text = display.text();
    if (text.length > 1) {
      display.text(text.slice(0, -1)); // Remove last character from display
      currentInput =
        currentInput.slice(0, -1) ||
        text
          .slice(0, -1)
          .split(/[+\-*/]/)
          .filter(Boolean)
          .pop() ||
        "0"; // Update current input or reset to '0'
    } else {
      resetCalculator(); // Reset calculator if only one character is left
    }
  }

  function addCharToDisplay() {
    const char = $(this).text();
    if (char === "." && currentInput.includes(".")) return; // Prevent multiple decimals
    if (/[+\-*/]/.test(char)) {
      updateDisplay(char);
      currentInput = ""; // Reset for the next number
    } else {
      if (currentInput === "0" && char !== ".") {
        currentInput = char; // Reset for the next number
        display.text(""); // Update display immediately
        updateDisplay(currentInput); // Update display with the new number
      } else {
        currentInput += char; // Append the character to the current input
        updateDisplay(char); // Update display with the new character
      }
    }
  }

  function evaluateExpression() {
    const expression = cleanExpression(display.text());
    console.log(expression);
    try {
      const result = math.evaluate(expression);
      display.text(result);
    } catch (error) {
      console.error("Error in calculation:", error);
      display.text("Error");
    }
  }

  function cleanExpression(expression) {
    const arrayExpression = expression.match(/(\d+(\.\d+)?|[+\-*/]+)/g);
    console.log("The expression converted to array", arrayExpression);
    for (let i = 0; i < arrayExpression.length; i++) {
      if (
        /[+\-*/]{2,}/.test(arrayExpression[i]) &&
        arrayExpression[i] !== "*-"
      ) {
        arrayExpression[i] = arrayExpression[i].slice(-1); // Keep only the last operator, except for "*-"
      }
    }
    return arrayExpression.join(""); // Join the cleaned array back into a string
  }

  $("#clear").click(resetCalculator);

  $("#delete").click(deleteLastCharacter);

  $(".btn-light").click(addCharToDisplay);

  $(".btn-secondary").not("#delete").click(addCharToDisplay); // this line is added to handle the secondary buttons, except delete

  $("#equals").click(evaluateExpression);

  // Inicializar la pantalla con '0'
  updateDisplay(currentInput);
});
