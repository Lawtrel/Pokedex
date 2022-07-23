const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btm-prev');
const buttonNext = document.querySelector('.btm-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);

    pokemonName.innerHTML = 'Carregando.....';
    pokemonNumber.innerHTML = '';

    if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    input.value ='';
    searchPokemon = data.id;
    }
    else {
        pokemonImg.innerHTML = renderPokemon(201);
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon-=1;
        renderPokemon(searchPokemon);
    }

});

buttonNext.addEventListener('click', () => {
    searchPokemon+=1;
    renderPokemon(searchPokemon);

});

renderPokemon(searchPokemon);