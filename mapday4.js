"use strict";

console.log("Greetings!");

const items = [
    { name: "Potion", type: "healing", price: 10},
    { name: "Elixir", type: "healing", price: 25},
    { name: "Bomb", type: "damage", price: 15},
    { name: "Arrow", type: "damage", price: 5},
];

//forEach is an array method//
items.forEach(function(item){
    console.log(item)
})
//End of forEach //

const main = document.getElementById("main");

//Map is an Array Method//
const withTax = items.map(function(item){
    const finalPrice =(item.price * 1.1).toFixed(2);
    return { name: item.name, type: item.type, price: finalPrice};
});
console.log(withTax);
console.log(items);

//Filter the Array Method//
const healingItems = items.filter(function(item){
    return item.type === "healing";
});
console.log(healingItems);

const expensive = items.filter(function(item){
    return item.price >= 15;
});
console.log(expensive);

function render(myItems, heading){
    const h2 = document.createElement("h2");
    h2.textContent = heading;
    main.appendChild(h2);

    myItems.forEach(function(item, index){
    console.log(index)
    const name = document.createElement("p");
    name.textContent = item.name;
    const type = document.createElement("p");
    type.textContent = item.type;
    const price = document.createElement("p");
    price.textContent = item.price;
    const hr = document.createElement("hr");
    
    if(!item.name){
        main.appendChild(hr);
        return;
    }
    main.appendChild(name);
    main.appendChild(type);
    main.appendChild(price);
    main.appendChild(hr);
    });
}
render(items, "All Default Items");
render([{}]);
render(withTax, "Items with Taxes");
render([{}]);
render(healingItems, "Healing Items");
render([{}]);
render(expensive, "Expensive Items");

//Getting a Total of all items//
//Normal For Loop//Sum//
let sum = 0;
for(let i = 0; i < items.length; i++){
    const item = withTax[i];
    sum += +item.price
}
console.log(sum, "SUM")

//Reduce//
const total = withTax.reduce(function(sum, item){
    return sum + +item.price
}, 0);
console.log(total)

//A more advanced way of Reduce//
//Example//
const counts = items.reduce(function(result, item){
    if(result[item.type] === undefined){
        result[item.type] = 1
    }else {
        result[item.type] = result[item.type] + 1
    }
    return result
}, {})
console.log(counts)

//API//
function renderPokemon({results}){
    results.forEach(function(pokemon){
        console.log(pokemon.name)
        const p = document.createElement("p")
        p.textContent = pokemon.name
        main.appendChild(p)
    })
}
async function getData(url) {
    try {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error("No Fetchy");
        }

        const data = await res.json()
        return data
    } catch (error) {
       console.error(error)
    }
}
async function run() {
    try {
        const pokemon = await getData("https://pokeapi.co/api/v2/pokemon/");
        renderPokemon(pokemon)
    } catch (error) {
        console.log("This line will never run anyway")
    }
}
run()