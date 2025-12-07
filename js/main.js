/* 
   ==========================================================================
   PHOENIX PROTOCOL V3 - CORE LOGIC
   Status: STABLE
   ========================================================================== 
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('Josfer Core System V3: Loaded');

    // --- 1. MOBILE MENU SYSTEM (FAIL-SAFE) ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Toggle Function
    function toggleMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', toggleMenu);
    if (closeMenu) closeMenu.addEventListener('click', toggleMenu);

    // Close on Link Click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });


    // --- 2. SMOOTH SCROLL ENGINE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Match header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // --- 3. SCROLL REVEAL OBSERVER ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger earlier
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 4. WHATSAPP FORM HANDLER ---
    const whatsappForm = document.getElementById('whatsappForm');

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const business = document.getElementById('business').value;
            const service = document.getElementById('service').value;

            if (!name || !business) {
                alert('Por favor completa los campos requeridos.');
                return;
            }

            const message = `👋 Hola Josfer,\n\nSoy *${name}* de *${business}*.\nEstoy interesado en: *${service}*.\n\n¿Podemos hablar?`;
            const url = `https://wa.me/51918647921?text=${encodeURIComponent(message)}`;

            window.open(url, '_blank');
        });
    }
});
