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

// Define una función para crear la tarjeta de Pokémon
const crearTarjetaPokemon = function (pokemon) {
  const tarjeta = document.createElement('div');
  tarjeta.classList.add('card', 'col-3', 'm-2', 'row', 'p-2', 'shadow');

  const nombre = document.createElement('h2');
  nombre.classList.add('card-title');
  nombre.textContent = pokemon.name;

  const image = document.createElement('img');
  image.classList.add('card-img-top', 'img-fluid');
  image.src = pokemon.image;

  tarjeta.appendChild(image);
  tarjeta.appendChild(nombre);

  image.style.backgroundColor = getColorType(pokemon.type);

  tarjeta.addEventListener('click', () => {
    mostrarModal(pokemon);
  });

  contenedorPokemon.appendChild(tarjeta);
};

// Define una función para mostrar los resultados de búsqueda
const mostrarResultados = function (resultados) {
  contenedorPokemon.innerHTML = ''; // Limpia el contenedor

  if (resultados.length === 0) {
    const mensaje = document.createElement('p');
    mensaje.textContent = 'No se encontraron resultados.';
    contenedorPokemon.appendChild(mensaje);
  } else {
    resultados.forEach((pokemon) => {
      crearTarjetaPokemon(pokemon);
    });
  }
};

// Función para buscar Pokémon
const buscarPokemon = function (busqueda) {
  // Si la cadena de búsqueda está vacía, mostrar todos los Pokémon
  if (busqueda === '') {
    mostrarResultados(pokemonData);
  } else {
    // Filtra los Pokémon según el término de búsqueda (nombre o tipo)
    const resultados = pokemonData.filter((pokemon) => {
      const nombre = pokemon.name.toLowerCase();
      const tipo = pokemon.type.toLowerCase();
      return nombre.includes(busqueda) || tipo.includes(busqueda);
    });

    // Llama a una función para mostrar los resultados
    mostrarResultados(resultados);
  }
};

// Agrega un evento al botón de búsqueda
document.getElementById('searchButton').addEventListener('click', function () {
  const busqueda = document.getElementById('searchBar').value.toLowerCase();
  buscarPokemon(busqueda);
});

// Limpia el campo de búsqueda cuando se borra la búsqueda
document.getElementById('searchBar').addEventListener('input', function () {
  const busqueda = document.getElementById('searchBar').value.toLowerCase();
  buscarPokemon(busqueda);
  if (!busqueda) {
    mostrarResultados(pokemonData);
  }
});

// Función para limpiar la pantalla y reiniciar
const reiniciarPokedex = function () {
  contenedorPokemon.innerHTML = ''; // Limpia el contenedor de Pokémon
  document.getElementById('searchBar').value = ''; // Limpia el campo de búsqueda
  mostrarResultados(pokemonData); // Muestra todos los Pokémon
};

// Agrega un evento al enlace "Pokedex" en la barra de navegación
document.querySelector('.navbar-brand').addEventListener('click', reiniciarPokedex);


// Obtén la referencia al botón de búsqueda y la barra de búsqueda
const searchButton = document.getElementById('searchButton');
const searchBar = document.getElementById('searchBar');

// Manejar la búsqueda al hacer clic en el botón
searchButton.addEventListener('click', () => {
  const busqueda = searchBar.value.trim().toLowerCase();
  buscarPokemon(busqueda);
});

// Manejar la búsqueda al presionar Enter en la barra de búsqueda
searchBar.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const busqueda = searchBar.value.trim().toLowerCase();
    buscarPokemon(busqueda);
  }
});



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


