// ==========================================
// DESTINATION EXPLORER CARD RENDERING & FILTERS
// ==========================================

const destinationsGrid = document.getElementById('destinationsGrid');
const searchInput = document.getElementById('searchInput');
const continentFilter = document.getElementById('continentFilter');


function renderCards(destinationsList) {
    destinationsGrid.innerHTML = "";

    if (destinationsList.length === 0) {
        destinationsGrid.innerHTML = `<p class="no-results">No destinations match your search criteria.</p>`;
        return;
    }

    destinationsList.forEach(destination => {
        const card = document.createElement('div');
        card.className = 'destination-card';
        
        card.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}" class="card-img">
            <div class="card-body">
                <h3>${destination.name}</h3>
                <p class="location">📍 ${destination.country}, ${destination.continent}</p>
                <button class="btn btn-primary card-btn">Explore Details</button>
            </div>
        `;
        
        destinationsGrid.appendChild(card);
    });
}

function filterDestinations() {
    const searchWord = searchInput.value.toLowerCase();
    const selectedContinent = continentFilter.value;

    const filtered = travelDestinations.filter(dest => {
        const matchesName = dest.name.toLowerCase().includes(searchWord);
        const matchesContinent = (selectedContinent === 'all' || dest.continent === selectedContinent);
        
        return matchesName && matchesContinent;
    });

    renderCards(filtered);
}

if (destinationsGrid) {
    searchInput.addEventListener('input', filterDestinations);
    continentFilter.addEventListener('change', filterDestinations);

    // Initial render when the browser first displays the page
    renderCards(travelDestinations);
}