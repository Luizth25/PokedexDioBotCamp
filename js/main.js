const loadMoreButton = document.getElementById("loadMore");
const pokemonList = document.getElementById("pokemon-list");
let offset = 0;
const limit = 5;

const convertPokemonToHtml = (pokemon) => {
  console.log(pokemon);

  return `<li class='pokemon ${pokemon.type}'>
  <span class="number">##${pokemon.id}</span>
  <span class="name">${pokemon.name}</span>
  <div class="detail">
    <ol class="types">
   ${pokemon.types
     .map((type) => `<li class="type ${type}">${type}</li>`)
     .join(" ")}
    </ol>
    <img
      src=${pokemon.image}
      alt=${pokemon.name}
    />
  </div>
</li>`;
};

const loadMorePokemonItems = (offset, limit) => {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newList = pokemons.map((pokemon) => convertPokemonToHtml(pokemon));
    const newHtml = newList.join(" ");
    pokemonList.innerHTML += newHtml;
  });
};

loadMorePokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  loadMorePokemonItems(offset, limit);
});
