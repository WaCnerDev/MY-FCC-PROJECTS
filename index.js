const responsiveWebDesing = document.querySelector(
  "#responsive-web .project-cards"
);
const dynamicPagesJS = document.querySelector(
  "#dynamic-pages-js .project-cards"
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

  const diffInMilliseconds = currentDate.getTime() - pastDate.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else {
    return "a few seconds ago";
  }
}

function truncateDescription(description) {
  const maxLength = window.innerWidth <= 768 ? 200 : 150;
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
}

function renderCards(title, description, status, image, link, lastUpdate) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img class="preview-project" src="${image}" alt="${title}" />
    <div class="info-container"> 
      <h3><b>${title}</b></h3>
      <p class="project-description">${truncateDescription(description)}</p>
      <div class="row">
        <div class="field">
          <p class="bold-label">Status:</p>  
          <p class="value"><span class="visual-status ${fromStatusToColor(status)}"></span>${status}</p>
        </div>
        <div class="field">
          <p class="bold-label">Last Update:</p>
          <p class="value">${formatDate(lastUpdate)}</p>
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
    description: "A user-friendly form to collect information about your gaming preferences, designed with accessibility and responsiveness in mind.",
    image: "./image/preview_form.webp",
    status: "Completed",
    link: "./WEB-RESPONSIVE/survey-form/survey-form.html",
    category: "responsiveWebDesing",
    lastUpdate: "2024-05-12T14:30:00",
  },
  {
    title: "Technical Documentation",
    description: "JavaScript documentation website featuring sections, a navigation menu, and a responsive layout.",
    image: "./image/preview_technical_doc.webp",
    status: "Completed",
    link: "./WEB-RESPONSIVE/tecnical-doc/tecnical-doc.html",
    category: "responsiveWebDesing",
    lastUpdate: "2024-08-22T09:15:00",
  },
  {
    title: "Landing Page Trombones",
    description: "Landing page for trombone sales with video, product section, and intuitive navigation.",
    image: "./image/preview_store_trombones.webp",
    status: "Completed",
    link: "./WEB-RESPONSIVE/trombones-store/trombones-store.html",
    category: "responsiveWebDesing",
    lastUpdate: "2024-11-30T18:45:00",
  },
  {
    title: "Tribute Page",
    description: "A tribute page dedicated to Nikola Tesla, highlighting his life, achievements, and legacy.",
    image: "./image/preview_tribute_page.webp",
    status: "Development",
    link: "./WEB-RESPONSIVE/tribute-pages/tribute-pages.html",
    category: "responsiveWebDesing",
    lastUpdate: "2025-01-10T12:00:00",
  },
  {
    title: "Personal Portfolio",
    description: "A portfolio of web development projects, showcasing skills, technologies, and the various projects I have developed.",
    image: "./image/preview_personal_portfolio.webp",
    status: "Development",
    link: "./WEB-RESPONSIVE/personal-portafolio/personal-portafolio.html",
    category: "responsiveWebDesing",
    lastUpdate: "2024-07-05T16:20:00",
  },
  {
    title: "Palindrome Checker",
    description:
      "This website allows users to check if a word or phrase is a palindrome.",
    image: "./image/preview_palindrome.webp",
    status: "Development",
    link: "./DYNAMIC-PAGES-JS/palindrome-checker/palindrome-checker.html",
    category: "dynamicPagesJS",
    lastUpdate: "2024-09-14T10:10:00",
  },
  {
    title: "Number Converter",
    description: "This tool allows you to convert numbers between different number systems quickly and easily, including binary, hexadecimal, octal.",
    image: "./image/preview_num-to-roman.webp",
    status: "Development",
    link: "./DYNAMIC-PAGES-JS/num-to-roman/num-to-roman.html",
    category: "dynamicPagesJS",
    lastUpdate: "2024-12-25T08:30:00",
  },
  {
    title: "Phone Number Validator",
    description: "Easily check the validity of U.S. phone numbers, no matter how they are formatted.",
    image: "./image/preview_phone-validator.webp",
    status: "Development",
    link: "./DYNAMIC-PAGES-JS/phone-validator/phone-validator.html",
    category: "dynamicPagesJS",
    lastUpdate: "2025-02-01T14:50:00",
  },
  {
    title: "Cash Register",
    description: "This cash register app calculates change, displays the remaining cash in the drawer, and handles various transaction scenarios.",
    image: "./image/preview_cash-register.webp",
    status: "Completed",
    link: "./DYNAMIC-PAGES-JS/cash-register/cash-register.html",
    category: "dynamicPagesJS",
    lastUpdate: "2024-10-20T11:40:00",
  },
];

projects.forEach((project) => {
  const card = renderCards(
    project.title,
    project.description,
    project.status,
    project.image,
    project.link,
    project.lastUpdate
  );
  if (project.category === "responsiveWebDesing") {
    responsiveWebDesing.appendChild(card);
  } else if (project.category === "dynamicPagesJS") {
    dynamicPagesJS.appendChild(card);
  }
});
