document.querySelectorAll('.flipcard').forEach(card => {
    const inner = card.querySelector('.flipcard-inner');
    const front = card.querySelector('.flipcard-front');
    const back = card.querySelector('.flipcard-back');
    let flipped = false;
    let animating = false;

    back.style.display = 'none';

    // Tilt on mouse move (only when upright)
    card.addEventListener('mousemove', (e) => {
        if (animating || flipped) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const rotY = (x - 0.5) * 16;
        const rotX = (0.5 - y) * 10;
        inner.style.transition = 'transform 0.1s ease';
        inner.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        if (animating || flipped) return;
        inner.style.transition = 'transform 0.3s ease';
        inner.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });

    card.addEventListener('click', () => {
        if (animating) return;
        animating = true;

        const endZ = flipped ? 0 : 90;

        // Phase 1: spin toward 45° and fade out
        inner.style.transition = 'transform 0.15s ease-in, opacity 0.12s ease';
        inner.style.transform = 'perspective(900px) rotateZ(45deg)';
        inner.style.opacity = '0';

        setTimeout(() => {
            // Swap faces while invisible
            if (!flipped) {
                front.style.display = 'none';
                back.style.display = 'block';
            } else {
                back.style.display = 'none';
                front.style.display = 'block';
            }
            flipped = !flipped;

            // Hold at 45° with no transition, then spin to final + fade in
            inner.style.transition = 'none';
            inner.style.transform = 'perspective(900px) rotateZ(45deg)';

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    inner.style.transition = 'transform 0.15s ease-out, opacity 0.12s ease';
                    inner.style.transform = `perspective(900px) rotateZ(${endZ}deg)`;
                    inner.style.opacity = '1';

                    setTimeout(() => { animating = false; }, 150);
                });
            });
        }, 150);
    });
});
