let pokemonRepository = (function () { //wrapping the pokemonList inside of an IIFE (Immediately Invoked Function Expression)
    let pokedex = [ //database of pokemon for the pokedex
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

    function add (pokemon) { //used to add new pokemon to the pokedex
       pokedex.push(pokemon);
    }

    function getAll() { //used to return all pokemon given in the pokedex
        return pokedex;
    }

    function addListItem (pokemon) { //used to add a pokemon to the unordered list in HTML
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.innerText = `#${pokemon.id} ${pokemon.name}`;
        button.classList.add('list-button');
        button.addEventListener('click', function () {
            showDetails(pokemon);
        })
    
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }

    function showDetails (pokemon) { //used to log that the buttons are working
        console.log(pokemon.name);
    }

    return { //returning functions so that they may be used outside the IIFE to access the pokemonList
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    }
}) ();

pokemonRepository.getAll().forEach( function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});










// The following is old code that I am saving for reference while the project is still in development
// function convertHeight(n) {
//     n = n / 3;
//     let feet = Math.floor(n); //targeting the integer.  Using Math.floor(n) to round down because it should always be a positive number
//     let inches = n - feet; //targeting the remainder.  The only options for remainder are 1/3, 2/3, or 0

//     if (inches === 0) { //if remainder is 0, leave it as 0 inches
//         inches = 0
//     } else if (inches < 0.5) { //if remainder is less than .5, such as 1/3, then convert decimal to inches
//         inches = 4;
//     } else if (inches > 0.5) { //if remainder is greater than .5, such as 2/3, then convert decimal to inches
//         inches = 8;
//     }

//     return (feet + ' ft, ' + inches + ' in') //return the height in terms of feet and inches
// }



// function listPokemon(pokemon) { //defining the function listPokemon to list the details of 'pokemon'
//     document.write(
//         '#' + pokemon.id + ' ' + pokemon.name //list the pokemon id # and the name
//         + '<br>' //begin new line for type
//     )

//     if (pokemon.type.length > 1) { //checking to see if pokemon has more than 1 type
//         document.write(
//             `(Types: ${pokemon.type[0]}, ${pokemon.type[1]}) - Wow! This pokemon has two types!`
//         )
//     } else { //default: if it only has 1 type
//         document.write(
//             `(Type: ${pokemon.type})`
//         )
//     }

//     document.write('<br>') //begin new line for height

//     if (pokemon.height <= 3) { //checking to see if the pokemon is a 1ft tall or smaller
//         document.write(
//             `(Height: ${convertHeight(pokemon.height)}) - Wow, that's small!`
//         )
//     } else { //default: if it is taller than 1 ft 0 in
//         document.write(
//             `(Height: ${convertHeight(pokemon.height)})`
//         )
//     }

//     document.write('<br><br>') //leave space between this iteration and the next
// }



// pokemonRepository.getAll().forEach(listPokemon); //running the listPokemon function for each pokemon returnedby pokemonRepository.getAll()
