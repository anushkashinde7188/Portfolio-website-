// Loading Screen - Optimized
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    // Reduced timeout for faster initial display
    requestAnimationFrame(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    });
});

// Smooth Scrolling Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

// Optimized navbar scroll effect with improved throttling
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;
    let navbarTicking = false;
    
    function updateNavbar() {
        // Only update if scroll position changed significantly (by 5px or more)
        if (Math.abs(window.scrollY - lastScrollY) > 5) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            lastScrollY = window.scrollY;
        }
        navbarTicking = false;
    }
    
    // Use a more efficient scroll listener with passive flag
    window.addEventListener('scroll', () => {
        if (!navbarTicking) {
            requestAnimationFrame(updateNavbar);
            navbarTicking = true;
        }
    }, { passive: true });

    // Optimized active nav link highlighting with improved performance
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let navTicking = false;
    let lastActiveSection = '';

    function updateActiveNavLink() {
        let current = '';
        const scrollY = window.scrollY;
        
        // Use a for loop instead of forEach for better performance
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        }

        // Only update DOM if the active section changed
        if (current !== lastActiveSection) {
            lastActiveSection = current;
            
            // Use a for loop instead of forEach for better performance
            for (let i = 0; i < navLinks.length; i++) {
                const link = navLinks[i];
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        }
        
        navTicking = false;
    }

    // Throttle scroll events more aggressively
    window.addEventListener('scroll', () => {
        if (!navTicking) {
            requestAnimationFrame(updateActiveNavLink);
            navTicking = true;
        }
    }, { passive: true });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Particles.js Background
    createParticles();

    // Initialize AOS (Animate On Scroll)
    initAOS();

    // Skills Progress Animation
    animateSkillBars();

    // Contact Form
    setupContactForm();

    // Scroll Animations
    setupScrollAnimations();
});

// Particles Background - Further optimized for performance
function createParticles() {
    const particlesContainer = document.getElementById('particles-js');
    // Reduced particle count even further for better performance
    const particleCount = 15;
    
    // Create particles in a document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(102, 126, 234, 0.2);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 30 + 20}s infinite linear;
            will-change: transform;
        `;
        fragment.appendChild(particle);
    }
    
    // Append all particles at once
    particlesContainer.appendChild(fragment);

    // Add animation styles if they don't already exist
    if (!document.getElementById('particle-animation-style')) {
        const style = document.createElement('style');
        style.id = 'particle-animation-style';
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translate3d(0, 100vh, 0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.2;
                }
                90% {
                    opacity: 0.2;
                }
                100% {
                    transform: translate3d(0, -100vh, 0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Optimized AOS (Animate On Scroll) Implementation
function initAOS() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                // Use requestAnimationFrame for better performance
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, delay);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Skills Progress Bar Animation
function animateSkillBars() {
    const skillSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress-bar');
    let skillsAnimated = false;

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                progressBars.forEach((bar, index) => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, index * 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillObserver.observe(skillSection);
}

// Contact Form Functionality with EmailJS
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    // Initialize EmailJS
    emailjs.init({
        publicKey: 'OA47HUZxRvHgko80ssSR-', // Your EmailJS public key
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const submitButton = document.getElementById('submitBtn');
        const originalText = submitButton.textContent;
        const formData = new FormData(form);
        
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_name: 'Mayur Chaudhari', // Your name
        };
        
        // Basic validation
        if (!templateParams.from_name || !templateParams.from_email || !templateParams.subject || !templateParams.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(templateParams.from_email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Update button state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Send email using EmailJS
        emailjs.send('default_service', 'template_txhvoud', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                showNotification('Failed to send message. Please try again or email me directly.', 'error');
            })
            .finally(function() {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(45deg, #4CAF50, #45a049);' : ''}
        ${type === 'error' ? 'background: linear-gradient(45deg, #f44336, #da190b);' : ''}
        ${type === 'info' ? 'background: linear-gradient(45deg, #667eea, #764ba2);' : ''}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Highly optimized scroll animations
function setupScrollAnimations() {
    let ticking = false;
    let lastScrollY = 0;
    const scrollThreshold = 10; // Only update if scrolled more than this amount
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        // Only update if scroll position changed significantly
        if (Math.abs(scrolled - lastScrollY) > scrollThreshold) {
            const parallax = document.querySelector('.hero');
            if (parallax && scrolled < window.innerHeight) {
                // Use transform3d for hardware acceleration
                parallax.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
            }
            lastScrollY = scrolled;
        }
        ticking = false;
    }

    // Throttled scroll event with passive flag for better performance
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    // Optimized project cards animation with better performance
    const projectCards = document.querySelectorAll('.project-card');
    
    // Use a single IntersectionObserver for all cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Apply styles directly without setTimeout for better performance
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate3d(0, 0, 0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is in view
    });

    // Set initial styles and observe all cards at once
    for (let i = 0; i < projectCards.length; i++) {
        const card = projectCards[i];
        card.style.opacity = '0';
        card.style.transform = 'translate3d(0, 30px, 0)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        cardObserver.observe(card);
    }
}

// Simplified hero text animation for better performance
window.addEventListener('load', () => {
    // Use a single animation instead of typing effect for better performance
    const heroElements = document.querySelectorAll('.hero-name, .hero-profession, .hero-tagline');
    
    if (heroElements.length) {
        // Add fade-in animation to all hero text elements
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            // Stagger the animations
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 500 + (index * 300));
        });
    }
});

// Optimized reveal animation for sections
function revealSection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                entry.target.classList.add('revealed');
            });
            observer.unobserve(entry.target);
        }
    });
}

// Add revealed class styling
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyle);

// Apply reveal animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const revealObserver = new IntersectionObserver(revealSection, {
        threshold: 0.15
    });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
        revealObserver.observe(section);
    });
});

// Simplified interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
    // Optimized click effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Simple scale effect instead of ripple
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Remove cursor trail for better performance
// Cursor trail disabled for performance optimization

// Optimized scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        z-index: 9999;
        will-change: width;
    `;
    document.body.appendChild(progressBar);
    
    let progressTicking = false;
    
    function updateProgress() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
        progressTicking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!progressTicking) {
            requestAnimationFrame(updateProgress);
            progressTicking = true;
        }
    }, { passive: true });
}

// Initialize scroll progress
createScrollProgress();

// Removed easter egg for better performance
