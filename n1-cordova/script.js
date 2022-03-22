document.addEventListener("DOMContentLoaded", () => {
  carregarPokemons();
  $("body").on("click", "#lista-pokemons > div", (event) => {
    location.href = "/n1-cordova/pages/details.html?pokemon=" + event.currentTarget.textContent.trim();
  });
});

function carregarMais() {
  carregarPokemons();
}
let offset = 0;
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
  // await lista.forEach(async (pokemon) => {
  //   let image = fetch("https://pokeapi.co/api/v2/pokemon-form/" + pokemon.name + "/")
  //     .then((res) => res.json())
  //     .then((data) => images.push(data));
  // });
  // console.log(images);

  // //   let $pokemons = await ;

  // $("#lista-pokemons").append(
  //   images.map(
  //     (image) => `
  //   <div>
  // 	  <img src="${image.sprites.front_default}" alt="">
  // 	  <p>${pokemon.name}</p>
  //   </div>
  //   `
  //   )
  // );
  offset += 10;
}
