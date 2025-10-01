// Smooth scrolling for navigation links
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

// Toggle cabinet visibility
function toggleCabinet() {
    const cabinet = document.getElementById('cabinet');
    const isVisible = cabinet.style.display !== 'none';
    
    if (isVisible) {
        cabinet.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        cabinet.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Cabinet tab navigation
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.cabinet-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked nav item
    event.target.classList.add('active');
}

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.cheat-card, .feature-item, .stat-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Particle background effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.3);
            border-radius: 50%;
            animation: float-particle ${5 + Math.random() * 10}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-40px) translateX(-10px); }
            75% { transform: translateY(-20px) translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
    });
});

// Form validation for settings
function validateForm() {
    const email = document.querySelector('input[type="email"]').value;
    const username = document.querySelector('input[type="text"]').value;
    
    if (!email || !username) {
        alert('Пожалуйста, заполните все обязательные поля');
        return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Пожалуйста, введите корректный email');
        return false;
    }
    
    alert('Настройки сохранены успешно!');
    return true;
}

// Add click handlers for buttons
document.addEventListener('DOMContentLoaded', function() {
    // Cheat purchase buttons
    document.querySelectorAll('.cheat-card .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Переходим к оплате...');
        });
    });
    
    // Download buttons
    document.querySelectorAll('.download-item .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            const cheatName = btn.closest('.download-item').querySelector('h4').textContent;
            alert(`Начинается загрузка ${cheatName}...`);
        });
    });
    
    // Subscription buttons
    document.querySelectorAll('.subscription-item .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = btn.textContent.trim();
            if (action === 'Продлить') {
                alert('Переходим к продлению подписки...');
            } else if (action === 'Возобновить') {
                alert('Переходим к возобновлению подписки...');
            }
        });
    });
    
    // Settings save button
    const saveBtn = document.querySelector('.settings-form .btn-primary');
    if (saveBtn) {
        saveBtn.addEventListener('click', validateForm);
    }
});

// Add loading animation
function showLoading(element) {
    const originalText = element.textContent;
    element.textContent = 'Загрузка...';
    element.disabled = true;
    
    setTimeout(() => {
        element.textContent = originalText;
        element.disabled = false;
    }, 2000);
}

// Statistics counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            clearInterval(timer);
            element.textContent = target;
        }
    }, 16);
}

// Initialize counters when cabinet is opened
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-info h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        if (!isNaN(target)) {
            counter.textContent = '0';
            animateCounter(counter, target);
        }
    });
}
