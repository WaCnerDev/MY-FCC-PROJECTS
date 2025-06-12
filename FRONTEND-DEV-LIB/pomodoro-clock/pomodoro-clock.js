const createLengthInput = (
  labelText,
  idLabel,
  min,
  max,
  defaultValue,
  inputId,
  decrementId,
  incrementId,
  onChange
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
    min,
    max,
    readonly: true,
  });

  const $btnIncrement = $("<button>", {
    id: incrementId,
    class: "btn btn-outline-secondary",
    type: "button",
    text: "+",
  });

  const updateValue = (delta) => {
    let value = parseInt($input.val()) + delta;
    if (value >= min && value <= max) {
      $input.val(value);
      onChange(value);
    }
  };

  $btnDecrement.on("click", () => updateValue(-1));
  $btnIncrement.on("click", () => updateValue(1));

  const $inputGroup = $("<div>")
    .addClass("input-group d-flex justify-content-center")
    .append($btnDecrement, $input, $btnIncrement);

  return $("<div>")
    .addClass("d-flex flex-column justify-content-center align-items-center")
    .append($label, $inputGroup);
};

const createTimeLeft = (timeLeft, idTimerLabel) => {
  const $label = $("<label>", {
    for: "time-left",
    class: "form-label",
    text: "Session",
    id: idTimerLabel,
  });

  const $timeLeft = $("<div>", {
    id: "time-left",
    class: "text-center border border-3 border-light-subtle rounded-circle p-5",
    text: timeLeft,
  });

  return $("<div>")
    .addClass(
      "d-flex flex-column justify-content-center align-items-center text-light"
    )
    .append($label, $timeLeft);
};

const createButton = (idBtn, className, onClick, textP, iconHtml) => {
  const $btn = $("<button>", {
    id: idBtn,
    class: className,
    type: "button",
  });

  if (iconHtml) {
    $btn.append($(iconHtml));
    if (textP) {
      $btn.append(" ", textP);
    }
  } else {
    $btn.text(textP);
  }

  $btn.on("click", () => {
    onClick();
  });

  return $btn;
};

const createSessionCounter = (sessionLength) => {
  const $sessionCounter = $("<span>", {
    id: "session-length",
    class: "text-center fs-2",
    text: sessionLength,
  });

  const $sessionLabel = $("<label>", {
    for: "session-length",
    text: "Completed Sessions",
  });

  return $("<div>")
    .addClass(
      "d-flex flex-column justify-content-center align-items-center text-light"
    )
    .append($sessionCounter, $sessionLabel);
};

$(() => {
  const timeSettings = { session: 25, break: 5 };
  let isRunning = false;
  let timeState = "session";
  let timerInterval;
  let alarmInterval;
  let currentSeconds = timeSettings.session * 60;
  let completedSessions = 0;

  const formatTimeLeft = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
      seconds % 60
    ).padStart(2, "0")}`;

  const updateInfo = () => {
    $("#time-left").text(formatTimeLeft(currentSeconds));
    $("#timer-label").text(timeState === "session" ? "Session" : "Break");
  };

  const incrementSession = () => {
    if (timeState === "break") {
      completedSessions++;
      $("#session-length").text(completedSessions);
    }
  };

  const switchState = () => {
    timeState = timeState === "session" ? "break" : "session";
    currentSeconds = timeSettings[timeState] * 60;
    updateInfo();
    playTimer();
  };

  const stopAlarm = () => {
    clearInterval(alarmInterval);
    $("#beep").get(0).pause();
    $("#beep").get(0).currentTime = 0; // Resetea el tiempo del audio
  };

  const playAlarm = () => {
    clearInterval(alarmInterval);
    $("#beep").get(0).play();
    alarmInterval = setTimeout(() => {
      stopAlarm();
    }, 2000); // Detiene el sonido después de 2 segundos
  };

  const playTimer = () => {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (!isRunning) return;
      currentSeconds--;
      updateInfo();
      if (currentSeconds < 0) {
        clearInterval(timerInterval);
        playAlarm();
        incrementSession();
        switchState();
      }
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    stopAlarm();
    isRunning = false;

    // Resetea las configuraciones de tiempo primero
    timeSettings.session = 25;
    timeSettings.break = 5;
    completedSessions = 0;

    // Asegura que los inputs reflejen los valores por defecto
    $("#break-length").val(timeSettings.break);
    $("#session-length").val(timeSettings.session);
    $("#session-length").text(completedSessions);

    // Resetea el estado del temporizador
    timeState = "session";
    currentSeconds = timeSettings.session * 60; // Esto será 25 * 60 = 1500

    // Asegura que el botón de play/pause vuelva a "Play"
    $btnPlayPause.html('<i class="bi bi-play-fill"></i>');

    // Finalmente, actualiza la visualización para que muestre el tiempo de sesión por defecto
    // Esto asegura que time-left muestre 25:00 y timer-label muestre "Session"
    updateInfo();
  };

  const handleLengthChange = (type, value) => {
    timeSettings[type] = value;
    if (timeState === type) {
      currentSeconds = value * 60;
      updateInfo();
    }
  };

  const $pomodoroLength = createLengthInput(
    "Pomodoro Length",
    "session-label",
    1,
    60,
    timeSettings.session,
    "session-length",
    "session-decrement",
    "session-increment",
    (value) => handleLengthChange("session", value)
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
    (value) => handleLengthChange("break", value)
  );

  const $timeLeft = createTimeLeft(
    formatTimeLeft(currentSeconds),
    "timer-label"
  );

  const $btnPlayPause = createButton(
    "start_stop",
    "btn btn-primary rounded-circle",
    () => {
      isRunning = !isRunning;
      $btnPlayPause.html(
        isRunning
          ? '<i class="bi bi-pause-fill"></i>'
          : '<i class="bi bi-play-fill"></i>'
      );
      if (isRunning) playTimer();
      else clearInterval(timerInterval);
    },
    null,
    '<i class="bi bi-play-fill"></i>'
  );

  const $btnReset = createButton(
    "reset",
    "btn btn-danger rounded-circle",
    resetTimer,
    null,
    '<i class="bi bi-arrow-clockwise"></i>'
  );

  const $btnSettingsModal = createButton(
    "settings-modal",
    "btn btn-outline-light ",
    null,
    "Settings",
    '<i class="bi bi-gear-fill"></i>'
  );

  $btnSettingsModal.attr("data-bs-toggle", "modal");
  $btnSettingsModal.attr("data-bs-target", "#settingsModal");

  const $containerControls = $("<div>")
    .addClass("d-flex justify-content-center gap-5")
    .append($btnPlayPause, $btnReset);

  const $sessionCounter = createSessionCounter(completedSessions);

  $("#break-length-container").append($breakLength);
  $("#session-length-container").append($pomodoroLength);
  $("#timer-container").append(
    $timeLeft,
    $containerControls,
    $sessionCounter,
    $btnSettingsModal
  );

  updateInfo();
});
