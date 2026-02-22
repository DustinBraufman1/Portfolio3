// Hamburger menu toggle
const hamburgerTrigger = document.getElementById('hamburger-trigger');
const hamburgerMenu = document.getElementById('hamburger-menu');

const hamburgerIconTrigger = document.getElementById('hamburger-icon-trigger');
const hamburgerClose = document.getElementById('hamburger-close');

// Toggle menu when logo is clicked
hamburgerTrigger.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
});

// Toggle menu when hamburger icon is clicked
hamburgerIconTrigger.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
});

// Close menu when X is clicked
hamburgerClose.addEventListener('click', () => {
    hamburgerMenu.classList.remove('active');
});

// Close menu when clicking outside the menu content
hamburgerMenu.addEventListener('click', (e) => {
    if (e.target === hamburgerMenu) {
        hamburgerMenu.classList.remove('active');
    }
});

// Close menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburgerMenu.classList.contains('active')) {
        hamburgerMenu.classList.remove('active');
    }
});
