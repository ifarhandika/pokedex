const pokemonName = document.getElementById("pokemon-name")
const pokemonModal = document.getElementById("pokemon-modal")

// const colors = {
// 	fire: '#FDDFDF',
// 	grass: '#DEFDE0',
// 	electric: '#FCF7DE',
// 	water: '#DEF3FD',
// 	ground: '#f4e7da',
// 	rock: '#d5d5d4',
// 	fairy: '#fceaff',
// 	poison: '#98d7a5',
// 	bug: '#f8d5a3',
// 	dragon: '#97b3e6',
// 	psychic: '#eaeda1',
// 	flying: '#F5F5F5',
// 	fighting: '#E6E0D4',
// 	normal: '#F5F5F5'
// }
// const main_types = Object.keys(colors);

const fetchPokemon = async () => {
    const promises = []
    for (i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`
        promises.push(fetch(url).then((res) => res.json()))
    }
    Promise.all(promises).then((result) => {
        const pokemonData = result.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            types: data.types[0].type.name,
            //about
            height: data.height,
            weight: data.weight,
            base_exp: data.base_experience,
            poke_type: data.types.map(type => type.type.name).join(', '),
            //stats
            hp: data.stats[0].stat.name,
            hp_stats: data.stats[0].base_stat,
            attack: data.stats[1].stat.name,
            attack_stats: data.stats[1].base_stat,
            defense: data.stats[2].stat.name,
            defense_stats: data.stats[2].base_stat,
            special_attack: data.stats[3].stat.name,
            special_attack_stats: data.stats[3].base_stat,
            special_defense: data.stats[4].stat.name,
            special_defense_stats: data.stats[4].base_stat,
            speed: data.stats[5].stat.name,
            speed_stats: data.stats[5].base_stat,

            abilities: data.abilities[0].ability.name,
        }))
        displayPokemon(pokemonData)
        modalDisplayPokemon(pokemonData)
    })
}

const displayPokemon = (pokemonData) => {

    const pokemonHTML = pokemonData.map(pokemon => `
    <li class="card">
        <img src='https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png'/>
        <h3>${pokemon.name}</h3>
        <p>${pokemon.types}</p>
        <button class="openModalBtn" data-modal='modal${pokemon.id}'>See more</button>
    </li>
    `).join('')

    pokemonName.innerHTML = pokemonHTML
}

const modalDisplayPokemon = (pokemonData) => {
    const modalPokemonHTML = pokemonData.map(pokemon => `
    <div id="modal${pokemon.id}" class="modal">
        <div class="modal-card">
            <div class="modal-header">
                <button class="closeModalBtn">&times</button>
            </div>
            <div class="modal-content">
                <div>
                    <h3>${pokemon.name}</h3>
                    <p>${pokemon.types}</p>
                </div>
                <span>#${pokemon.id}</span>
                <img src='https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png'/>
                <ul class="tab-menu">
                    <li data-tab-target="#about" class="tab active">About</li>
                    <li data-tab-target="#stats" class="tab">Stats</li>
                    <li data-tab-target="#abilities" class="tab">Abilities</li>
                </ul>
                <div class="tab-content">
                    <div id="about" class="active" data-tab-content>
                        <p>Height: ${pokemon.height}</p>
                        <p>Weight: ${pokemon.weight}</p>
                        <p>Base Exp.: ${pokemon.base_exp}</p>
                        <p>Type: ${pokemon.poke_type}</p>
                    </div>
                    <div id="stats" data-tab-content>
                        <p>${pokemon.hp}: ${pokemon.hp_stats}</p>
                        <p>${pokemon.attack}: ${pokemon.attack_stats}</p>
                        <p>${pokemon.defense}: ${pokemon.defense_stats}</p>
                        <p>${pokemon.special_attack}: ${pokemon.special_attack_stats}</p>
                        <p>${pokemon.special_defense}: ${pokemon.special_defense_stats}</p>
                        <p>${pokemon.speed}: ${pokemon.speed_stats}</p>
                    </div>
                    <div id="abilities" data-tab-content>
                        <p>Abilities: ${pokemon.abilities}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `).join(' ')
    pokemonModal.innerHTML = modalPokemonHTML

    modalBtn()
    tabContent()
}

const modalBtn = () => {
    const openModalBtn = document.querySelectorAll('.openModalBtn')
    const closeModalBtn = document.querySelectorAll('.closeModalBtn')

    openModalBtn.forEach(openBtn => {
        openBtn.addEventListener('click', () => {
            const modal = openBtn.getAttribute('data-modal')

            document.getElementById(modal).style.display = 'block'
        })
    })

    closeModalBtn.forEach(closeBtn => [
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal')
            modal.style.display = "none"
        })
    ])

    window.onclick = (e) => {
        if(e.target.className === 'modal'){
            e.target.style.display = "none"
        }
    }
}

const tabContent = () => {
    const tabs = document.querySelectorAll('[data-tab-target]')
    const tabContents = document.querySelectorAll('[data-tab-content]')

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targets = document.querySelectorAll(tab.dataset.tabTarget)
            tabContents.forEach(tabContent => {
                tabContent.classList.remove('active')
            })
            
            
            tabs.forEach(tab => {
                tab.classList.remove('active')
            })
            tab.classList.add('active')
            targets.forEach(target => {
                target.classList.add('active')
            })

        })
    })
}

fetchPokemon()
