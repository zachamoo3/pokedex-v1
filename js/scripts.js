let pokemonList = [ //database of pokemon for the pokedex
    {
        name: 'Bulbasaur',
        id: 1,
        type: ['grass', 'poison'],
        height: 7
    },
    {
        name: 'Charmander',
        id: 4,
        type: ['fire'],
        height: 6
    },
    {
        name: 'Squirtle',
        id: 7,
        type: ['water'],
        height: 5
    },
    {
        name: 'Pikachu',
        id: 25,
        type: ['electric'],
        height: 4
    },
    {
        name: 'Eevee',
        id: 133,
        type: ['normal'],
        height: 3
    },
];

function convertHeight(n) {
    n = n / 3;
    let feet = Math.floor(n); //targeting the integer.  Using Math.floor(n) to round down because it should always be a positive number
    let inches = n - feet; //targeting the remainder.  The only options for remainder are 1/3, 2/3, or 0

    if (inches === 0) { //if remainder is 0, leave it as 0 inches
        inches = 0
    } else if (inches < 0.5) { //if remainder is less than .5, such as 1/3, then convert decimal to inches
        inches = 4;
    } else if (inches > 0.5) { //if remainder is greater than .5, such as 2/3, then convert decimal to inches
        inches = 8;
    }

    return(feet + ' ft, ' + inches + ' in') //return the height in terms of feet and inches
}


for (let i = 0; i < pokemonList.length; i++) {
    document.write (
        '#' + pokemonList[i].id + ' ' + pokemonList[i].name //list the pokemon id # and the name
        + '<br>' //begin new line for type
    )

    if (pokemonList[i].type.length > 1) { //checking to see if pokemon has more than 1 type
        document.write(
            `(Types: ${pokemonList[i].type[0]}, ${pokemonList[i].type[1]}) - Wow! This pokemon has two types!`
        )
    } else { //default: if it only has 1 type
        document.write(
            `(Type: ${pokemonList[i].type})`
        )
    }

    document.write ('<br>') //begin new line for height

    if (pokemonList[i].height <= 1) { //checking to see if the pokemon is a 1ft tall or smaller
        document.write(
            `(Height: ${convertHeight(pokemonList[i].height)}) - Wow, that's small!`
        )
    } else { //default: if it is taller than 1 ft 0 in
        document.write(
            `(Height: ${convertHeight(pokemonList[i].height)})`
        )
    }

    document.write('<br><br>') //leave space between this iteration and the next
}