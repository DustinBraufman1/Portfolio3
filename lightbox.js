// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxBlurb = document.getElementById('lightbox-blurb');
let isZoomed = false;

// Get all project images and videos
const projectImages = document.querySelectorAll('.project-img');

// Add click event to all project images/videos
projectImages.forEach(el => {
    el.addEventListener('click', () => {
        if (el.tagName === 'VIDEO') {
            openLightboxVideo(el.querySelector('source').src, el.dataset.caption || '');
        } else {
            openLightbox(el.src, el.alt, el.dataset.caption || '');
        }
    });
});

// Open lightbox with image
function openLightbox(src, alt, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxImg.style.display = '';
    if (lightboxVideo) { lightboxVideo.style.display = 'none'; lightboxVideo.src = ''; }
    if (lightboxBlurb) {
        lightboxBlurb.textContent = caption;
        lightboxBlurb.style.display = caption ? 'block' : 'none';
    }
    lightbox.classList.add('active');
    isZoomed = false;
    lightboxImg.classList.remove('zoomed');
    lightboxImg.style.transform = '';
    lightboxImg.style.transformOrigin = '';
    document.body.style.overflow = 'hidden';
}

// Open lightbox with video
function openLightboxVideo(src, caption) {
    if (!lightboxVideo) return;
    lightboxImg.style.display = 'none';
    lightboxVideo.style.display = '';
    lightboxVideo.src = src;
    lightboxVideo.play();
    if (lightboxBlurb) {
        lightboxBlurb.textContent = caption;
        lightboxBlurb.style.display = caption ? 'block' : 'none';
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    isZoomed = false;
    lightboxImg.classList.remove('zoomed');
    lightboxImg.style.transform = '';
    lightboxImg.style.transformOrigin = '';
    if (lightboxVideo) { lightboxVideo.pause(); lightboxVideo.src = ''; lightboxVideo.style.display = 'none'; }
    document.body.style.overflow = 'auto';
}

// Close button click
lightboxClose.addEventListener('click', closeLightbox);

// Click outside image to close
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Click image to zoom into click position
lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation();
    isZoomed = !isZoomed;

    if (isZoomed) {
        const rect = lightboxImg.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        lightboxImg.style.transformOrigin = x + '% ' + y + '%';
        lightboxImg.style.transform = 'scale(3)';
        lightboxImg.classList.add('zoomed');
    } else {
        lightboxImg.style.transform = '';
        lightboxImg.style.transformOrigin = '';
        lightboxImg.classList.remove('zoomed');
    }
});

// When zoomed, follow mouse to pan around the image
lightboxImg.addEventListener('mousemove', (e) => {
    if (!isZoomed) return;
    const rect = lightboxImg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    lightboxImg.style.transformOrigin = x + '% ' + y + '%';
});

// ESC key to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});
