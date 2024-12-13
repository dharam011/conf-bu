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
            setupNavigation(); // Setup navigation after loading header
        })
        .catch(error => {
            console.error("Error loading header and hero section:", error);
        });
});

// Function to handle navigation without reloading
function navigateTo(url) {
    // Use the History API to change the URL
    window.history.pushState({}, '', url);

    // Load new content based on the URL
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content-placeholder").innerHTML = data;
        })
        .catch(error => {
            console.error("Error loading content:", error);
        });
}

// Setup navigation links to use SPA behavior
function setupNavigation() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            navigateTo(this.getAttribute('href')); // Navigate without reload
        });
    });
}

// Handle back/forward navigation
window.addEventListener('popstate', () => {
    // Load content based on the current URL
    fetch(window.location.pathname)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content-placeholder").innerHTML = data;
        })
        .catch(error => {
            console.error("Error loading content:", error);
        });
});

// script.js

document.getElementById('registerButton').addEventListener('click', function() {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSd-SfkZ7eOi5V6SS1ztwOhfHU2wapiUNQA9LlfZvsg40AO0Dw/viewform';
});
// 
