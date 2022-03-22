document.addEventListener("DOMContentLoaded", async () => {
  // carregarPokemons();
  let pokemons = await getPokemons()

  let pokemonImages = await Promise.all(
    pokemons.map(pokemon => getPokemonForm(pokemon.name))
  )



  $("body").on("click", "#lista-pokemons > div", (event) => {
    location.href = "/n1-cordova/pages/details.html?pokemon=" + event.currentTarget.textContent.trim();
  });
});

function carregarMais() {
  carregarPokemons();
}
async function carregarPokemons() {
  let lista = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=" + offset)
    .then((res) => res.json())
    .then(async (data) => data.results);

  let images = [];
  let $pokemons = lista.map(async (pokemon) => {
    let image = await fetch("https://pokeapi.co/api/v2/pokemon-form/" + pokemon.name + "/")
      .then((res) => res.json())
      .then((data) => data);

    $("#lista-pokemons").append(`
    <div>
    <img src="${image.sprites.front_default}" alt="">
    <p>${pokemon.name}</p>
    </div>
    `);
  });
  offset += 10;
}

let offset = 0;
async function getPokemons() {
  let pokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=" + offset)
    .then((res) => res.json())
    .then(async (data) => data.results);

  offset += 10

  return pokemons
}

async function getPokemonForm(pokemonName) {
  let form = await fetch("https://pokeapi.co/api/v2/pokemon-form/" + pokemon.name + "/")
    .then((res) => res.json())
    .then((data) => data);

  return form
}

