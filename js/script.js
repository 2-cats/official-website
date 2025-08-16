// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
window.addEventListener('load', function() {
    const elementsToAnimate = document.querySelectorAll('.service-card, .about-text, .contact-info, .contact-form');
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
});

// Enhanced service cards interactions
document.querySelectorAll('.service-card').forEach((card, index) => {
    // Add staggered animation on load
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Enhanced hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Add glow effect
        this.style.boxShadow = '0 25px 50px -12px rgba(66, 153, 225, 0.25)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
    });
    
    // Add click animation
    card.addEventListener('click', function() {
        this.style.transform = 'translateY(-8px) scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        }, 150);
    });
});

// Enhanced contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Enhanced validation
    const errors = validateFormData(data);
    if (errors.length > 0) {
        showNotification(errors[0], 'error');
        highlightErrorFields(errors);
        return;
    }
    
    // Enhanced loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.classList.add('loading');
    submitButton.textContent = '送出中...';
    submitButton.disabled = true;
    
    // Add loading animation to form
    this.style.opacity = '0.7';
    this.style.pointerEvents = 'none';
    
    // Simulate API call with better UX
    setTimeout(() => {
        showNotification('訊息已成功送出！我們會在24小時內與您聯繫。', 'success');
        
        // Reset form with animation
        this.style.opacity = '1';
        this.style.pointerEvents = 'auto';
        this.reset();
        
        submitButton.classList.remove('loading');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Reset all form groups
        this.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('focused', 'has-value', 'error');
        });
        
        // Reset labels with animation
        this.querySelectorAll('label').forEach(label => {
            label.style.transition = 'all 0.3s ease';
            label.style.top = '16px';
            label.style.left = '16px';
            label.style.fontSize = '1rem';
            label.style.background = '';
            label.style.padding = '';
            label.style.borderRadius = '';
            label.style.color = 'rgba(255, 255, 255, 0.7)';
            label.style.fontWeight = '';
        });
        
        // Show success animation
        const successIcon = document.createElement('div');
        successIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        successIcon.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            color: #10b981;
            z-index: 10000;
            animation: successPop 0.6s ease-out;
        `;
        
        document.body.appendChild(successIcon);
        setTimeout(() => successIcon.remove(), 1000);
        
    }, 1500);
});

// Enhanced form validation
function validateFormData(data) {
    const errors = [];
    
    if (!data.name?.trim()) {
        errors.push('請輸入您的姓名');
    }
    
    if (!data.email?.trim()) {
        errors.push('請輸入您的電子郵件');
    } else if (!isValidEmail(data.email)) {
        errors.push('請輸入有效的電子郵件格式');
    }
    
    if (!data.service) {
        errors.push('請選擇服務項目');
    }
    
    if (!data.message?.trim()) {
        errors.push('請輸入專案描述');
    } else if (data.message.trim().length < 10) {
        errors.push('專案描述至少需要10個字元');
    }
    
    return errors;
}

function highlightErrorFields(errors) {
    // This would highlight specific fields based on error types
    // Implementation depends on specific error handling needs
}

// Add success animation CSS
const successStyles = document.createElement('style');
successStyles.textContent = `
    @keyframes successPop {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(successStyles);

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Enhanced styling with icons
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)'
    };
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="${icons[type]}" style="font-size: 1.2rem;"></i>
            <span>${message}</span>
            <button class="notification-close" style="
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
                opacity: 0.7;
                transition: opacity 0.2s ease;
            ">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        font-weight: 500;
        font-size: 0.95rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    document.body.appendChild(notification);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.opacity = '1';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.opacity = '0.7';
    });
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 6 seconds
    const autoRemoveTimer = setTimeout(() => {
        removeNotification(notification);
    }, 6000);
    
    // Clear timer if manually closed
    notification.addEventListener('click', () => {
        clearTimeout(autoRemoveTimer);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 400);
}

// This function is now defined earlier in the file with enhancements

// Enhanced stats animation with better timing
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h4');
            statItems.forEach((item, index) => {
                const text = item.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                if (number) {
                    // Add delay for staggered animation
                    setTimeout(() => {
                        item.textContent = '0' + text.replace(/[0-9]/g, '');
                        animateCounter(item, number, 2000);
                    }, index * 200);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Enhanced counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 50);
    const suffix = element.textContent.replace(/[0-9]/g, '');
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
            // Add completion effect
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 50);
}

// Initialize stats observer
window.addEventListener('load', function() {
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        statsObserver.observe(aboutStats);
    }
});

// Add performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(updateScrollEffects, 10);
window.removeEventListener('scroll', updateScrollEffects);
window.addEventListener('scroll', debouncedScrollHandler);

// Enhanced parallax and scroll effects
let ticking = false;

function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Parallax for hero section
    const heroGraphic = document.querySelector('.hero-graphic');
    if (heroGraphic) {
        const speed = 0.3;
        heroGraphic.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    }
    
    // Parallax for about section
    const aboutGraphic = document.querySelector('.about-graphic');
    if (aboutGraphic) {
        const aboutSection = document.querySelector('.about');
        const aboutRect = aboutSection.getBoundingClientRect();
        if (aboutRect.top < windowHeight && aboutRect.bottom > 0) {
            const speed = 0.2;
            aboutGraphic.style.transform = `translateY(${scrolled * speed}px)`;
        }
    }
    
    // Update navbar active link based on scroll position
    updateActiveNavLink();
    
    ticking = false;
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Add CSS for active nav link
const navStyles = document.createElement('style');
navStyles.textContent = `
    .nav-link.active {
        color: var(--primary-blue) !important;
        background: var(--gray-50) !important;
    }
    
    .nav-link.active::after {
        width: 80% !important;
    }
`;
document.head.appendChild(navStyles);

// Enhanced loading animation with progress
function initializePageLoad() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">2cats</div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
            <div class="loading-text">正在載入中...</div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #334155 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .loading-content {
            text-align: center;
            color: white;
        }
        
        .loading-logo {
            font-size: 3rem;
            font-weight: 800;
            background: linear-gradient(135deg, #60a5fa, #34d399, #fbbf24);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 2rem;
            animation: pulse 2s ease-in-out infinite;
        }
        
        .loading-bar {
            width: 200px;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            overflow: hidden;
            margin: 0 auto 1rem;
        }
        
        .loading-progress {
            height: 100%;
            background: linear-gradient(90deg, #60a5fa, #34d399);
            border-radius: 2px;
            width: 0;
            animation: loadProgress 2s ease-in-out;
        }
        
        .loading-text {
            font-size: 1rem;
            opacity: 0.8;
        }
        
        @keyframes loadProgress {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay after content loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
                style.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', initializePageLoad);

// Enhanced form interactions
function enhanceFormInteractions() {
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        // Enhanced focus effects
        input.addEventListener('focus', function() {
            const label = this.nextElementSibling;
            const formGroup = this.closest('.form-group');
            
            // Add focused class to form group
            formGroup.classList.add('focused');
            
            if (label && label.tagName === 'LABEL') {
                label.style.top = '-12px';
                label.style.left = '12px';
                label.style.fontSize = '0.8rem';
                label.style.background = 'linear-gradient(135deg, #4299e1, #0bc5ea)';
                label.style.padding = '4px 12px';
                label.style.borderRadius = '8px';
                label.style.color = 'white';
                label.style.fontWeight = '500';
            }
        });
        
        input.addEventListener('blur', function() {
            const label = this.nextElementSibling;
            const formGroup = this.closest('.form-group');
            
            // Remove focused class
            formGroup.classList.remove('focused');
            
            if (!this.value && label && label.tagName === 'LABEL') {
                label.style.top = '16px';
                label.style.left = '16px';
                label.style.fontSize = '1rem';
                label.style.background = '';
                label.style.padding = '';
                label.style.borderRadius = '';
                label.style.color = 'rgba(255, 255, 255, 0.7)';
                label.style.fontWeight = '';
            }
        });
        
        // Add typing effect
        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            if (this.value) {
                formGroup.classList.add('has-value');
            } else {
                formGroup.classList.remove('has-value');
            }
        });
    });
}

// Initialize form enhancements
enhanceFormInteractions();

// Add form validation visual feedback
function addFormValidation() {
    const form = document.getElementById('contactForm');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function validateField(field) {
    const formGroup = field.closest('.form-group');
    const isValid = field.checkValidity();
    
    if (!isValid) {
        formGroup.classList.add('error');
        field.style.borderColor = '#ef4444';
    } else {
        formGroup.classList.remove('error');
        field.style.borderColor = '';
    }
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    field.style.borderColor = '';
}

// Initialize form validation
addFormValidation();

// Enhanced ripple effect for better UX
document.querySelectorAll('.btn').forEach(button => {
    // Add button hover sound effect (optional)
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('click', function(e) {
        // Prevent multiple ripples
        const existingRipple = this.querySelector('.ripple-effect');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        // Enhanced button press feedback
        this.style.transform = 'translateY(1px) scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px) scale(1)';
        }, 100);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Enhanced CSS animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Form group states */
    .form-group.focused {
        transform: scale(1.02);
    }
    
    .form-group.error input,
    .form-group.error textarea {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .form-group.has-value label {
        color: rgba(255, 255, 255, 0.9) !important;
    }
    
    /* Enhanced hover states */
    .service-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-link {
        transition: all 0.2s ease;
    }
    
    /* Smooth scroll behavior */
    html {
        scroll-behavior: smooth;
    }
    
    /* Loading states */
    .btn.loading {
        pointer-events: none;
        opacity: 0.7;
    }
    
    .btn.loading::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
`;
document.head.appendChild(enhancedStyles);

// Add intersection observer for enhanced animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Add staggered animation for multiple elements
                if (entry.target.parentElement.classList.contains('services-grid')) {
                    const cards = entry.target.parentElement.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('appear');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToObserve = document.querySelectorAll(
        '.service-card, .about-text, .contact-info, .contact-form, .section-header'
    );
    
    elementsToObserve.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Initialize intersection observer
window.addEventListener('load', initIntersectionObserver);

// Enhanced smooth scrolling with offset adjustment
function enhancedSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                const startPosition = window.pageYOffset;
                const distance = offsetTop - startPosition;
                const duration = Math.min(Math.abs(distance) / 2, 1000); // Dynamic duration
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
}

// Initialize enhanced scroll
enhancedSmoothScroll();

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #60a5fa, #34d399);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
addScrollProgress();