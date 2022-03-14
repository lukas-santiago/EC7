document.addEventListener("DOMContentLoaded", () => {
    let toggle = document.getElementById('toggle')

    toggle.onclick = event => {
        let nav = document.querySelector('nav')

        nav.classList.contains('active') ?
            nav.classList.remove('active') :
            nav.classList.add('active')


    }
})