/* ==========================================
   RANDOM TRIP GENERATOR & WISHLIST LOGIC
   ==========================================*/

const generateBtn = document.getElementById('generateBtn');
const generatedResultPlaceholder = document.getElementById('generatedResultPlaceholder');
const wishlistItemsGrid = document.getElementById('wishlistItemsGrid');

let activeGeneratedDestination = null;

function getSurpriseTrip() {
    // Generate a random index bounding criteria mathematically
    const randomIndex = Math.floor(Math.random() * travelDestinations.length);
    const selectedTrip = travelDestinations[randomIndex];
    
    activeGeneratedDestination = selectedTrip;

    generatedResultPlaceholder.innerHTML = `
        <div class="surprise-card animated-fade-in">
            <img src="${selectedTrip.image}" alt="${selectedTrip.name}" class="surprise-img">
            <div class="surprise-info">
                <h4>${selectedTrip.name}, ${selectedTrip.country}</h4>
                <span class="badge">${selectedTrip.continent}</span>
                <p>${selectedTrip.description}</p>
                <button id="addToWishlistBtn" class="btn btn-primary wishlist-add-btn">❤️ Save to Wishlist</button>
            </div>
        </div>
    `;

    document.getElementById('addToWishlistBtn').addEventListener('click', saveActiveToWishlist);
}

function saveActiveToWishlist() {
    if (!activeGeneratedDestination) return;

    let currentWishlist = JSON.parse(localStorage.getItem('travelNestWishlist')) || [];

    const itemExists = currentWishlist.some(item => item.id === activeGeneratedDestination.id);

    if (itemExists) {
        alert(`${activeGeneratedDestination.name} is already sitting inside your travel wishlist!`);
        return;
    }

    currentWishlist.push(activeGeneratedDestination);
    localStorage.setItem('travelNestWishlist', JSON.stringify(currentWishlist));

    renderWishlist(currentWishlist);
}

function renderWishlist(wishlistArray) {
    wishlistItemsGrid.innerHTML = "";

    if (wishlistArray.length === 0) {
        wishlistItemsGrid.innerHTML = `<p class="placeholder-text">Your wishlist is currently empty. Roll the dice to begin collecting destinations!</p>`;
        return;
    }

    wishlistArray.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = 'wishlist-item-row animated-fade-in';
        
        itemRow.innerHTML = `
            <div class="wish-item-meta">
                <strong>${item.name}</strong>
                <span>${item.country}</span>
            </div>
            <button class="remove-wish-btn" data-id="${item.id}" aria-label="Delete saved item">&times;</button>
        `;
        
        wishlistItemsGrid.appendChild(itemRow);
    });

    setupWishlistDeleteTriggers();
}

function setupWishlistDeleteTriggers() {
    const deleteButtons = document.querySelectorAll('.remove-wish-btn');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = parseInt(this.getAttribute('data-id'));
            let currentWishlist = JSON.parse(localStorage.getItem('travelNestWishlist')) || [];

            currentWishlist = currentWishlist.filter(item => item.id !== targetId);
            localStorage.setItem('travelNestWishlist', JSON.stringify(currentWishlist));

            renderWishlist(currentWishlist);
        });
    });
}

if (generateBtn) {
    generateBtn.addEventListener('click', getSurpriseTrip);
    
    window.addEventListener('DOMContentLoaded', () => {
        const structuralSavedData = JSON.parse(localStorage.getItem('travelNestWishlist')) || [];
        renderWishlist(structuralSavedData);
    });
}