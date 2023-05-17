let pokemonList = [
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
        height: 2
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
        height: 1
    },
];

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
            `(Height: ${pokemonList[i].height} ft) - Wow, that's small!`
            + "<br>"
        )
    } else {
        document.write(
            `(Height: ${pokemonList[i].height} ft)`
            + "<br>"
        )
    }

    document.write("<br>")
}