document.addEventListener('DOMContentLoaded', () => {
    
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            initScrollAnimations();
        }, 1200);
    });
    
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
        html.setAttribute('data-theme', 'light');
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 150);
    });
  
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    function toggleMobileMenu() {
        const isActive = mobileMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active', isActive);
        mobileToggle.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    }
    
    mobileToggle.addEventListener('click', toggleMobileMenu);
    mobileOverlay.addEventListener('click', toggleMobileMenu);
    
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    

    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav, { passive: true });
   
    const typingText = document.querySelector('.typing-text');
    const typingPhrases = [
        'Stage d\'un mois recherché',
        'Développement Web',
        'Python & Django',
        'Algorithmique',
        'Base de données'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = typingPhrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % typingPhrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    setTimeout(typeEffect, 1500);

    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    if (entry.target.querySelector('.language-fill')) {
                        entry.target.querySelectorAll('.language-fill').forEach(bar => {
                            const fill = bar.style.getPropertyValue('--fill');
                            bar.style.width = fill;
                        });
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => observer.observe(el));
    }
    
    const scrollTopBtn = document.getElementById('scrollTop');
    
    function handleScrollTop() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', handleScrollTop, { passive: true });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });    
 
    const contactForm = document.getElementById('contactForm');
    
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-content"><i class="fas fa-spinner fa-spin"></i> Envoi...</span>';
        
        setTimeout(() => {
            submitBtn.innerHTML = '<span class="btn-content"><i class="fas fa-check"></i> Message envoyé !</span>';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
            }, 3000);
        }, 1500);
    });
    
    function handleParallax() {
        const blobs = document.querySelectorAll('.blob');
        const scrollY = window.scrollY;
        
        blobs.forEach((blob, index) => {
            const speed = 0.1 + (index * 0.05);
            blob.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
    
    window.addEventListener('scroll', handleParallax, { passive: true });
    
 
    console.log('%c✨ Portfolio Premium', 'font-size: 18px; font-weight: 700; color: #6366f1;');
    console.log('%cAKASTOUM Najat | Génie Informatique', 'font-size: 13px; color: #a1a1aa;');
    console.log('%c🔍 Stage d\'un mois recherché', 'font-size: 12px; color: #22c55e;');
});