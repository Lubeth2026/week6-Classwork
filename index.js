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



//Bearer Token Login Example//
const loginButton = document.getElementById("login");
const signupButton = document.getElementById("signup");
const email = document.getElementById("email");
const password = document.getElementById("password");
const post = document.getElementById("post");

async function login(url) {
    const options = {
        method: "POST",
        body: JSON.stringify({email: email.value, password: password.value}),
//This body in options variable is used when you are not wiring up buttons with a login/signup//        
//        body: JSON.stringify({email:"potato@example.com", password:"password987"}),
        headers: {"Content-Type": "application/json"},
    }

    try {
       const res = await fetch(url, options);
       console.log(res) 

       if(!res.ok){
        throw new Error("Error in fetch login logic");
       }

       const {token} = await res.json();
       return token
       //Token is an Object if the token key and the variable name match you can destructure that token out wrapping the word in{}//

    } catch (error) {
        console.log(error)
    }
}

async function readAllNotes(url, token) {
    try {
        const options = {
            method: "GET", headers: {"Authorization": "Bearer " +token}
        };
        const res = await fetch(url, options)

        if (!res.ok) {
          throw new Error("Error in fetch login logic");
        }
        
        const notes = await res.json();
        return notes 
    } catch (error) {
        
    }
}

async function main() {
    try {
        let token
      loginButton.addEventListener("click", async() => {
       token = await login("https://north-star-b834.onrender.com/auth/login");
      const notes = await readAllNotes("https://north-star-b834.onrender.com/notes", token);
      console.log(notes)
      });
//If you are on new website API you will NOT have any notes//
//So if you use a signup button, doesn't do anything, will NOT return any information due to NO notes//
      signupButton.addEventListener("click", async() => {
       token = await login(
        "https://north-star-b834.onrender.com/auth/register",
      );
      const notes = await readAllNotes("https://north-star-b834.onrender.com/notes", token); 
      console.log(notes) 
      });
      console.log(token);

//To add a third button you can see the token from the third button with you info//      
      post.addEventListener("click", async()=> {
        console.log(token)
      })


//These 2 const variables is used when you are not wiring up buttons with a login/signup//
//      const jwt = await login(
//        "https://north-star-b834.onrender.com/auth/login",
//      );
//      console.log(jwt);

//      const notes = await readAllNotes(
//        "https://north-star-b834.onrender.com/notes",
//        jwt,
//      );
//      console.log(notes);
    } catch (error) {
        console.error(error) 
    }
}
main();
//End of Bearer Token Login Example//