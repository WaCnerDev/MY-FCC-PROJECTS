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
let scrollInterval;

const listPokemons = async () => {
  try {
    const response = await fetch(
      "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
    );
    const pokemons = await response.json();
    return pokemons;
  } catch (error) {
    console.error(error);
  }
};

const getPokemon = async (idOrName) => {
  try {
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${idOrName}`
    );
    const pokemon = await response.json();
    return pokemon;
  } catch (error) {
    console.error(error);
  }
};

const handledSumit = async (event) => {
  event.preventDefault();
  const inputValue = inputSearch.value;
  if (inputValue === "") return;
  const pokemonResult = await getPokemon(inputValue);
  pokemonResult ? showPokemon(pokemonResult) : alert("Pokémon not found");
};



const showPokemon = (pokemon) => {
  const { name, id, weight, height, types, stats, sprites } = pokemon;
  pokemonNameId.innerHTML = `<spam id="pokemon-name">${name}</spam> <span id="pokemon-id">No.${id
    .toString()
    .padStart(4, "0")}</span>`;
  pokemonImage.src = sprites.front_default;
  pokemonWeight.innerText = weight;
  pokemonHeight.innerText = height;
  pokemonHp.innerText = stats[0].base_stat;
  pokemonAttack.innerText = stats[1].base_stat;
  pokemonDefense.innerText = stats[2].base_stat;
  pokemonSpecialAttack.innerText = stats[3].base_stat;
  pokemonSpecialDefense.innerText = stats[4].base_stat;
  pokemonSpeed.innerText = stats[5].base_stat;
  pokemonTypes.innerHTML = "";
  pokemonTypes.style.width = types.length === 1 ? "140px" : "auto";
  pokemonTypes.innerHTML += types
    .map(
      (type) =>
        `<span class="${type.type.name} type-tag">${type.type.name}</span>`
    )
    .join(" ");
};

window.onload = async () => {
  const randomId = Math.floor(Math.random() * 898);
  showPokemon(await getPokemon(randomId));
};

formSearch.addEventListener("submit", handledSumit);
