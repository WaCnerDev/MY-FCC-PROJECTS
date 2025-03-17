const pokemonNameId = document.getElementById("pokemon-name-id");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonImage = document.getElementById("pokemon-image");
const pokemonTypes = document.getElementById("types");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpeed = document.getElementById("speed");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const formSearch = document.getElementById("search-form");
const inputSearch = document.getElementById("search-input");
const navigateLeft = document.getElementById("navigate-left");
const navigateRight = document.getElementById("navigate-right");
const navigateDown = document.getElementById("navigate-down");
const navigateUp = document.getElementById("navigate-up");
const btnUp = document.getElementById("up");
const btnDown = document.getElementById("down");
const btnLeft = document.getElementById("left");
const btnRight = document.getElementById("right");
const infoBase = document.getElementById("info-base");
const infoExtra = document.getElementById("info-extra");
const infoExtra1 = document.getElementById("pag1");
const infoExtra2 = document.getElementById("pag2");
let idPokemon = localStorage.getItem("idPokemon")
  ? parseInt(localStorage.getItem("idPokemon"))
  : Math.floor(Math.random() * 898);
const originalStylesPokemonNameId = pokemonNameId.style.cssText;
let scrollInterval;
let stage = 0;

const maxStats = {
  hp: 255, // Valor máximo común para HP
  attack: 190, // Valor máximo común para Ataque
  defense: 230, // Valor máximo común para Defensa
  "special-attack": 194, // Valor máximo común para Ataque Especial
  "special-defense": 230, // Valor máximo común para Defensa Especial
  speed: 180, // Valor máximo común para Velocidad
};

const getPokemon = async (idOrName) => {
  try {
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${idOrName}`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const stageController = () => {
  switch (stage) {
    case 0:
      inputSearch.disabled = false;
      inputSearch.focus();
      infoBase.style.display = "flex";
      infoExtra.style.display = "none";
      navigateRight.style.display = "none";
      navigateLeft.style.display = "none";
      navigateDown.style.display = "block";
      navigateUp.style.display = "none";
      break;
    case 1:
      inputSearch.disabled = true;
      inputSearch.blur();
      infoBase.style.display = "flex";
      infoExtra.style.display = "none";
      navigateRight.style.display = "block";
      navigateLeft.style.display = "block";
      navigateDown.style.display = "block";
      navigateUp.style.display = "none";
      break;
    case 2:
      navigateRight.style.display = "none";
      navigateLeft.style.display = "none";
      navigateUp.style.display = "block";
      navigateDown.style.display = "block";
      infoBase.style.display = "none";
      infoExtra.style.display = "flex";
      infoExtra1.style.display = "block";
      infoExtra2.style.display = "none";
      break;
    case 3:
      infoExtra1.style.display = "none";
      infoExtra2.style.display = "block";
      break;
    default:
      console.error("Invalid stage:", stage);
      break;
  }
};

const handbleChangeInput = async () => {
  const inputValue = inputSearch.value.toLowerCase().trim();
  if (inputValue === "") return;
  const pokemonResult = await getPokemon(inputValue);
  pokemonResult ? (idPokemon = pokemonResult.id) : (idPokemon = 0);
  localStorage.setItem("idPokemon", idPokemon);
  showPokemon(pokemonResult);
};

const scrollText = () => {
  let scrollPosition = 0;
  const textWidth = pokemonNameId.offsetWidth + 16;
  const containerWidth = pokemonNameId.parentElement.offsetWidth;
  scrollInterval = setInterval(() => {
    scrollPosition -= 15;
    pokemonNameId.style.transform = `translateX(${scrollPosition}px)`;
    if (-scrollPosition > textWidth) {
      pokemonNameId.style.transform = `translateX(${containerWidth - 80}px)`;
      scrollPosition = containerWidth - 80;
    }
  }, 200);
};

const showPokemon = (pokemon = null) => {
  if (scrollInterval) clearInterval(scrollInterval);
  pokemonNameId.style.cssText = originalStylesPokemonNameId;
  if (!pokemon) {
    displayPokemonNotFound();
    return;
  }

  const { name, id, weight, height, types, stats, sprites } = pokemon;
  if (name.length > 8) {
    pokemonNameId.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      pokemonNameId.innerHTML += `<spam id="pokemon-name">${
        name + "  "
      } <span id="pokemon-id">No.${id.toString().padStart(4, "0")}</span>
        </spam> `;
    }
    pokemonNameId.style.gap = "60px";
    scrollText();
  } else {
    pokemonNameId.innerHTML = `<spam id="pokemon-name">${name}</spam> <span id="pokemon-id">No.${id
      .toString()
      .padStart(4, "0")}</span>`;
    pokemonNameId.style.gap = "10px";
  }
  pokemonImage.src = sprites.front_default;
  pokemonWeight.innerText = weight;
  pokemonHeight.innerText = height;
  pokemonHp.innerText = stats[0].base_stat;
  pokemonAttack.innerText = stats[1].base_stat;
  pokemonDefense.innerText = stats[2].base_stat;
  pokemonSpecialAttack.innerText = stats[3].base_stat;
  pokemonSpecialDefense.innerText = stats[4].base_stat;
  pokemonSpeed.innerText = stats[5].base_stat;
  fillPorcentBar(stats);
  pokemonTypes.innerHTML = "";
  pokemonTypes.style.width = types.length === 1 ? "140px" : "auto";
  pokemonTypes.innerHTML += types
    .map(
      (type) =>
        `<span class="${type.type.name} type-tag">${type.type.name}</span>`
    )
    .join(" ");
};

const displayPokemonNotFound = () => {
  pokemonTypes.innerHTML = "";
  pokemonNameId.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    pokemonNameId.innerHTML += `<spam id="pokemon-name">POKEMON NOT FOUND <span id="pokemon-id">No.0000</span>
    </spam> `;
  }
  pokemonNameId.style.gap = "60px";
  pokemonImage.src = "./img/whoIsPokemon.webp";
  pokemonWeight.innerText = "??";
  pokemonHeight.innerText = "??";
  pokemonHp.innerText = "??";
  pokemonAttack.innerText = "??";
  pokemonDefense.innerText = "????";
  pokemonSpecialAttack.innerText = "????";
  pokemonSpecialDefense.innerText = "????";
  pokemonSpeed.innerText = "??";
  pokemonTypes.innerHTML = `<span class="unknown type-tag">UNKNOWN</span>`;
  scrollText();
};

const fillPorcentBar = (stats) => {
  for (const stat of stats) {
    const bar = document.getElementById(`${stat.stat.name}-bar`);
    const value = stat.base_stat;
    const maxValue = maxStats[stat.stat.name];
    const percentage = ((value / maxValue) * 100).toFixed(2);
    bar.style.width = `${percentage}%`;
  }
};

inputSearch.addEventListener("input", async () => {
  await handbleChangeInput();
});

btnUp.addEventListener("click", () => {
  stage = stage > 0 ? stage - 1 : stage;
  stageController(stage);
});

btnDown.addEventListener("click", () => {
  stage = stage < 3 ? stage + 1 : stage;
  stageController(stage);
});

btnLeft.addEventListener("click", async () => {
  idPokemon = idPokemon > 1 ? idPokemon - 1 : idPokemon;
  localStorage.setItem("idPokemon", idPokemon);
  showPokemon(await getPokemon(idPokemon));
});

btnRight.addEventListener("click", async () => {
  idPokemon = idPokemon < 898 ? idPokemon + 1 : idPokemon;
  localStorage.setItem("idPokemon", idPokemon);
  showPokemon(await getPokemon(idPokemon));
});

window.onload = async () => {
  showPokemon(await getPokemon(idPokemon));
  stageController(0);
};
