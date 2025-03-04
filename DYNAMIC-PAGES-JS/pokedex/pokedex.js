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

const getPokemon = async (id) => {
  try {
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${id}`
    );
    const pokemon = await response.json();
    return pokemon;
  } catch (error) {
    console.error(error);
  }
};

const showPokemon = (pokemon) => {
  const { name, id, weight, height,types, stats, sprites } = pokemon;
  pokemonName.innerText = name;
  pokemonId.innerText= id.toString().padStart(4, '0');
  pokemonImage.src = sprites.front_default;
  pokemonWeight.innerText = weight;
  pokemonHeight.innerText = height;
  pokemonHp.innerText = stats[0].base_stat;
  pokemonAttack.innerText = stats[1].base_stat;
  pokemonDefense.innerText = stats[2].base_stat;
  pokemonSpecialAttack.innerText = stats[3].base_stat;
  pokemonSpecialDefense.innerText = stats[4].base_stat;
  pokemonSpeed.innerText = stats[5].base_stat;
  pokemonTypes.innerHTML += types.map((type) => `<span class="${type.type.name} type-tag">${type.type.name}</span>`).join(" ");
};

window.onload = async () => {
  showPokemon(await getPokemon(06));
};
