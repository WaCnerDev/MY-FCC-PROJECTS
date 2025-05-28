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
  const timeSettings = {
    session: 25,
    break: 5,
  };
  let isRunning = false;
  let timeState = "session";
  let timerInterval;

  const $pomodoroLength = createLengthInput(
    "Pomodoro Length",
    "session-label",
    1,
    60,
    timeSettings.session,
    "session-length",
    "session-decrement",
    "session-increment",
    (value) => {
      timeSettings.session = value;
      if (timeState === "session") {
        updateInfo(
          "Session",
          formatTimeLeft(transformMinutesToSeconds(timeSettings.session))
        );
      } else {
        updateInfo(
          "Break",
          formatTimeLeft(transformMinutesToSeconds(timeSettings.break))
        );
      }
    },
    (value) => {
      timeSettings.session = value;
      if (timeState === "session") {
        updateInfo(
          "Session",
          formatTimeLeft(transformMinutesToSeconds(timeSettings.session))
        );
      } else {
        updateInfo(
          "Break",
          formatTimeLeft(transformMinutesToSeconds(timeSettings.break))
        );
      }
    }
  );

  const $breakLength = createLengthInput(
    "Break Length",
    "break-label",
    1,
    60,
    timeSettings.break,
    "break-length",
    "break-decrement",
    "break-increment",
    (value) => {
      timeSettings.break = value;
      if (timeState === "break") {
        updateInfo(
          "Break",
          formatTimeLeft(transformMinutesToSeconds(timeSettings.break))
        );
      } else {
        updateInfo(
          "Session",
          formatTimeLeft(transformMinutesToSeconds(timeSettings.session))
        );
      }
    },
    (value) => {
      timeSettings.break = value;
      if (timeState === "break") {
        updateInfo(
          "Break",
          formatTimeLeft(transformMinutesToSeconds(timeSettings.break))
        );
      } else {
        updateInfo(
          "Session",
          formatTimeLeft(transformMinutesToSeconds(timeSettings.session))
        );
      }
    }
  );

  const updateInfo = (timeLabel, timeLeft) => {
    $("#time-left").text(timeLeft);
    $("#timer-label").text(timeLabel);
  };

  const switchToBreak = () => {
    isRunning = true;
    timeState = "break";
    updateInfo(
      "Break",
      formatTimeLeft(transformMinutesToSeconds(timeSettings.break))
    );
    playTimer(transformMinutesToSeconds(timeSettings.break));
  };

  const switchToSession = () => {
    isRunning = true;
    timeState = "session";
    updateInfo(
      "Session",
      formatTimeLeft(transformMinutesToSeconds(timeSettings.session))
    );
    playTimer(transformMinutesToSeconds(timeSettings.session));
  };

  //da el formato que se muestra en el temporizador
  //mm:ss
  //donde mm son los minutos y ss los segundos
  const formatTimeLeft = (seconds) => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const transformMinutesToSeconds = (minutes) => {
    return minutes * 60;
  };

  const $timeLeft = createTimeLeft(
    formatTimeLeft(transformMinutesToSeconds(timeSettings.session)),
    "timer-label",
    false
  );

  //Esta funcion solo se encarga de hacer el conteo del tiempo
  //y de actualizar el tiempo restante en el DOM
  const playTimer = (
    timeLeft = transformMinutesToSeconds(timeSettings.session)
  ) => {
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
          timeState === "session" ? switchToBreak() : switchToSession();
        }
      }
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    isRunning = false;
    $btnPlayPause.text("▶️");
    timeSettings.break = 5;
    timeSettings.session = 25;
    $("#break-length").val(timeSettings.break);
    $("#session-length").val(timeSettings.session);
    $("#time-left").text(
      formatTimeLeft(transformMinutesToSeconds(timeSettings.session))
    );
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
