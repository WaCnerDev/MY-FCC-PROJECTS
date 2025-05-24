function createLengthInput(
  labelText,
  idLabel,
  min,
  max,
  defaultValue,
  inputId,
  decrementId,
  incrementId,
  onDecrement,
  onIncrement
) {
  const $label = $("<label>", {
    for: inputId,
    class: "form-label",
    text: labelText,
    id: idLabel,
  });

  const $btnDecrement = $("<button>", {
    id: decrementId,
    class: "btn btn-outline-secondary",
    type: "button",
    text: "-",
  });

  const $input = $("<input>", {
    id: inputId,
    type: "number",
    class: "form-control text-center",
    value: defaultValue,
    min: min,
    max: max,
  });

  const $btnIncrement = $("<button>", {
    id: incrementId,
    class: "btn btn-outline-secondary",
    type: "button",
    text: "+",
  });

  const $inputGroup = $("<div>", { class: "input-group" }).append(
    $btnDecrement,
    $input,
    $btnIncrement
  );

  $btnDecrement.on("click", function () {
    let currentValue = parseInt($input.val());
    if (currentValue > min) {
      currentValue--;
      $input.val(currentValue);
      onDecrement(currentValue);
    }
  });

  $btnIncrement.on("click", function () {
    let currentValue = parseInt($input.val());
    if (currentValue < max) {
      currentValue++;
      $input.val(currentValue);
      onIncrement(currentValue);
    }
  });

  return $("<div>")
    .addClass("d-flex flex-column justify-content-center align-items-center")
    .append($label, $inputGroup);
}

function createTimeLeft(timeLeft, idTimerLabel, isRunning) {
  function formatTimeLeft(seconds) {
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  const $label = $("<label>", {
    for: "time-left",
    class: "form-label",
    text: "Session",
    name: "time-left",
    id: idTimerLabel,
  });

  const $timeLeft = $("<div>", {
    id: "time-left",
    class: "text-center",
    text: formatTimeLeft(timeLeft),
  });

  return $("<div>").append($label, $timeLeft);
}

$(function () {
  let pomodoroLength = 25;
  let breakLength = 5;
  const $pomodoroLength = createLengthInput(
    "Pomodoro Length",
    "session-label",
    1,
    60,
    pomodoroLength,
    "session-length",
    "session-decrement",
    "session-increment",
    function (value) {
      pomodoroLength = value;
    },
    function (value) {
      pomodoroLength = value;
    }
  );

  const $breakLength = createLengthInput(
    "Break Length",
    "break-label",
    1,
    60,
    breakLength,
    "break-length",
    "break-decrement",
    "break-increment",
    function (value) {
      breakLength = value;
      console.log("Break length set to:", value);
    },
    function (value) {
      breakLength = value;
      console.log("Break length set to:", value);
    }
  );

  const $timeLeft = createTimeLeft(1500, "timer-label", false);

  $("#break-length-container").append($breakLength);
  $("#session-length-container").append($pomodoroLength);
  $("#timer-container").append($timeLeft);
});
