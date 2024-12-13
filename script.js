// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // First load the header
    loadHeader();
    
    // Then handle initial page content based on URL
    handleRoute(window.location.pathname);
});

// Function to load the header
function loadHeader() {
    fetch("header-hero.html")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load header");
            return response.text();
        })
        .then(html => {
            // Extract just the header content from the loaded HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const header = doc.querySelector('header');
            
            // Insert the header
            document.getElementById("header-hero-placeholder").innerHTML = header.outerHTML;
            
            // Setup navigation event listeners
            setupNavigation();
        })
        .catch(error => console.error("Error loading header:", error));
}

// Setup click handlers for navigation
function setupNavigation() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const path = link.getAttribute('href');
            navigateTo(path);
        });
    });
}

// Handle navigation
function navigateTo(path) {
    // Update URL without page reload
    window.history.pushState({}, '', path);
    // Load the new content
    handleRoute(path);
}

// Handle different routes
function handleRoute(path) {
    // Default to index if path is just "/"
    if (path === '/' || path === './') {
        path = 'index.html';
    } else if (path.startsWith('./')) {
        path = path.slice(2); // Remove './' from the path
    }
    
    // Don't reload the entire page if we're already on it
    if (path === window.location.pathname && path !== 'index.html') {
        return;
    }

    // Fetch and load the new page content
    fetch(path)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${path}`);
            return response.text();
        })
        .then(html => {
            // Parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Find the main content (everything after header-hero-placeholder)
            const mainContent = Array.from(doc.body.children).filter(el => 
                el.id !== 'header-hero-placeholder' && 
                !el.matches('script')
            );
            
            // Clear existing content after header
            const headerPlaceholder = document.getElementById('header-hero-placeholder');
            while (headerPlaceholder.nextElementSibling) {
                headerPlaceholder.nextElementSibling.remove();
            }
            
            // Insert new content
            mainContent.forEach(element => {
                document.body.appendChild(element.cloneNode(true));
            });
            
            // Re-attach event listeners for the new content
            setupContentListeners();
        })
        .catch(error => console.error("Error loading page:", error));
}

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    handleRoute(window.location.pathname);
});

// Setup any additional content-specific event listeners
function setupContentListeners() {
    // Register button handler
    const registerButton = document.getElementById('registerButton');
    if (registerButton) {
        registerButton.addEventListener('click', () => {
            window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSd-SfkZ7eOi5V6SS1ztwOhfHU2wapiUNQA9LlfZvsg40AO0Dw/viewform';
        });
    }
    
    // Add any other content-specific event listeners here
}
