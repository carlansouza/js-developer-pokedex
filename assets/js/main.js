const pokemonsList = document.querySelector('.pokemons');
const loadMoreButton = document.getElementById('loadMoreButton')

const maxPokemons = 151;
const limit = 6;
let offset = 0;



function converPokemonToHTML(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#00${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function renderPokemonsItems(offset, limit) {
    pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
        const newHtml =  pokemons.map((converPokemonToHTML)).join('');
        pokemonsList.innerHTML += newHtml;
    })
    .catch((error) => console.log(error));
}

renderPokemonsItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdPokemonsPage = offset + limit;

    if (qtdPokemonsPage >= maxPokemons) {
        const newLimit =  maxPokemons - offset 
        renderPokemonsItems(offset,  newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        renderPokemonsItems(offset, limit);
    }


    
});







