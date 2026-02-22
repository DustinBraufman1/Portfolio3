// Typing animation for name
const nameElement = document.getElementById('typed-name');
const navButtons = document.getElementById('nav-buttons');
const fullName = 'Dustin Braufman';
let charIndex = 0;

function typeWriter() {
    if (charIndex < fullName.length) {
        nameElement.textContent += fullName.charAt(charIndex);
        charIndex++;
        // Randomize typing speed slightly for more natural feel
        const typingSpeed = 100 + Math.random() * 50;
        setTimeout(typeWriter, typingSpeed);
    } else {
        // Add underline after typing completes
        setTimeout(() => {
            nameElement.classList.add('underlined');
        }, 300);
        // Show navigation buttons after typing completes
        setTimeout(() => {
            navButtons.classList.add('show');
        }, 800);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});
