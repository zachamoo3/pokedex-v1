let pokemonList = [ //database of pokemon for the pokedex
    {
        name: "Bulbasaur",
        id: 1,
        type: ["grass", "poison"],
        height: 2.33
    },
    {
        name: "Charmander",
        id: 4,
        type: ["fire"],
        height: 2.0
    },
    {
        name: "Squirtle",
        id: 7,
        type: ["water"],
        height: 1.67
    },
    {
        name: "Pikachu",
        id: 25,
        type: ["electric"],
        height: 1.33
    },
    {
        name: "Eevee",
        id: 133,
        type: ["normal"],
        height: 1.0
    },
];

function convertHeight(n) {
    let feet = Math.floor(n); //targeting the integer
    let inches = n - feet; //targeting the remainder
    //only options for remainder are 1/3, 2/3, or 0
    if (inches === 0) { //if remainder is 0, leave it as 0
        inches = 0
    } else if (inches < 0.5) { //if remainder is less than .5, such as 1/3, then convert decimal to inches
        inches = 4;
    } else if (inches > 0.5) { //if remainder is greater than .5, such as 2/3, then convert decimal to inches
        inches = 8;
    }
    return(feet + " ft, " + inches + " in") //return the height in terms of feet and inches
}


for (let i = 0; i < pokemonList.length; i++) {
    document.write (
        "#" + pokemonList[i].id + " " + pokemonList[i].name
        + "<br>"
    )

    if (pokemonList[i].type.length > 1) {
        document.write(
            `(Types: ${pokemonList[i].type[0]}, ${pokemonList[i].type[1]}) - Wow! This pokemon has two types!`
            + "<br>"
        )
    } else {
        document.write(
            `(Type: ${pokemonList[i].type})`
            + "<br>"
        )
    }

    if (pokemonList[i].height <= 1) {
        document.write(
            `(Height: ${convertHeight(pokemonList[i].height)}) - Wow, that's small!`
            + "<br>"
        )
    } else {
        document.write(
            `(Height: ${convertHeight(pokemonList[i].height)})`
            + "<br>"
        )
    }

    document.write("<br>")
}