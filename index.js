const responsiveWebDesing = document.querySelector(
  "#responsive-web .project-cards"
);
const dynamicPagesJS = document.querySelector(
  "#dynamic-pages-js .project-cards"
);


function fromStatusToColor(status) {
  if (status ==="Development") {
    return "development";
  } else {
    return "completed";
  } 
}

function renderCards(title, description,status, image) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
  <img class="preview-project" src="${image}" alt="${title}" />
  <div class="info-container"> 
      <h3><b>${title}</b></h3>
      <p>${description}</p>
  </div>
  <div class="status-container">
    <p class="status ${fromStatusToColor(status)}" ">${status}</p>
    <button class="btn-view-project">View Project</button>
  </div>
  `;
  return card;
}



function redirect(link){
  window.open(link, "_blank");
}

function applyEventListeners(link){
  const btnViewProject = document.getElementsByClassName("btn-view-project");
  for (let i = 0; i < btnViewProject.length; i++) {
    btnViewProject[i].addEventListener("click", () => redirect(link));
  }
}

const projects = [
  {
    title: "Survey Form",
    description: "A simple and responsive survey form.",
    image: "./image/preview_form.webp",
    status: "Development",
    link: "./WEB-RESPONSIVE/survey-form/survey-form.html",
    category: "responsiveWebDesing"
  },
  {
    title: "Technical Documentation",
    description: "A technical documentation page with a clean design.",
    image: "./image/preview_technical_doc.webp",
    status: "Completed",
    link: "./WEB-RESPONSIVE/technical-doc/technical-doc.html",
    category: "responsiveWebDesing"
  },
  {
    title: "Landing Page Trombones",
    description: "A landing page for a trombone store.",
    image: "./image/preview_store_trombones.webp",
    status: "Completed",
    link: "./WEB-RESPONSIVE/trombones-store/trombones-store.html",
    category: "responsiveWebDesing"
  },
  {
    title: "Tribute Page",
    description: "A tribute page to a historical figure.",
    image: "./image/preview_tribute_page.webp",
    status: "Development",
    link: "./WEB-RESPONSIVE/tribute-page/tribute-page.html",
    category: "responsiveWebDesing"
  },
  {
    title: "Personal Portfolio",
    description: "A personal portfolio page.",
    image: "./image/preview_personal_portfolio.webp",
    status: "Development",
    link: "./WEB-RESPONSIVE/personal-portfolio/personal-portfolio.html",
    category: "responsiveWebDesing"
  },
  {
    title: "Palindrome Checker",
    description: "Enter a word and it will tell you if it is a palindrome or not.",
    image: "./image/preview_palindrome.webp",
    status: "Completed",
    link: "./DYNAMIC-PAGES-JS/palindrome-checker/palindrome-checker.html",
    category: "dynamicPagesJS"
  },
  {
    title: "Number Converter",
    description: "Convert natural numbers to Roman numerals.",
    image: "./image/preview_num-to-roman.webp",
    status: "Development",
    link: "./DYNAMIC-PAGES-JS/num-to-roman/num-to-roman.html",
    category: "dynamicPagesJS"
  },
  {
    title: "Phone Number Validator",
    description: "Verify if a phone number is valid.",
    image: "./image/preview_phone-validator.webp",
    status: "Development",
    link: "./DYNAMIC-PAGES-JS/phone-validator/phone-validator.html",
    category: "dynamicPagesJS"
  },
  {
    title: "Cash Register",
    description: "A cash register that tells you how to return the change.",
    image: "./image/preview_cash-register.webp",
    status: "Completed",
    link: "./DYNAMIC-PAGES-JS/cash-register/cash-register.html",
    category: "dynamicPagesJS"
  }
];

projects.forEach(project => {
  const card = renderCards(project.title, project.description, project.status, project.image);
  applyEventListeners(project.link);
  if (project.category === "responsiveWebDesing") {
    responsiveWebDesing.appendChild(card);
  } else if (project.category === "dynamicPagesJS") {
    dynamicPagesJS.appendChild(card);
  }
});
