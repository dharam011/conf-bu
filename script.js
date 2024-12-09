// Fetch and inject the header and hero section dynamically
document.addEventListener("DOMContentLoaded", () => {
    fetch("header-hero.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load header-hero.html");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("header-hero-placeholder").innerHTML = data;
        })
        .catch(error => {
            console.error("Error loading header and hero section:", error);
        });
});
document.getElementById('registerButton').addEventListener('click', function() {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSd-SfkZ7eOi5V6SS1ztwOhfHU2wapiUNQA9LlfZvsg40AO0Dw/viewform';
});
// script.js

/// footer.js

// Add click event listeners to all nav links
