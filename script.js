/* ============================================
   PREMIUM JAVASCRIPT - ALL INTERACTIVE FEATURES
   Award-Winning One-Page Website
   ============================================ */

// ============================================
// INITIALIZE AOS (Animate On Scroll)
// ============================================
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 50,
    mirror: false,
    anchorPlacement: 'top-bottom'
});

// Refresh AOS on window resize
window.addEventListener('resize', () => {
    AOS.refresh();
});

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const body = document.body;

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// ============================================
// STICKY HEADER WITH SCROLL EFFECT
// ============================================
const header = document.querySelector('.header');
let lastScroll = 0;
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ACTIVE NAV LINK HIGHLIGHT ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);


/*
// ============================================
// COUNTER ANIMATION (STATS SECTION)
// ============================================
const counters = document.querySelectorAll('.counter');
const counterSpeed = 200;
let counterAnimated = false;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / counterSpeed;

    const updateCounter = () => {
        const count = +counter.innerText;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 10);
        } else {
            counter.innerText = target;
        }
    };
    
    updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            counters.forEach(counter => animateCounter(counter));
            counterAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (counters.length > 0) {
    counterObserver.observe(counters[0].closest('.hero-stats'));
}

*/

// ============================================
// SERVICE CATEGORY FILTERING
// ============================================
const categoryTabs = document.querySelectorAll('.category-tab');
const serviceCards = document.querySelectorAll('.service-mega-card');

categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');
        
        // Update active tab
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Filter service cards with animation
        serviceCards.forEach((card, index) => {
            const cardCategories = card.getAttribute('data-category').split(' ');
            
            if (category === 'all' || cardCategories.includes(category)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Re-initialize AOS for filtered cards
        setTimeout(() => {
            AOS.refresh();
        }, 400);
    });
});

// Set initial card styles
serviceCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
});

// ============================================
// WHATSAPP INTEGRATION WITH SERVICE MESSAGES
// ============================================
function openWhatsApp(serviceName) {
    const phoneNumber = '919893330505';
    
    const messages = {
        'Income Tax Return Filing': `Hello! I would like to file my Income Tax Return for FY 2024-25. Can you please assist me with the process and pricing?`,
        'NRI Tax Filing': `Hello! I am an NRI and need help with tax filing in India. Can you provide guidance on DTAA benefits and ITR filing?`,
        'Capital Gains Filing': `Hello! I need assistance with capital gains tax filing for stocks/mutual funds/property. Please share more details.`,
        'GST Services': `Hello! I need help with GST registration and filing. Can you provide information about your monthly compliance packages?`,
        'TDS Filing': `Hello! I require TDS filing services including quarterly returns and Form 16 generation. Please share details.`,
        'TDS on Property': `Hello! I need to file Form 26QB for TDS on property purchase. Can you help me with this?`,
        'Company Registration': `Hello! I want to register a Private Limited Company / LLP. Please guide me through the process and pricing.`,
        'Trademark Registration': `Hello! I need to register a trademark for my brand. Can you help with the complete process?`,
        'FSSAI Food License': `Hello! I need FSSAI license for my food business. Please share requirements and pricing.`,
        'MSME Registration': `Hello! I want to register for MSME/Udyam certificate. Can you assist me?`,
        'Shop Act License': `Hello! I need Shop & Establishment License / Trade License for my business. Please provide information.`,
        'IEC Registration': `Hello! I need Import Export Code (IEC) for my business. Can you help with the registration?`,
        'Statutory Audit': `Hello! I need statutory audit services for my company. Please share your audit packages and pricing.`,
        'Tax Audit': `Hello! I require tax audit under Section 44AB. Can you provide details about your tax audit services?`,
        'Accounting Services': `Hello! I need accounting and bookkeeping services for my business. Please share monthly packages.`,
        'PF ESI Registration': `Hello! I need PF and ESI registration for my company. Can you help with compliance?`,
        'Tax Notice': `Hello! I have received an income tax notice. I need expert help to respond. Can you assist?`,
        'Tax Planning': `Hello! I want personalized tax planning to minimize my tax liability legally. Please provide consultation.`,
        'CMA Data': `Hello! I need CMA report and financial projections for a bank loan. Can you prepare this?`,
        'Property Valuation': `Hello! I need professional property valuation services. Please share details and charges.`,
        'Portfolio Analysis': `Hello! I want portfolio analysis and wealth building strategies. Can you help?`,
        'CFO Services': `Hello! I am interested in Virtual CFO services for my business. Please share packages and benefits.`,
        'Digital Signature': `Hello! I need a Digital Signature Certificate (DSC). Please provide pricing for Class 2/3 DSC.`,
        'Basic ITR Package - ₹499': `Hello! I want to file my Income Tax Return under your Basic ITR package (₹499). Please help me get started.`,
        'Advanced ITR Package - ₹1,999': `Hello! I am interested in your Advanced ITR package (₹1,999) for business/capital gains. Please assist.`,
        'Business Combo Package - ₹4,999': `Hello! I want to subscribe to your Business Combo package (₹4,999/month). Please share complete details.`
    };

    const message = messages[serviceName] || `Hello! I would like to inquire about ${serviceName}. Please provide more information and pricing.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}

// Make function globally accessible
window.openWhatsApp = openWhatsApp;

// ============================================
// FAQ ACCORDION
// ============================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || name.length < 3) {
            showNotification('Please enter your full name (minimum 3 characters)', 'error');
            return;
        }
        
        if (!email || !isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (!phone || !isValidPhone(phone)) {
            showNotification('Please enter a valid 10-digit phone number', 'error');
            return;
        }
        
        if (!service) {
            showNotification('Please select a service', 'error');
            return;
        }
        
        // Create WhatsApp message
        const whatsappMessage = `
*New Website Inquiry - Contact Form*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Service Required:* ${service}
${message ? `*Message:* ${message}` : ''}

*Source:* Website Contact Form
*Timestamp:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        `.trim();
        
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/919893330505?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Reset form
        contactForm.reset();
        
        // Show success notification
        showNotification('Thank you! Your inquiry has been sent successfully. We will contact you shortly.', 'success');
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation (Indian mobile numbers)
function isValidPhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    
    const icon = type === 'success' 
        ? '<i class="fas fa-check-circle"></i>' 
        : '<i class="fas fa-exclamation-circle"></i>';
    
    const bgColor = type === 'success' 
        ? 'linear-gradient(135deg, #10B981, #059669)' 
        : 'linear-gradient(135deg, #EF4444, #DC2626)';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${bgColor};
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 400px;
        font-size: 0.95rem;
    `;
    
    notification.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Add notification animations to stylesheet
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .notification-toast {
            right: 15px !important;
            left: 15px !important;
            max-width: calc(100% - 30px) !important;
            top: 80px !important;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// PARALLAX EFFECT FOR BACKGROUND SHAPES
// ============================================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.2;
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// ============================================
// SERVICE CARD HOVER EFFECTS
// ============================================
const serviceCardsHover = document.querySelectorAll('.service-mega-card');

serviceCardsHover.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// PRICING CARD HIGHLIGHT
// ============================================
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('featured')) {
            pricingCards.forEach(c => {
                if (c !== this && !c.classList.contains('featured')) {
                    c.style.opacity = '0.6';
                }
            });
        }
    });
    
    card.addEventListener('mouseleave', function() {
        pricingCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// ============================================
// LAZY LOADING FOR IMAGES (IF NEEDED)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// PREVENT FORM RESUBMISSION ON PAGE RELOAD
// ============================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Trigger counter animation if stats are in viewport
    if (counters.length > 0 && !counterAnimated) {
        const statsSection = counters[0].closest('.hero-stats');
        const rect = statsSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            counters.forEach(counter => animateCounter(counter));
            counterAnimated = true;
        }
    }
});

// ============================================
// TYPING EFFECT FOR HERO SUBTITLE (OPTIONAL)
// ============================================
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle && heroSubtitle.dataset.typing === 'true') {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < text.length) {
            heroSubtitle.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// ============================================
// TESTIMONIAL SLIDER AUTO-PLAY (OPTIONAL)
// ============================================
const testimonialCards = document.querySelectorAll('.testimonial-card-new');
let currentTestimonial = 0;

function rotateTestimonials() {
    if (testimonialCards.length > 3) {
        testimonialCards.forEach((card, index) => {
            card.style.transition = 'opacity 0.5s ease';
            if (index >= currentTestimonial && index < currentTestimonial + 3) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 500);
            }
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }
}

// Auto-rotate testimonials every 5 seconds (disabled by default)
// setInterval(rotateTestimonials, 5000);

// ============================================
// CONSOLE BRANDING & SECURITY MESSAGE
// ============================================
console.log(
    '%c🏆 CA Sunil Patel & Associates', 
    'color: #0052FF; font-size: 28px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,82,255,0.3);'
);
console.log(
    '%cIndia\'s Premier Tax & Compliance Platform', 
    'color: #6B7280; font-size: 16px; font-weight: 600; margin-top: 10px;'
);
console.log(
    '%c📞 Contact: +91 98933 30505', 
    'color: #10B981; font-size: 14px; margin-top: 5px;'
);
console.log(
    '%c⚠️ Warning: Do not paste any code here. This console is for developers only.', 
    'color: #EF4444; font-size: 14px; font-weight: bold; margin-top: 15px;'
);

// ============================================
// PERFORMANCE MONITORING
// ============================================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const timing = window.performance.timing;
            const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #10B981; font-weight: bold;');
        }, 0);
    });
}

// ============================================
// EASTER EGG - KONAMI CODE (OPTIONAL FUN)
// ============================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiPattern.length);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        showNotification('🎉 Konami Code Activated! You found the Easter Egg!', 'success');
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ============================================
// KEYBOARD ACCESSIBILITY ENHANCEMENTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = '';
    }
});

// ============================================
// DYNAMIC COPYRIGHT YEAR
// ============================================
const currentYear = new Date().getFullYear();
const copyrightElements = document.querySelectorAll('.footer-bottom-new p');
copyrightElements.forEach(element => {
    element.innerHTML = element.innerHTML.replace('2025', currentYear);
});

// ============================================
// DETECT SLOW INTERNET CONNECTION
// ============================================
if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection && connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        console.warn('Slow internet connection detected. Some features may load slower.');
    }
}

// ============================================
// VISIBILITY CHANGE DETECTION
// ============================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('User switched to another tab');
    } else {
        console.log('User returned to the tab');
        AOS.refresh(); // Refresh animations
    }
});

// ============================================
// RIGHT-CLICK PROTECTION (OPTIONAL)
// Uncomment if you want to protect content
// ============================================
/*
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showNotification('Right-click is disabled on this website', 'error');
});

document.addEventListener('selectstart', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});
*/

// ============================================
// ANALYTICS READY (GOOGLE ANALYTICS / FB PIXEL)
// ============================================
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
    
    console.log('Event tracked:', eventName, eventData);
}

// Track button clicks
document.querySelectorAll('.btn, .btn-primary, .btn-service, .btn-pricing').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackEvent('button_click', {
            button_text: buttonText,
            button_class: this.className
        });
    });
});

// Track form submissions
if (contactForm) {
    contactForm.addEventListener('submit', function() {
        trackEvent('form_submit', {
            form_id: 'contact_form'
        });
    });
}

// Track WhatsApp clicks
document.querySelectorAll('[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('whatsapp_click', {
            source: this.className
        });
    });
});

// ============================================
// EXPORT FUNCTIONS FOR EXTERNAL USE
// ============================================
window.CAWebsite = {
    openWhatsApp: openWhatsApp,
    showNotification: showNotification,
    trackEvent: trackEvent
};

// ============================================
// INITIALIZE EVERYTHING ON DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Website fully loaded and interactive');
    
    // Smooth appearance
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
    
    // Trigger AOS refresh
    setTimeout(() => {
        AOS.refresh();
    }, 100);
});

// ============================================
// SERVICE WORKER REGISTRATION (FOR PWA - OPTIONAL)
// ============================================
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
*/

// ============================================
// END OF SCRIPT
// ============================================
console.log('%c🚀 All JavaScript features initialized successfully!', 'color: #10B981; font-weight: bold; font-size: 14px;');
