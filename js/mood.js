/* ==========================================
   TRAVEL MOOD AMBIENT SOUNDS & ITINERARY LOGIC
   ==========================================*/

const soundButtons = document.querySelectorAll('.sound-btn');

const soundUrls = {
    ocean: 'https://assets.mixkit.co/active_storage/sfx/2513/2513-84.wav', 
    rain: 'https://assets.mixkit.co/active_storage/sfx/2448/2448-84.wav'   
};

let activeAudioNode = null;
let activeSoundType = null;

soundButtons.forEach(button => {
    button.addEventListener('click', function() {
        const selectedSound = this.getAttribute('data-sound');
        const parentCard = this.parentElement;

        if (activeAudioNode && activeSoundType === selectedSound) {
            stopAudio();
            return;
        }

        if (activeAudioNode) {
            stopAudio();
        }

        activeAudioNode = new Audio(soundUrls[selectedSound]);
        activeAudioNode.loop = true; // Loop continuously
        activeAudioNode.play()
            .then(() => {
                activeSoundType = selectedSound;
                this.textContent = "⏸️ Pause Sound";
                parentCard.classList.add('playing');
            })
            .catch(err => {
                console.log("Audio play blocked by browser autoplay rules:", err);
                alert("Click again to confirm audio playback.");
            });
    });
});

function stopAudio() {
    if (!activeAudioNode) return;
    activeAudioNode.pause();
 
    soundButtons.forEach(btn => btn.textContent = "Play Sound");
    document.querySelectorAll('.sound-card').forEach(card => card.classList.remove('playing'));
    
    activeAudioNode = null;
    activeSoundType = null;
}


const itineraryForm = document.getElementById('itineraryForm');
const itineraryListContainer = document.getElementById('itineraryListContainer');
const itineraryDay = document.getElementById('itineraryDay');
const itineraryActivity = document.getElementById('itineraryActivity');

let itineraryCollection = JSON.parse(localStorage.getItem('travelNestItinerary')) || [];

if (itineraryForm) {
    itineraryForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!itineraryActivity.value.trim()) {
            alert("Please type a valid activity description.");
            return;
        }

        const newTask = {
            id: Date.now(),
            day: itineraryDay.value,
            activity: itineraryActivity.value.trim(),
            completed: false
        };

        itineraryCollection.push(newTask);
        localStorage.setItem('travelNestItinerary', JSON.stringify(itineraryCollection));
        
        itineraryActivity.value = ""; 
        renderItinerary();
    });
}

function renderItinerary() {
    itineraryListContainer.innerHTML = "";

    if (itineraryCollection.length === 0) {
        itineraryListContainer.innerHTML = `<p class="placeholder-text">No activities scheduled yet. Build your timeline itinerary above!</p>`;
        return;
    }

    const sortedCollection = [...itineraryCollection].sort((a, b) => a.day.localeCompare(b.day));

    sortedCollection.forEach(item => {
        const itemBlock = document.createElement('div');
        itemBlock.className = `itinerary-item-row ${item.completed ? 'task-done' : ''}`;
        
        itemBlock.innerHTML = `
            <div class="itinerary-meta">
                <span class="day-indicator">${item.day}</span>
                <p class="activity-text">${item.activity}</p>
            </div>
            <div class="itinerary-actions">
                <input type="checkbox" class="task-toggle-check" data-id="${item.id}" ${item.completed ? 'checked' : ''} aria-label="Mark completed">
                <button class="delete-itinerary-btn" data-id="${item.id}" aria-label="Delete entry">&times;</button>
            </div>
        `;
        
        itineraryListContainer.appendChild(itemBlock);
    });

    setupItineraryInteractions();
}

function setupItineraryInteractions() {
    document.querySelectorAll('.task-toggle-check').forEach(box => {
        box.addEventListener('change', function() {
            const idToToggle = parseInt(this.getAttribute('data-id'));
            itineraryCollection = itineraryCollection.map(item => {
                if (item.id === idToToggle) item.completed = this.checked;
                return item;
            });
            localStorage.setItem('travelNestItinerary', JSON.stringify(itineraryCollection));
            renderItinerary(); 
        });
    });

    // B. Handle Itinerary Row Deletions
    document.querySelectorAll('.delete-itinerary-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idToDelete = parseInt(this.getAttribute('data-id'));
            itineraryCollection = itineraryCollection.filter(item => item.id !== idToDelete);
            localStorage.setItem('travelNestItinerary', JSON.stringify(itineraryCollection));
            renderItinerary();
        });
    });
}

if (itineraryListContainer) {
    renderItinerary();
}