const responsiveWebDesign = document.querySelector(
  "#responsive-web .project-cards"
);
const dynamicPagesJS = document.querySelector(
  "#dynamic-pages-js .project-cards"
);
const frontendDevLib = document.querySelector(
  "#frontend-dev-libraries .project-cards"
);

function fromStatusToColor(status) {
  if (status === "Development") {
    return "development";
  } else {
    return "completed";
  }
}

function formatDate(date) {
  const pastDate = new Date(date);
  const currentDate = new Date();
  const amountDaysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const diffInMilliseconds = currentDate.getTime() - pastDate.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / amountDaysInMonth);
  const diffInYears = Math.floor(diffInDays / 365);

  let timeAgo = "";
  let typeDiff = "";
  if (diffInYears > 0) {
    timeAgo = `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
    typeDiff = "year";
  } else if (diffInMonths > 0) {
    timeAgo = `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    typeDiff = "month";
  } else if (diffInDays > 0) {
    timeAgo = `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    typeDiff = "day";
  } else if (diffInHours > 0) {
    timeAgo = `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    typeDiff = "hour";
  } else if (diffInMinutes > 0) {
    timeAgo = `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    typeDiff = "minute";
  } else {
    timeAgo = `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
    typeDiff = "second";
  }

  return `<p class="value ${typeDiff}" data-last-update="${date}">${timeAgo}</p>`;
}

function updateLastUpdate() {
  const lastUpdateElements = document.querySelectorAll(
    ".second, .minute, .hour"
  );
  lastUpdateElements.forEach((element) => {
    const lastUpdate = element.getAttribute("data-last-update");
    element.innerHTML = formatDate(lastUpdate);
  });
}

function truncateDescription(description) {
  const maxLength = window.innerWidth <= 768 ? 200 : 150;
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
}

function renderCards(
  title,
  description,
  path,
  status,
  image,
  link,
  lastUpdate
) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img class="preview-project" src="${image}" alt="${title}" />
    <div class="info-container"> 
      <h3><b>${title}</b></h3>
      <p class="project-description">${truncateDescription(description)}</p>
      <div class="status-container">
        <div class="field">
          <p class="bold-label">Status:</p>  
          <p class="value"><span class="visual-status ${fromStatusToColor(
            status
          )}"></span>${status}</p>
        </div>
        <div class="field">
          ${
            path
              ? `<img alt="GitHub last commit" style="width: 150px; margin-left: 40px;" src="https://img.shields.io/github/last-commit/WaCnerDev/MY-FCC-PROJECTS?path=${path}&style=flat&logoSize=auto&label=Last%20Commit%3A&color=%23404268">`
              : ""
          }
        </div>
      </div>  
    </div>
  `;
  card.addEventListener("click", () => {
    window.open(link, "_blank");
  });
  return card;
}

const projects = [
  {
    title: "Survey Form",
    description:
      "A user-friendly form to collect information about your gaming preferences, designed with accessibility and responsiveness in mind.",
    path: "WEB-RESPONSIVE%2fsurvey-form",
    image: "./image/preview_form.webp",
    status: "Completed",
    link: "./WEB-RESPONSIVE/survey-form/survey-form.html",
    category: "responsiveWebDesign",
    lastUpdate: "2024-05-12T14:30:00",
  },
  {
    title: "Technical Documentation",
    description:
      "JavaScript documentation website featuring sections, a navigation menu, and a responsive layout.",
    path: "WEB-RESPONSIVE%2ftecnical-doc",
    image: "./image/preview_technical_doc.webp",
    status: "Completed",
    link: "./WEB-RESPONSIVE/tecnical-doc/tecnical-doc.html",
    category: "responsiveWebDesign",
    lastUpdate: "2024-02-22T09:15:00",
  },
  {
    title: "Landing Page Trombones",
    description:
      "Landing page for trombone sales with video, product section, and intuitive navigation.",
    path: "WEB-RESPONSIVE%2ftrombones-store",
    image: "./image/preview_store_trombones.webp",
    status: "Completed",
    link: "./WEB-RESPONSIVE/trombones-store/trombones-store.html",
    category: "responsiveWebDesign",
    lastUpdate: "2024-11-30T18:45:00",
  },
  {
    title: "Tribute Page",
    description:
      "A tribute page dedicated to Nikola Tesla, highlighting his life, achievements, and legacy.",
    path: "WEB-RESPONSIVE%2ftribute-pages",
    image: "./image/preview_tribute_page.webp",
    status: "Completed",
    link: "./WEB-RESPONSIVE/tribute-pages/tribute-pages.html",
    category: "responsiveWebDesign",
    lastUpdate: "2025-01-10T12:00:00",
  },
  {
    title: "Personal Portfolio",
    description:
      "A portfolio of web development projects, showcasing skills, technologies, and the various projects I have developed.",
    path: "WEB-RESPONSIVE%2fpersonal-portfolio",
    image: "./image/preview_personal_portfolio.webp",
    status: "Development",
    link: "./WEB-RESPONSIVE/personal-portfolio/personal-portfolio.html",
    category: "responsiveWebDesign",
    lastUpdate: "2024-07-05T16:20:00",
  },
  {
    title: "Palindrome Checker",
    description:
      "This website allows users to check if a word or phrase is a palindrome.",
    path: "DYNAMIC-PAGES-JS%2fpalindrome-checker",
    image: "./image/preview_palindrome.webp",
    status: "Completed",
    link: "./DYNAMIC-PAGES-JS/palindrome-checker/palindrome-checker.html",
    category: "dynamicPagesJS",
    lastUpdate: "2024-09-14T10:10:00",
  },
  {
    title: "Number System Converter",
    description:
      "This tool allows you to convert numbers between different number systems quickly and easily, including binary, hexadecimal, octal.",
    path: "DYNAMIC-PAGES-JS%2fnum-system-converter",
    image: "./image/preview_num_system_converter.webp",
    status: "Completed",
    link: "./DYNAMIC-PAGES-JS/num-system-converter/num-system-converter.html",
    category: "dynamicPagesJS",
    lastUpdate: "2024-12-25T08:30:00",
  },
  {
    title: "Phone Number Validator",
    description:
      "Easily check the validity of U.S. phone numbers, no matter how they are formatted.",
    path: "DYNAMIC-PAGES-JS%2fphone-validator",
    image: "./image/preview_phone-validator.webp",
    status: "Completed",
    link: "./DYNAMIC-PAGES-JS/phone-validator/phone-validator.html",
    category: "dynamicPagesJS",
    lastUpdate: "2025-02-01T14:50:00",
  },
  {
    title: "Cash Register",
    description:
      "This cash register app calculates change, displays the remaining cash in the drawer, and handles various transaction scenarios.",
    path: "DYNAMIC-PAGES-JS%2fcash-register",
    image: "./image/preview_cash-register.webp",
    status: "Completed",
    link: "./DYNAMIC-PAGES-JS/cash-register/cash-register.html",
    category: "dynamicPagesJS",
    lastUpdate: "2025-03-08T11:58:00",
  },
  {
    title: "Pokedex from Game Boy",
    description:
      "A Pokedex that simulates the look and feel of a Game Boy. The buttons are functional, and you can search for Pokemon by ID or name.",
    path: "DYNAMIC-PAGES-JS%2fpokedex",
    image: "./image/preview_pokedex.webp",
    status: "Development",
    link: "./DYNAMIC-PAGES-JS/pokedex/pokedex.html",
    category: "dynamicPagesJS",
    lastUpdate: "2025-03-08T11:58:00",
  },
  {
    title: "Random Quote Machine",
    description:
      "A random quote generator that fetches quotes from an API and displays them in a visually appealing way.",
    path: undefined,
    image: "./image/preview_random_quote_machine.webp",
    status: "Completed",
    link: "https://codepen.io/WaCnerDev/pen/wBvVLjq",
    category: "frontendDevLib",
    lastUpdate: "2024-08-20T15:45:00",
  },
  {
    title: "Markdown Previewer",
    description:
      "A Markdown previewer that allows you to write and preview Markdown content in real-time.",
    path: undefined,
    image: "./image/preview_markdown_previewer.webp",
    status: "Completed",
    link: "https://codepen.io/WaCnerDev/pen/bNNGYre",
    category: "frontendDevLib",
    lastUpdate: "2024-10-05T13:30:00",
  },
  {
    title: "Drum Machine",
    description:
      "A drum machine that allows you to play different drum sounds by clicking on buttons or using your keyboard.",
    path: undefined,
    image: "./image/preview_drum_machine.webp",
    status: "Completed",
    link: "https://codepen.io/WaCnerDev/pen/emmpqLM",
    category: "frontendDevLib",
    lastUpdate: "2024-11-15T17:20:00",
  },
  {
    title: "Pomodoro Clock",
    description:
      "A Pomodoro clock that helps you manage your time effectively, with customizable work and break intervals.",
    path: "FRONTEND-DEV-LIB%2fpomodoro-clock",
    image: "./image/preview_pomodoro_clock.webp",
    status: "Completed",
    link: "./FRONTEND-DEV-LIB/pomodoro-clock/pomodoro-clock.html",
    category: "frontendDevLib",
    lastUpdate: "2025-03-08T11:58:00",
  },
  {
    title: "Jquery Calculator",
    description:
      "A simple calculator built with jQuery, allowing basic arithmetic operations.",
    path: "FRONTEND-DEV-LIB%2fjquery-calculator",
    image: "./image/preview_jquery_calculator.webp",
    status: "Completed",
    link: "./FRONTEND-DEV-LIB/jquery-calculator/jquery-calculator.html",
    category: "frontendDevLib",
    lastUpdate: "2025-03-08T11:58:00",
  },
];

projects.forEach((project) => {
  const card = renderCards(
    project.title,
    project.description,
    project.path,
    project.status,
    project.image,
    project.link,
    project.lastUpdate
  );

  if (project.category === "responsiveWebDesign") {
    responsiveWebDesign.appendChild(card);
  } else if (project.category === "dynamicPagesJS") {
    dynamicPagesJS.appendChild(card);
  } else if (project.category === "frontendDevLib") {
    frontendDevLib.appendChild(card);
  }
});

// Actualizar los valores cada segundo
setInterval(updateLastUpdate, 1000);
