/* ==========================================
   FEEDBACK FORM CUSTOM VALIDATION & STORAGE
   ==========================================*/

const supportForm = document.getElementById('supportForm');
const globalFormStatus = document.getElementById('globalFormStatus');

const supportName = document.getElementById('supportName');
const supportEmail = document.getElementById('supportEmail');
const supportCategory = document.getElementById('supportCategory');
const supportMessage = document.getElementById('supportMessage');
 
const errorName = document.getElementById('errorName');
const errorEmail = document.getElementById('errorEmail');
const errorMessage = document.getElementById('errorMessage');

if (supportForm) {
    supportForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        globalFormStatus.style.display = "none";
        globalFormStatus.className = "global-status-alert";
        globalFormStatus.textContent = "";

        let isFormValid = true;

        const nameValue = supportName.value.trim();
        if (nameValue.length < 2) {
            showInputError(supportName, errorName, "Name must contain at least 2 characters.");
            isFormValid = false;
        } else {
            showInputSuccess(supportName, errorName);
        }

        const emailValue = supportEmail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        
        if (!emailRegex.test(emailValue)) {
            showInputError(supportEmail, errorEmail, "Please enter a valid structural email address.");
            isFormValid = false;
        } else {
            showInputSuccess(supportEmail, errorEmail);
        }

        const messageValue = supportMessage.value.trim();
        if (messageValue.length < 15) {
            showInputError(supportMessage, errorMessage, `Message is too short. Please add ${15 - messageValue.length} more characters.`);
            isFormValid = false;
        } else {
            showInputSuccess(supportMessage, errorMessage);
        }

        if (isFormValid) {
            const newTicket = {
                id: 'TICKET-' + Date.now(),
                clientName: nameValue,
                clientEmail: emailValue,
                categoryType: supportCategory.value,
                messageContent: messageValue,
                submissionDate: new Date().toLocaleString()
            };

            let savedTicketsCollection = JSON.parse(localStorage.getItem('travelNestTickets')) || [];

            savedTicketsCollection.push(newTicket);
            localStorage.setItem('travelNestTickets', JSON.stringify(savedTicketsCollection));

            globalFormStatus.textContent = `🎉 Thank you, ${nameValue}! Your support ticket has been recorded. Reference ID: ${newTicket.id}`;
            globalFormStatus.classList.add('status-success-view');
            globalFormStatus.style.display = "block";

            supportForm.reset();
            resetValidationStyling();
        } else {
            globalFormStatus.textContent = "⚠️ Form submission failed. Please resolve the highlighted errors above and try again.";
            globalFormStatus.classList.add('status-error-view');
            globalFormStatus.style.display = "block";
        }
    });
}

function showInputError(inputElement, errorSpan, localizedMessage) {
    inputElement.classList.add('input-field-error');
    inputElement.classList.remove('input-field-success');
    errorSpan.textContent = localizedMessage;
    errorSpan.style.display = "block";
}

function showInputSuccess(inputElement, errorSpan) {
    inputElement.classList.add('input-field-success');
    inputElement.classList.remove('input-field-error');
    errorSpan.textContent = "";
    errorSpan.style.display = "none";
}

function resetValidationStyling() {
    const inputs = [supportName, supportEmail, supportMessage];
    inputs.forEach(element => {
        element.classList.remove('input-field-success');
        element.classList.remove('input-field-error');
    });
}