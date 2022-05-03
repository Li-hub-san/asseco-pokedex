"use strict";

const pokemonListUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";
const cardContainer = document.querySelector(".card-container");

const getJson = function (url, errMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errMsg} ${response.status}`);

    return response.json();
  });
};

getJson(pokemonListUrl)
  .then((resp) => {
    const pokemonList = resp["results"];
    console.log("list", pokemonList);

    // pokemonList.forEach((el) => {
    //   console.log(el);
    //   cardContainer.insertAdjacentHTML(
    //     "beforeend",
    //     `<img src=${el.image}><p>${el.name}</p>`
    //   );
    // });

    const {
      results: [{ name: name, url: image }],
    } = resp;

    console.log(name);
    console.log(image);

    return fetch(image);
  })
  .then((response) => response.json())
  .then((resp) => {
    console.log("trying name", resp);

    const { sprites, name } = resp;

    cardContainer.insertAdjacentHTML(
      "afterbegin",
      `<p class="card-name">${name}</p>
          <img alt="pokemon ${name}" class="card-image" src=${sprites["front_default"]}>`
    );
  });
