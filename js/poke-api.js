const pokeApi = {};

const convertPokeApiDetailToPokemon = (pokeDetail) => {
  const pokemon = new Pokemon();
  pokemon.id = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;

  pokemon.image =
    pokeDetail.sprites.versions["generation-v"][
      "black-white"
    ].animated.front_default;

  return pokemon;
};

pokeApi.getPokemonsDetails = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemonSummary = (pokemonId) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

pokeApi.getPokemons = (offset = 0, limit = 30) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((responseBody) => responseBody.results)
    .then((pokemons) =>
      pokemons.map((pokemon) => pokeApi.getPokemonsDetails(pokemon))
    )
    .then((detailsRequest) => Promise.all(detailsRequest))
    .then((pokemonsDetails) => pokemonsDetails);
};
