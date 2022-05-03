"use strict";

const pokemonListUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";
const cardContainer = document.querySelector(".card-container");
const inputEl = document.getElementById("search");
let pokemons = [];

inputEl.addEventListener("keyup", (ev) => {
  const search = ev.target.value;
  console.log(search);

  console.log(pokemons);
  let filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.includes(search)
  );
  console.log(filteredPokemons);
  cardContainer.innerHTML = "";
  renderCards(filteredPokemons);
});

const getJson = function (url, errMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errMsg} ${response.status}`);

    return response.json();
  });
};

getJson(pokemonListUrl).then(async (resp) => {
  const pokemonUrls = resp.results.map((pokemon) => pokemon.url);
  console.log(pokemonUrls);

  let promises = pokemonUrls.map((url) => getJson(url));

  pokemons = await Promise.all(promises);
  console.log(pokemons);

  renderCards(pokemons);
});

const renderCards = function (pokemons) {
  pokemons.forEach((pokemon) => {
    cardContainer.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="card">
        <p class="card-name">${pokemon.name}</p>
        <img alt="pokemon ${pokemon.name}" class="card-image" src=${pokemon.sprites.front_default}>
      </div>`
    );
  });
};
