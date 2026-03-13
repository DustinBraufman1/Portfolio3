// Hamburger menu toggle
const hamburgerTrigger = document.getElementById('hamburger-trigger');
const hamburgerMenu = document.getElementById('hamburger-menu');

const hamburgerIconTrigger = document.getElementById('hamburger-icon-trigger');
const hamburgerClose = document.getElementById('hamburger-close');

// Toggle menu when logo is clicked (navigate to work page if on a project page)
hamburgerTrigger.addEventListener('click', () => {
    if (location.pathname.includes('/projects/')) {
        location.href = '../work.html';
    } else {
        hamburgerMenu.classList.toggle('active');
    }
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

// On touch devices, play underline animation before navigating
const isTouch = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches;

document.querySelectorAll('.hamburger-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!isTouch()) return;
        e.preventDefault();
        const href = link.getAttribute('href');
        if (!href) return;
        link.classList.add('touch-active');
        setTimeout(() => {
            window.location.href = href;
        }, 350);
    });
});
