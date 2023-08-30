const Pokemon = function (data) {
  this.name = data.name;
  this.type = data.types[0].type.name;
  this.image = data.sprites.front_default || '';
  this.abilities = data.abilities;
  this.height = data.height;
  this.weight = data.weight;
  this.stats = data.stats;
  this.id = data.id;
  this.description = data.description;
};

const contenedorPokemon = document.getElementById('contenedor-pokemon');
const pokemonData = [];

const dibujarPokedex = (function () {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=150';;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const pokemons = data.results;
      pokemons.forEach(pokemon => {
        fetch(pokemon.url)
          .then(response => response.json())
          .then(data => {
            const pokemon = new Pokemon(data);
            pokemonData.push(pokemon);
            crearTarjetaPokemon(pokemon);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      });
    })
})

const getColorType = function (type) {

  const typeColor = {
  'grass': '#78C850',
  'poison': '#A040A0',
  'fire': '#F08030',
  'flying': '#A890F0',
  'water': '#6890F0',
  'bug': '#A8B820',
  'normal': '#A8A878',
  'electric': '#F8D030',
  'ground': '#E0C068',
  'fairy': '#EE99AC',
  'fighting': '#C03028',
  'psychic': '#F85888',
  'rock': '#B8A038',
  'steel': '#B8B8D0',
  'ice': '#98D8D8',
  'ghost': '#705898',
  'dragon': '#7038F8',
  'dark': '#705848'
  };
  return typeColor[type];
}

const crearTarjetaPokemon = function (pokemon) {

  const tarjeta = document.createElement('div');
  tarjeta.classList.add('card','col-3','m-2','row','p-2','shadow',);

  const nombre = document.createElement('h2');
  nombre.classList.add('card-title');
  nombre.textContent = pokemon.name;

  const image = document.createElement('img');
  image.classList.add('card-img-top','img-fluid');
  image.src = pokemon.image;

  tarjeta.appendChild(image);
  tarjeta.appendChild(nombre);

  image.style.backgroundColor = getColorType(pokemon.type);

  tarjeta.addEventListener('click', () => {
    mostrarModal(pokemon);
  });

  contenedorPokemon.appendChild(tarjeta);
}

const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('input', () => {
  const searchTerm = searchBar.value.toLowerCase();
  const filteredPokemons = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
  
  updatePokedex(filteredPokemons);
});

updatePokedex(originalPokemons);

function updatePokedex(filteredPokemons) {
  contenedorPokemon.innerHTML = ''; // Limpiamos el contenedor
  
  filteredPokemons.forEach(pokemon => {
    crearTarjetaPokemon(pokemon);
  });
}

const mostrarModal = function (pokemon) {
  const modal = document.getElementById('exampleModal');
  const modalTitle = document.getElementById('exampleModalLabel');
  const imgModal = document.getElementById('imgModal');
  const pokeModalName = document.getElementById('cardPokeModal');
  const descriptionModal = document.getElementById('descriptionModal');
  const typeModal = document.getElementById('tipo');
  const heightModal = document.getElementById('peso');
  const weightModal = document.getElementById('talla');

  modalTitle.textContent = ("Pokedex");
  imgModal.src = pokemon.image;
  imgModal.style.backgroundColor = getColorType(pokemon.type);
  pokeModalName.textContent = pokemon.name;
  descriptionModal.textContent = pokemon.description;
  typeModal.textContent = ('Tipo: ' + pokemon.type);
  heightModal.textContent = ('Altura: ' + pokemon.height)
  weightModal.textContent = ('Peso: ' + pokemon.weight)

  $('#exampleModal').modal('show');
};

dibujarPokedex();


