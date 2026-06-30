document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const preloader = document.getElementById('preloader');

    // Remove Clean System Loader
    window.addEventListener('load', () => {
        // Minimum 1.5s wait for smooth animation, then fade out
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            preloader.classList.add('fade-out');
            
            // Remove from DOM after fade animation and refresh AOS
            setTimeout(() => {
                preloader.remove();
                // Start AOS after loader is gone for smooth entry
                AOS.refresh();
            }, 500);
        }, 1500);
    });

    // Toggle Mobile Menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Toggle icon between bars and times (close)
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Optional: Add active state to nav links on scroll
    // This is a nice-to-have visual cue
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // -150 offset to account for navbar height and visual feel
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Initialize Vanta.js Globe Effect on Fixed Background
    // Vanta disabled for a clean, corporate, static grid look
    /*
    try {
        if (window.VANTA) {
            VANTA.GLOBE({
                el: "#background-3d",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x6c63ff,       // Electric Indigo
                color2: 0x00e5ff,      // Neon Cyan
                size: 1.60,            // Increased size for wow factor
                backgroundColor: 0x02020a,
                backgroundAlpha: 1
            })
        }
    } catch (error) {
        console.error("Vanta JS failed to load", error);
    }
    */

    // Scroll Progress Bar Logic
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;

        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    });

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-out',
        once: true,
        offset: 100,
    });

    // Initialize Typed.js
    new Typed('.auto-type', {
        strings: [
            "Data Analyst",
            "Business Analyst",
            "Reporting Analyst",
            "MIS Executive",
            "Junior Data Scientist"
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        loop: true,
    });

    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with slight delay (animation)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });


    // Resume Modal Logic
    const viewResumeBtn = document.getElementById('view-resume-btn');
    const resumeModal = document.getElementById('resume-modal');
    const resumeModalClose = document.getElementById('resume-modal-close');
    const resumeIframe = document.getElementById('resume-iframe');

    const openResumeModal = () => {
        if (resumeIframe) {
            const currentSrc = resumeIframe.getAttribute('src');
            if (!currentSrc || !currentSrc.endsWith('.pdf')) {
                const isNested = window.location.pathname.includes('/aashirvad-kv.github.io');
                resumeIframe.setAttribute('src', isNested ? "../NEW_ASSETS/Aashirvad_KV_.pdf" : "NEW_ASSETS/Aashirvad_KV_.pdf");
            }
        }
        if (resumeModal) {
            resumeModal.classList.add('active');
        }
    };

    const closeResumeModal = () => {
        if (resumeModal) {
            resumeModal.classList.remove('active');
        }
    };

    if (viewResumeBtn) viewResumeBtn.addEventListener('click', openResumeModal);
    if (resumeModalClose) resumeModalClose.addEventListener('click', closeResumeModal);

    // Close on overlay click
    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeResumeModal();
            }
        });
    }

    // Close on Escape key press
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
            closeResumeModal();
        }
    });
});

