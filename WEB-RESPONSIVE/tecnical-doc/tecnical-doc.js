const sections = [
  { value: "introduction", title: "Introduction" },
  { value: "what_you_should_already_know", title: "What you should already know" },
  { value: "javascript_and_java", title: "JavaScript and Java" },
  { value: "hello_world", title: "Hello world" },
  { value: "variables", title: "Variables" },
  { value: "declaring_variables", title: "Declaring variables" },
  { value: "variable_scope", title: "Variable scope" },
  { value: "global_variables", title: "Global variables" },
  { value: "constants", title: "Constants" },
  { value: "data_types", title: "Data types" },
  { value: "if_else_statement", title: "if...else statement" },
  { value: "while_statement", title: "while statement" },
  { value: "function_declarations", title: "Function declarations" },
  { value: "reference", title: "Reference" },
];

function toggleNavbar() {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menu-toggle");
  if (navbar.style.display === "none" || navbar.style.display === "") {
    navbar.style.display = "flex";
    menuToggle.textContent = "⨯";
  } else {
    navbar.style.display = "none";
    menuToggle.textContent = "☰";
  }
}

document.getElementById("menu-toggle").addEventListener("click", toggleNavbar);