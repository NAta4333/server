document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

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

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add background when scrolled
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 1)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animated counter for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate counters when stats section is visible
                if (entry.target.classList.contains('stats')) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(statNumber => {
                        const target = parseInt(statNumber.getAttribute('data-target'));
                        animateCounter(statNumber, target);
                    });
                }
                
                // Animate feature cards
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .stats, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // Download button interaction
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add loading state
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<span class="btn-icon">⏳</span>Preparing Download...';
        downloadBtn.style.pointerEvents = 'none';
        
        // Simulate download preparation
        setTimeout(() => {
            downloadBtn.innerHTML = '<span class="btn-icon">✅</span>Download Ready!';
            
            setTimeout(() => {
                // Reset button
                downloadBtn.innerHTML = originalText;
                downloadBtn.style.pointerEvents = 'auto';
                
                // Show download modal or redirect
                showDownloadModal();
            }, 1500);
        }, 2000);
    });

    // Download Modal Function
    function showDownloadModal() {
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'download-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🎉 Thank you for choosing EXT!</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Your download will start automatically. If it doesn't start, please click the button below:</p>
                    <br>
                    <button class="btn btn-primary" onclick="this.innerHTML='Downloaded! ✅'; this.disabled=true;">
                        <span class="btn-icon">⬇️</span>
                        Start Download
                    </button>
                    <br><br>
                    <div class="download-info">
                        <p><strong>Version:</strong> 2.1.0</p>
                        <p><strong>Size:</strong> ~25 MB</p>
                        <p><strong>Compatibility:</strong> Windows 10/11</p>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyles = `
            .download-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease-out;
            }
            
            .modal-content {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 15px;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                position: relative;
                animation: slideInDown 0.4s ease-out;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .modal-header h3 {
                color: var(--text-primary);
                margin: 0;
            }
            
            .close-modal {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 2rem;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .close-modal:hover {
                background: var(--bg-card);
                color: var(--text-primary);
            }
            
            .modal-body {
                text-align: center;
                color: var(--text-secondary);
            }
            
            .download-info {
                background: var(--bg-card);
                padding: 1rem;
                border-radius: 10px;
                text-align: left;
                margin-top: 1rem;
            }
            
            .download-info p {
                margin: 0.5rem 0;
                color: var(--text-secondary);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideInDown {
                from {
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;

        // Add styles to document
        const styleSheet = document.createElement('style');
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);

        // Add modal to body
        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(styleSheet);
            }, 300);
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeBtn.click();
            }
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add hover effects to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!this.classList.contains('loading')) {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            }
        });
    });

    // Add ripple effect styles
    const rippleStyles = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            animation: ripple-effect 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-effect {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(1);
                opacity: 0;
            }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;

    const rippleStyleSheet = document.createElement('style');
    rippleStyleSheet.textContent = rippleStyles;
    document.head.appendChild(rippleStyleSheet);

    // Console message for developers
    console.log('%cEXT - External Roblox Software', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with modern web technologies ⚡', 'color: #ec4899; font-size: 14px;');
    console.log('%cJoin our community for updates and support! 🚀', 'color: #06b6d4; font-size: 14px;');
});