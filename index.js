"use strict";

console.log("Greetings!");

//This is a .then Function Example and how it is used//
async function getData(url, options){
      try {
        const res = await fetch(url, options)

        if(!res.ok){
            throw new Error("Failed to fetch")
        }

        const data = await res.json()
        return data

      } catch (error) {
        console.log(error)
      }
} 
const url = "https://pokeapi.co/api/v2/pokemon/"
const options = {
    method: "GET",
};
fetch(url, options)
  .then((res) => {
    if (!res.ok){
        throw new Error("Failed to fetch")
    }
    res.json().then((data) => {
        console.log(data);
    });
  })
.catch((error) => console.error(error));
//Then End of .then Example//


