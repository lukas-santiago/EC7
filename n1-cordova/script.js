$(async () => {
  loadPokemons()

  $("body").on("click", "#lista-pokemons > div", (event) => {
    location.href = "/n1-cordova/pages/details.html?pokemon=" + event.currentTarget.textContent.trim();
  })
})

let offset = 0;
async function loadPokemons() {
  let pokemons = await getPokemons()

  let pokemonForm = await Promise.all(
    pokemons.map(pokemon => getPokemonForm(pokemon.name))
  )

  pokemonForm.map((form, i) => $("#lista-pokemons").append(`
    <div>
      <img src="${form.sprites.front_default}" alt="">
      <p>${pokemons[i].name}</p>
    </div>
  `))

}

async function getPokemons() {
  let pokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=" + offset)
    .then((res) => res.json())
    .then(async (data) => data.results);

  offset += 10

  return pokemons
}

async function getPokemonForm(pokemonName) {
  let form = await fetch("https://pokeapi.co/api/v2/pokemon-form/" + pokemonName + "/")
    .then((res) => res.json())
    .then((data) => data);

  return form
}

