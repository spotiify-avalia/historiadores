document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ Accordion
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Close other accordions
            accordions.forEach(otherAcc => {
                if (otherAcc !== acc && otherAcc.classList.contains('active')) {
                    otherAcc.classList.remove('active');
                    otherAcc.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current accordion
            acc.classList.toggle('active');
            const content = acc.querySelector('.accordion-content');
            if (acc.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 40 + "px"; // added extra padding
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-up').forEach(el => {
        observer.observe(el);
    });

    // Modal Logic
    const modal = document.getElementById('ofertaModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.querySelector('.close-modal');
    const continueBasicBtn = document.getElementById('continueBasicBtn');

    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });

        const closeModal = (e) => {
            if (e) e.preventDefault();
            modal.classList.remove('active');
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (continueBasicBtn) continueBasicBtn.addEventListener('click', closeModal);

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Set Current Date dynamically
    const dateElements = document.querySelectorAll('.current-date');
    if (dateElements.length > 0) {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('pt-BR');
        dateElements.forEach(el => el.textContent = formattedDate);
    }
});
