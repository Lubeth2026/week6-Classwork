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



//JS Hashtag Function Asynchronous Example & What it does//
async function hashStringSHA256(message) {
  // Encode the string as a Uint8Array
  const msgBuffer = new TextEncoder().encode(message);
  // Hash the message using SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  // Convert the ArrayBuffer to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => ("00" + b.toString(16)).slice(-2))
    .join("");
  return hashHex;
}

// Example usage:
const data = {
  sub: "zNlGSgmCXqogKqCq4MWB",
  email: "potato@example.com",
  permisson: ["admin"],
  iat: 1773191259,
  exp: 1773796059,
};
const stringed = JSON.stringify(data + "ThisIsTheCodeSecret")

async function hashData() {
    try {
        const hash = await hashStringSHA256(stringed);
        console.log(hash)
    } catch (error) {
        
    }
}
hashData();
//Once something is hashed it is forever/indefinite//
//Hashing is very important it's how you protect JWT Tokens//
//End of Hashtag Function Example//



