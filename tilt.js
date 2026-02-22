const ns = 'http://www.w3.org/2000/svg';

const items = document.querySelectorAll('.work-item');
const setups = [];

items.forEach(item => {
    const thumb = item.querySelector('.work-thumbnail');
    if (!thumb) return;

    const svg = document.createElementNS(ns, 'svg');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:5;overflow:visible';

    const rect = document.createElementNS(ns, 'rect');
    rect.setAttribute('fill', 'none');
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('stroke-width', '2');

    svg.appendChild(rect);
    thumb.appendChild(svg);

    function setup() {
        const w = thumb.offsetWidth;
        const h = thumb.offsetHeight;
        if (w === 0 || h === 0) return;
        rect.setAttribute('x', '1');
        rect.setAttribute('y', '1');
        rect.setAttribute('width', w - 2);
        rect.setAttribute('height', h - 2);
        const perimeter = 2 * ((w - 2) + (h - 2));
        rect.style.strokeDasharray = perimeter;
        rect.style.strokeDashoffset = perimeter;
        rect.style.transition = 'stroke-dashoffset 0.6s ease';
        thumb._perimeter = perimeter;
    }

    setups.push(setup);
    window.addEventListener('resize', setup);

    item.addEventListener('mouseenter', () => {
        rect.style.strokeDashoffset = '0';
    });

    item.addEventListener('mouseleave', () => {
        rect.style.strokeDashoffset = thumb._perimeter;
    });
});

// Run setup after everything (including images) is fully loaded
window.addEventListener('load', () => {
    setups.forEach(fn => fn());
});
