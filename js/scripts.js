let pokemonRepository = (function () { //wrapping the pokemonList inside of an IIFE (Immediately Invoked Function Expression)
    let pokemonList = []
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1010'



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

        return (feet + ' ft, ' + inches + ' in'); //return the height in terms of feet and inches
    }



    function convertWeight(n) {
        let lbs = (Math.round(n / .4535)) / 10;
        return (lbs + ' lbs');
    }



    function showLoadingMessage() { //used to notify the user that data is being loaded/fetched
        console.log('Loading...');
        console.time('Rendered');
    }



    function hideLoadingMessage() { //used to hide the loading notification
        console.timeEnd('Rendered');
    }



    function add(pokemon) { //used to add be able to add new pokemon to the pokemonList
        if (
            typeof pokemon === 'object' && //pokemon must be an object with at least a name, detailsUrl, and id
            'name' in pokemon &&
            'detailsUrl' in pokemon &&
            'id' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon cannot be pushed to pokemonList')
        }
    }



    function loadList() { //used to fetch data from the apiUrl and add them to the pokemonList
        showLoadingMessage();

        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            let count = 1;
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
                    id: count
                };
                add(pokemon);
                count = count + 1
            })
            hideLoadingMessage();
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        })
    }



    function getAll() { //used to return all pokemon given in the pokemonList
        return pokemonList;
    }



    function loadDetails(item) { //used to load more data on each individual pokemon
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.id = details.id;

            item.height = details.height;
            item.weight = details.weight;

            item.types = details.types;
            if (details.types.length === 2) {
                item.types[0] = details.types[0].type.name;
                item.types[1] = details.types[1].type.name;
            } else {
                item.types[0] = details.types[0].type.name;
            }

            hideLoadingMessage();
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    }



    function showDetails(pokemon) { //used to display a modal with a pokemon's details
        loadDetails(pokemon).then(function () {
            console.log(pokemon);

            let modalContainer = document.querySelector('.modal-container');

            modalContainer.innerHTML = '';

            let modal = document.createElement('div');
            modal.classList.add('modal');

            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideDetails);

            let titleElement = document.createElement('h1');
            titleElement.innerText = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)} #${pokemon.id}`;

            let spriteElement = document.createElement('img');
            spriteElement.src = pokemon.imageUrl;

            let contentElement = document.createElement('p');
            if (pokemon.types.length > 1) {
                contentElement.innerText = `Height:
                ${convertHeight(pokemon.height)}

                Weight:
                ${convertWeight(pokemon.weight)}

                Types:
                ${pokemon.types[0]},
                ${pokemon.types[1]}`;
            } else {
                contentElement.innerText = `Height:
                ${convertHeight(pokemon.height)}

                Weight:
                ${convertWeight(pokemon.weight)}

                Type:
                ${pokemon.types[0]}
                `;
            }

            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(spriteElement);
            modal.appendChild(contentElement);
            modalContainer.appendChild(modal);

            modalContainer.classList.add('is-visible');

            modalContainer.addEventListener('click', function (e) {
                let target = e.target;
                if (target === modalContainer) {
                    hideDetails();
                }
            });
        });
    }



    function hideDetails() { //used to remove the modal displaying a pokemon's details
        let modalContainer = document.querySelector('.modal-container');
        modalContainer.classList.remove('is-visible');
    }



    function addListItem(pokemon) { //used to add a pokemon to the unordered list in HTML
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.innerText = `#${pokemon.id} ${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`;
        button.classList.add('list-button');
        button.addEventListener('click', function () {
            showDetails(pokemon);
        })

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }



    window.addEventListener('keydown', function (e) {
        let modalContainer = document.querySelector('.modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideDetails();
        }
    })



    return { //returning functions so that they may be used outside the IIFE to access the pokemonList
        showLoadingMessage: showLoadingMessage,
        hideLoadingMessage: hideLoadingMessage,
        add: add,
        loadList: loadList,
        getAll: getAll,
        loadDetails: loadDetails,
        showDetails: showDetails,
        hideDetails: hideDetails,
        addListItem: addListItem
    }
})();





pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});