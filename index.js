document.addEventListener('DOMContentLoaded', function() {
    const characterList = document.getElementById('character-list');

    // Fetch Pokemon data from PokeAPI
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(data => {
            const fetchPromises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
            return Promise.all(fetchPromises);
        })
        .then(pokemonData => {
            pokemonData.forEach(pokemon => {
                const card = createPokemonCard(pokemon);
                characterList.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching Pokemon data:', error));

    // Function to create a Pokemon card
    function createPokemonCard(pokemon) {
        const card = document.createElement('div');
        card.className = 'col mb-4';
        card.innerHTML = `
            <div class="character-card">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
                <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                <div class="character-details hidden">
                    <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                    <p>Base Stats:</p>
                    <ul>
                        ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        // Click functionality to toggle details
        card.querySelector('.character-card').addEventListener('click', function() {
            const details = this.querySelector('.character-details');
            details.classList.toggle('hidden');
        });

        return card;
    }
});
