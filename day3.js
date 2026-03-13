"use strict";

console.log("Hello Everyone");

/*TODO
State
The current Pokemon that is being displayed (by it's ID)
*/

//TODO Setup global variables for getting elements by ID
const output = document.querySelector("#output");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");


function render(pokemon){
    const name = document.createElement("p");
    const id = document.createElement("p");
    const img = document.createElement("img");

    id.textContent = "Id: " + pokemon.id
    name.textContent = "Name: " + pokemon.name

    if(pokemon.sprites.front_default){
    img.src = pokemon.sprites.front_default
    } else {
    img.src = "https://placehold.co/100";
    } 
    img.alt = pokemon.name

    output.textContent = ""
    output.appendChild(id);
    output.appendChild(name);
    output.appendChild(img);
  }

//TODO Get data from Pokemon API
async function getPokemon(url) {
    try {
        const res = await fetch(url);

        if(res.status !== 200){
            throw new Error("Failed to fetch");
        }

        const pokemon = await res.json();
        return pokemon;

    } catch (error) {
        console.error(error)
    }
}
//TODO Setup eventListeners
//TODO Setup main function
async function main() {
  let pokemonID = 1; //State Variable -- it means this is the current Pokemon by ID//
  try {
        //Get the datas on page load starting with the first Pokemon//
    const pokemon = await getPokemon(
      "https://pokeapi.co/api/v2/pokemon/" + pokemonID,
    );
    render(pokemon)
    console.log("Ready to fetch");
    //EVENT LISTENER FOR PREVIOUS//
    //Get data when the previous button is clicked//
    prev.addEventListener("click", async () => {
      if (pokemonID < 2) {
        return;
      }

      pokemonID--;
      const pokemon = await getPokemon(
        "https://pokeapi.co/api/v2/pokemon/" + pokemonID,
      );
      render(pokemon)
    });
    //EVENT LISTENER FOR NEXT//
    //Get data again when the next button is clicked//
    next.addEventListener("click", async () => {
      if(pokemonID === 1025){
        pokemonID >= 10000
      } 

      if(pokemonID > 10325){
        return 
      }
      pokemonID++;
      const pokemon = await getPokemon(
        "https://pokeapi.co/api/v2/pokemon/" + pokemonID,
      );
      render(pokemon)
    });
  } catch (error) {
    console.error(error);
  }
}
main()