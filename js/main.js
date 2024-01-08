const loadMoreButton = document.getElementById("load-more");
const pokemonList = document.getElementById("pokemon-list");

const limit = 5;
const maxRecords = 151;

let offset = 0;

// Função para converter Pokémon em elementos HTML
const convertPokemonToHtml = (pokemon) => {
  return `<li class='pokemon ${pokemon.type}' onclick="openModal(${
    pokemon.id
  })">
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

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToHtml).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
