document.addEventListener("DOMContentLoaded", () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
        .then(res => res.json())
        .then(data => {
            let lista = data.results
            let $pokemons = lista.map(async pokemon => {
                let image = await fetch('https://pokeapi.co/api/v2/pokemon-form/' + pokemon.name + '/')
                    .then(res => res.json())
                    .then(data => data)


                $('#lista-pokemons').append(`
                    <div>
                        <img src="${image.sprites.front_default}" alt="">
                        <p>${pokemon.name}</p>
                    </div>
                `)
            })


        })


    $('body').on('click', '#lista-pokemons > div', event => {
        location.href = 'details.html?pokemon=' + event.currentTarget.textContent.trim()
    })


    // let toggle = document.getElementById('toggle')

    // toggle.onclick = event => {
    //     let nav = document.querySelector('nav')

    //     nav.classList.contains('active') ?
    //         nav.classList.remove('active') :
    //         nav.classList.add('active')


    // }
})