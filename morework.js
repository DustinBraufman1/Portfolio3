const ALL_PROJECTS = [
    {
        slug: 'naturday',
        href: 'naturday.html',
        title: 'Naturday Rebrand',
        year: '2025',
        img: '../project images/box.png',
        imgClass: 'thumbnail-img'
    },
    {
        slug: 'silvi-materials',
        href: 'silvi-materials.html',
        title: 'Silvi Materials',
        year: '2025',
        img: '../project images/Silvi-Materials-slate-yellow-Transparent.png',
        imgClass: 'thumbnail-img thumb-scale-70'
    },
    {
        slug: 'mako-exterior',
        href: 'mako-exterior.html',
        title: 'Mako Website',
        year: '2024',
        img: '../project images/logo copy.jpg',
        imgClass: 'thumbnail-img thumb-scale-80'
    },
    {
        slug: 'akzidenz-grotesk',
        href: 'akzidenz-grotesk.html',
        title: 'Akzidenz-Grotesk Type Specimen',
        year: '2024',
        img: '../project images/coa.png',
        imgClass: 'thumbnail-img'
    },
    {
        slug: 'jewish-federation',
        href: 'jewish-federation.html',
        title: 'Jewish Federation of Greater Philadelphia',
        year: '2024',
        img: '../project images/jfed.png',
        imgClass: 'thumbnail-img'
    }
];

const currentSlug = location.pathname.split('/').pop().replace('.html', '');
const others = ALL_PROJECTS.filter(p => p.slug !== currentSlug);

// Fisher-Yates shuffle, then take 3
for (let i = others.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [others[i], others[j]] = [others[j], others[i]];
}
const picks = others.slice(0, 3);

const container = document.getElementById('more-work');
if (container) {
    container.innerHTML =
        '<h2 class="more-work-title">More Work</h2>' +
        '<div class="work-grid">' +
        picks.map(p =>
            '<a href="' + p.href + '" class="work-item">' +
                '<div class="work-thumbnail">' +
                    '<img src="' + p.img + '" alt="' + p.title + '" class="' + p.imgClass + '">' +
                '</div>' +
                '<h3 class="work-title">' + p.title + '</h3>' +
                '<span class="work-year">' + p.year + '</span>' +
            '</a>'
        ).join('') +
        '</div>';
}
