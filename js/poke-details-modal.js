const modal = document.getElementById("pokemonModal");
const modalContent = document.getElementById("modalPokemonDetails");

// Função para abrir o modal com os detalhes do Pokémon
function openModal(pokemonId) {
  pokeApi.getPokemonSummary(pokemonId).then((pokemon) => {
    modal.className = pokemon.types[0].type.name;

    modalContent.innerHTML = `
    <h2 class="name" >${pokemon.name}</h2>
    <p class="pokemon-id" >ID: ##${pokemon.id}</p>
    <img src="${
      pokemon.sprites.versions["generation-v"]["black-white"].animated
        .front_default
    }" 
    alt="${pokemon.name}" 
    />
    <ol class="types">
        ${pokemon.types
          .map(
            (typeSlot) =>
              `<li class="type-details ${typeSlot.type.name}">${typeSlot.type.name}</li>`
          )
          .join(" ")}
    </ol>
    <span class="separator"></span>
    <ol class="base-status-list">
      ${pokemon.stats
        .map((baseStatus) => {
          return `
              <li class="name">
              ${baseStatus.stat.name}: ${baseStatus.base_stat}
              </li>
            `;
        })
        .join(" ")}
    </ol>
  `;
  });

  modal.showModal(); // Exibindo o modal usando showModal()
}

// Função para fechar o modal
function closeModal() {
  modal.close(); // Fechando o modal usando close()
}
