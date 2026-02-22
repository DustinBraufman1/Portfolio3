const track = document.getElementById('carousel-track');
const leftBtn = document.getElementById('carousel-left');
const rightBtn = document.getElementById('carousel-right');
const originalItems = Array.from(track.querySelectorAll('.work-item'));
const totalOriginal = originalItems.length;

// Clone all items and append to create seamless loop
originalItems.forEach(item => {
    track.appendChild(item.cloneNode(true));
});

let currentIndex = 0;
let isTransitioning = false;

function getItemsPerView() {
    if (window.innerWidth <= 768) return 1;
    return 3;
}

function getItemWidth() {
    const item = track.querySelector('.work-item');
    const gap = 30;
    return item.offsetWidth + gap;
}

function updateCarousel(animate) {
    if (animate === false) {
        track.style.transition = 'none';
    } else {
        track.style.transition = 'transform 0.4s ease';
    }
    const offset = currentIndex * getItemWidth();
    track.style.transform = `translateX(-${offset}px)`;
}

rightBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarousel(true);
});

leftBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    if (currentIndex === 0) {
        // Jump to the cloned set instantly, then animate back
        currentIndex = totalOriginal;
        updateCarousel(false);
        // Force reflow
        track.offsetHeight;
        currentIndex = totalOriginal - 1;
        updateCarousel(true);
        return;
    }
    isTransitioning = true;
    currentIndex--;
    updateCarousel(true);
});

track.addEventListener('transitionend', () => {
    isTransitioning = false;
    // If we've scrolled into the cloned items, jump back seamlessly
    if (currentIndex >= totalOriginal) {
        currentIndex = currentIndex - totalOriginal;
        updateCarousel(false);
    }
});

window.addEventListener('resize', () => {
    updateCarousel(false);
});
