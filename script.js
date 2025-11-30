// ========================= DARK MODE TOGGLE =========================

// Button that switches theme
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Toggle light/dark theme
themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
    }
});

// Load previously saved theme on page load
window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Light Mode';
    }
});


// ========================= PROJECTS CAROUSEL =========================

let currentIndex = 0;
const carousel = document.getElementById('projectsCarousel');
const cards = carousel.querySelectorAll('.project-card');
const totalCards = cards.length;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');

// Number of cards visible per screen size
function getCardsPerView() {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1200) return 2;
    return 3;
}

let cardsPerView = getCardsPerView();
let maxIndex = Math.max(0, totalCards - cardsPerView);

// Create navigation dots
function createIndicators() {
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
}
createIndicators();

// Update carousel position + UI state
function updateCarousel() {
    const cardWidth = cards[0].offsetWidth;
    const gap = 30;
    const offset = currentIndex * (cardWidth + gap);
    carousel.style.transform = `translateX(-${offset}px)`;

    // Update dots
    document.querySelectorAll('.indicator').forEach((ind, idx) => {
        ind.classList.toggle('active', idx === currentIndex);
    });

    // Disable prev/next at edges
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
}

// Move slides left/right
function moveCarousel(direction) {
    currentIndex = Math.max(0, Math.min(currentIndex + direction, maxIndex));
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Button controls
prevBtn.addEventListener('click', () => moveCarousel(-1));
nextBtn.addEventListener('click', () => moveCarousel(1));

// Keyboard support 🧠
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveCarousel(-1);
    if (e.key === 'ArrowRight') moveCarousel(1);
});

// Enable swipe support on mobile
let touchStartX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) moveCarousel(1);
    if (touchEndX - touchStartX > 50) moveCarousel(-1);
});

// Update layout when resizing window
window.addEventListener('resize', () => {
    cardsPerView = getCardsPerView();
    maxIndex = Math.max(0, totalCards - cardsPerView);
    currentIndex = Math.min(currentIndex, maxIndex);
    createIndicators();
    updateCarousel();
});


// ========================= SMOOTH SCROLLING =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


// ========================= SCROLL TO TOP =========================

const scrollToTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    scrollToTopBtn.classList.toggle('visible', window.pageYOffset > 300);
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ========================= SCROLL-REVEAL ANIMATION =========================

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Fade elements on scroll
document.querySelectorAll('.project-card, .skill-category, .achievement-card')
.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = '0.6s ease';
    observer.observe(el);
});


// ========================= SKILL TAG POP EFFECT =========================

document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.transform = 'scale(1.2)';
        setTimeout(() => this.style.transform = 'scale(1)', 200);
    });
});
