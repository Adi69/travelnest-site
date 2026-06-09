const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', function() {
 
    mainNav.classList.toggle('open');
    
});

/* ======================
   DESTINATION OF THE DAY 
   ======================*/

function displayDestinationOfTheDay() {
    const dailyContainer = document.getElementById('dailyDestinationContainer');
    if (!dailyContainer) return; 

    const currentDay = new Date().getDate();

    const destinationIndex = currentDay % travelDestinations.length;
    const todayDestination = travelDestinations[destinationIndex];

    dailyContainer.innerHTML = `
        <div class="daily-text-content">
            <h3>${todayDestination.name}, ${todayDestination.country}</h3>
            <span class="badge">${todayDestination.continent}</span>
            <p class="description">${todayDestination.description}</p>
            
            <h4>Top Highlights:</h4>
            <ul>
                <li>${todayDestination.attractions[0]}</li>
                <li>${todayDestination.attractions[1]}</li>
                <li>${todayDestination.attractions[2]}</li>
            </ul>
            <a href="explorer.html" class="btn btn-primary" style="margin-top: 20px;">View Full Details</a>
        </div>
        <div class="daily-image-content">
            <img src="${todayDestination.image}" alt="${todayDestination.name}" class="responsive-img">
        </div>
    `;
}

displayDestinationOfTheDay();