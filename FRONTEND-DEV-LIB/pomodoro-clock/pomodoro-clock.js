const createLengthInput = (
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
) => {
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

  const $inputGroup = $("<div>")
    .addClass("input-group d-flex justify-content-center")
    .append($btnDecrement, $input, $btnIncrement);

  $btnDecrement.on("click", () => {
    let currentValue = parseInt($input.val());
    if (currentValue > min) {
      currentValue--;
      $input.val(currentValue);
      onDecrement(currentValue);
    }
  });

  $btnIncrement.on("click", () => {
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
};

const createTimeLeft = (timeLeft, idTimerLabel) => {
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
    text: timeLeft,
  });

  return $("<div>")
    .addClass("d-flex flex-column justify-content-center align-items-center")
    .append($label, $timeLeft);
};

const createBtnPlayPause = (onPlayPause) => {
  const $btnPlayPause = $("<button>", {
    id: "start_stop",
    class: "btn btn-primary",
    type: "button",
    text: "▶️",
  });

  $btnPlayPause.on("click", () => {
    onPlayPause();
  });

  return $btnPlayPause;
};

const createBtnReset = (onReset) => {
  const $btnReset = $("<button>", {
    id: "reset",
    class: "btn btn-danger",
    type: "button",
    text: "🔄",
  });

  $btnReset.on("click", () => {
    onReset();
  });

  return $btnReset;
};

$(() => {
  let pomodoroLength = 25;
  let breakLength = 5;
  let isRunning = false;
  let timerInterval;

  const $pomodoroLength = createLengthInput(
    "Pomodoro Length",
    "session-label",
    1,
    60,
    pomodoroLength,
    "session-length",
    "session-decrement",
    "session-increment",
    (value) => {
      pomodoroLength = value;
    },
    (value) => {
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
    (value) => {
      breakLength = value;
    },
    (value) => {
      breakLength = value;
    }
  );
  const formatTimeLeft = (seconds) => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const $timeLeft = createTimeLeft(formatTimeLeft(1500), "timer-label", false);

  const playTimer = () => {
    let timeLeft = pomodoroLength * 60;

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
      if (isRunning) {
        timeLeft--;
        $("#time-left").text(formatTimeLeft(timeLeft));
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          isRunning = false;
          $btnPlayPause.text("▶️");
        }
      }
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    isRunning = false;
    $btnPlayPause.text("▶️");
    $("#time-left").text(formatTimeLeft(25 * 60));
    $("#break-length").val(5);
    $("#session-length").val(25);
  };

  const $btnPlayPause = createBtnPlayPause(() => {
    isRunning = !isRunning;
    $btnPlayPause.text(isRunning ? "⏸️" : "▶️");
    if (isRunning) {
      playTimer();
    } else {
      clearInterval(timerInterval);
    }
  });

  const $btnReset = createBtnReset(() => {
    resetTimer();
  });

  const $containerControls = $("<div>")
    .addClass("d-flex justify-content-center gap-5")
    .append($btnPlayPause, $btnReset);

  $("#break-length-container").append($breakLength);
  $("#session-length-container").append($pomodoroLength);
  $("#timer-container").append($timeLeft, $containerControls);
});
