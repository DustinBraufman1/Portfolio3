const flipbookEl = document.getElementById('flipbook');
const pages = flipbookEl.querySelectorAll('.flipbook-page');
const indicator = document.getElementById('page-indicator');

const pageFlip = new St.PageFlip(flipbookEl, {
    width: 550,
    height: 550,
    size: 'stretch',
    maxShadowOpacity: 0.3,
    showCover: true,
    mobileScrollSupport: false,
    flippingTime: 600
});

pageFlip.loadFromHTML(document.querySelectorAll('.flipbook-page'));

function updateIndicator() {
    const current = pageFlip.getCurrentPageIndex() + 1;
    const total = pages.length;
    indicator.textContent = current + ' / ' + total;
}

updateIndicator();

pageFlip.on('flip', () => {
    updateIndicator();
});

document.getElementById('flipbook-prev').addEventListener('click', () => {
    pageFlip.flipPrev();
});

document.getElementById('flipbook-next').addEventListener('click', () => {
    pageFlip.flipNext();
});
