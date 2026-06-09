/* ==========================================
   TRIP BUDGET PLANNER LOGIC & LOCALSTORAGE
   ==========================================*/

const budgetForm = document.getElementById('budgetForm');
const resultCard = document.getElementById('resultCard');

const budgetDestination = document.getElementById('budgetDestination');
const tripDays = document.getElementById('tripDays');
const dailyExpense = document.getElementById('dailyExpense');

const outDestination = document.getElementById('outDestination');
const outTotal = document.getElementById('outTotal');
const outStatus = document.getElementById('outStatus');
const progressBar = document.getElementById('progressBar');

const saveBudgetBtn = document.getElementById('saveBudgetBtn');
const savedFeedbackMsg = document.getElementById('savedFeedbackMsg');

let currentCalculatedTrip = null;

if (budgetForm) {
    budgetForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        // Basic Custom Validation Check
        if (!budgetDestination.value.trim() || !tripDays.value || !dailyExpense.value) {
            alert("Please fill in all layout fields accurately before calculating.");
            return;
        }

        const destination = budgetDestination.value.trim();
        const days = parseInt(tripDays.value);
        const dailyAmount = parseFloat(dailyExpense.value);

        const totalCost = days * dailyAmount;

        let statusText = "";
        let fillPercentage = 0;
        let statusClass = "";

        if (totalCost <= 300) {
            statusText = "Low Budget";
            statusClass = "status-low";
            fillPercentage = 25;
        } else if (totalCost > 300 && totalCost <= 1000) {
            statusText = "Moderate Budget";
            statusClass = "status-moderate";
            fillPercentage = 60;
        } else {
            statusText = "Luxury Budget";
            statusClass = "status-luxury";
            fillPercentage = 100;
        }

        outDestination.textContent = destination;
        outTotal.textContent = `$${totalCost.toLocaleString()}`;
        outStatus.textContent = statusText;
       
        outStatus.className = `status-badge ${statusClass}`;

        progressBar.style.width = `${fillPercentage}%`;

        currentCalculatedTrip = {
            destination: destination,
            totalCost: totalCost,
            status: statusText,
            timestamp: new Date().toLocaleDateString()
        };

        resultCard.classList.add('visible');
        savedFeedbackMsg.style.display = "none"; 
    });
}

if (saveBudgetBtn) {
    saveBudgetBtn.addEventListener('click', function() {
        if (!currentCalculatedTrip) return;

        localStorage.setItem('savedTripBudget', JSON.stringify(currentCalculatedTrip));

        savedFeedbackMsg.style.display = "block";
        
        setTimeout(() => {
            savedFeedbackMsg.style.display = "none";
        }, 3000);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const retainedData = localStorage.getItem('savedTripBudget');
    if (retainedData && resultCard) {
        const parsedData = JSON.parse(retainedData);

        outDestination.textContent = parsedData.destination;
        outTotal.textContent = `$${parsedData.totalCost.toLocaleString()}`;
        outStatus.textContent = parsedData.status;

        let fillPercent = 25;
        let sClass = "status-low";
        if (parsedData.status === "Moderate Budget") { fillPercent = 60; sClass = "status-moderate"; }
        if (parsedData.status === "Luxury Budget") { fillPercent = 100; sClass = "status-luxury"; }
        
        outStatus.className = `status-badge ${sClass}`;
        progressBar.style.width = `${fillPercent}%`;

        currentCalculatedTrip = parsedData;
        resultCard.classList.add('visible');
    }
});