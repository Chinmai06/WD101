document.addEventListener("DOMContentLoaded", function () {
    // Set min and max dates for Date of Birth input
    const currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear() - 55, currentDate.getMonth(), currentDate.getDate());
    const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

    const dobInput = document.getElementById("dob");
    dobInput.setAttribute("max", formatDate(maxDate));
    dobInput.setAttribute("min", formatDate(minDate));

    // Display saved entries on page load
    displayEntries();
});

document.getElementById("userform").addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("Email");
    const passwordInput = document.getElementById("password");
    const dobInput = document.getElementById("dob");
    const acceptTermsCheckbox = document.getElementById("acceptTerms");

    // Additional validations
    if (!acceptTermsCheckbox.checked) {
        document.getElementById("error").textContent = "Please agree to the terms and conditions.";
        return;
    } else {
        document.getElementById("error").textContent = "";
    }

    // Validate age for the date of birth
    const enteredDate = new Date(dobInput.value);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - enteredDate.getFullYear();

    if (age < 18 || age > 55) {
        document.getElementById("error").textContent = "Age must be between 18 and 55 years.";
        return;
    } else {
        document.getElementById("error").textContent = "";
    }

    // Save data to web storage
    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        dob: dobInput.value,
        acceptance: acceptTermsCheckbox.checked,
    };

    // Fetch existing entries from local storage
    let savedEntries = JSON.parse(localStorage.getItem("entriesData")) || [];
    savedEntries.push(formData); // Add new entry
    localStorage.setItem("entriesData", JSON.stringify(savedEntries)); // Save updated entries

    // Clear form fields after submission
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    dobInput.value = '';
    acceptTermsCheckbox.checked = false;

    // Display entries
    displayEntries();
});

function displayEntries() {
    const entriesTable = document.getElementById("entriesTable");
    const entriesBody = document.getElementById("user-entries");
    entriesBody.innerHTML = ''; // Clear previous entries

    // Retrieve saved entries from web storage
    const savedEntries = JSON.parse(localStorage.getItem("entriesData")) || [];

    // Display entries in the table
    savedEntries.forEach(entry => {
        const row = entriesTable.insertRow();
        row.insertCell(0).textContent = entry.name;
        row.insertCell(1).textContent = entry.email;
        row.insertCell(2).textContent = entry.password;
        row.insertCell(3).textContent = entry.dob;
        row.insertCell(4).textContent = entry.acceptance ? 'Accepted' : 'Not Accepted';
    });
}

// Helper function to format date as YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
