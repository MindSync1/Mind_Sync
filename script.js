// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

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
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// FAQ Category Tabs
document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');
        
        // Remove active class from all tabs and categories
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.faq-category').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding category
        tab.classList.add('active');
        document.getElementById(category).classList.add('active');
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('يرجى ملء جميع الحقول المطلوبة');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('يرجى إدخال بريد إلكتروني صحيح');
            return;
        }
        
        // Show success message (in a real application, you would send this to a server)
        alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
        this.reset();
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 51, 102, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 51, 102, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .info-card, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Floating cards animation enhancement
document.addEventListener('DOMContentLoaded', () => {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 10;
            const randomY = (Math.random() - 0.5) * 10;
            card.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
    });
});

// Service cards hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Testimonial cards auto-rotation (if more than 2 testimonials)
const testimonialCards = document.querySelectorAll('.testimonial-card');
if (testimonialCards.length > 2) {
    let currentTestimonial = 0;
    
    setInterval(() => {
        testimonialCards.forEach(card => card.style.opacity = '0.7');
        testimonialCards[currentTestimonial].style.opacity = '1';
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }, 4000);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    floatingCards.forEach((card, index) => {
        card.style.transform = `translateY(${scrolled * (0.3 + index * 0.1)}px)`;
    });
});

// Form field focus effects
document.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('focus', () => {
        field.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', () => {
        if (!field.value) {
            field.parentElement.classList.remove('focused');
        }
    });
});

// Add CSS for focus effects
const style = document.createElement('style');
style.textContent = `
    .form-group.focused label {
        color: #66CCFF;
        transform: translateY(-5px);
        font-size: 0.9rem;
    }
    
    .form-group label {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

/* ===============================
   Block Inspect Element + Modern Alert
   =============================== */

// Detect and block right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showCustomAlert('❌ هذا الإجراء غير مسموح به على هذا الموقع');
});

// Block all common DevTools shortcuts
document.addEventListener('keydown', (e) => {
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) || // DevTools
        (e.ctrlKey && ['U', 'S'].includes(e.key.toUpperCase())) // View Source & Save
    ) {
        e.preventDefault();
        showCustomAlert('⚠️ هذا الإجراء غير مسموح به على هذا الموقع');
    }
});

/* ===============================
   Detect if DevTools is Open
   =============================== */
let devToolsOpen = false;

function detectDevTools() {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
        if (!devToolsOpen) {
            devToolsOpen = true;
            lockPage();
        }
    } else {
        devToolsOpen = false;
    }
}

setInterval(detectDevTools, 1000);

/* ===============================
   Lock Page When DevTools Opened
   =============================== */
function lockPage() {
    // Remove all content
    document.body.innerHTML = `
        <div class="locked-page">
            <h1>🚫 تم حظر الموقع</h1>
            <p>تم اكتشاف محاولتك لفتح أدوات المطور.</p>
            <p>لأسباب أمنية، لا يمكنك الوصول إلى هذه الصفحة.</p>
        </div>
    `;

    // Style locked page
    const lockStyle = document.createElement('style');
    lockStyle.textContent = `
        body {
            background: #0d1117;
            color: #fff;
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
        }
        .locked-page h1 {
            color: #ff4444;
            font-size: 2.5rem;
        }
        .locked-page p {
            font-size: 1.2rem;
            margin-top: 10px;
        }
    `;
    document.head.appendChild(lockStyle);
}

/* ===============================
   Custom Modern Alert
   =============================== */
function showCustomAlert(message) {
    if (document.querySelector('.custom-alert')) return;

    const alertBox = document.createElement('div');
    alertBox.className = 'custom-alert';
    alertBox.innerHTML = `
        <div class="alert-content">
            <span class="alert-message">${message}</span>
            <button class="alert-close">حسناً</button>
        </div>
    `;
    document.body.appendChild(alertBox);

    // Animate in
    setTimeout(() => {
        alertBox.style.opacity = '1';
        alertBox.style.transform = 'translateY(0)';
    }, 50);

    // Close button
    alertBox.querySelector('.alert-close').addEventListener('click', () => {
        alertBox.style.opacity = '0';
        alertBox.style.transform = 'translateY(-20px)';
        setTimeout(() => alertBox.remove(), 300);
    });
}

// Custom Alert Styles
const customAlertStyle = document.createElement('style');
customAlertStyle.textContent = `
.custom-alert {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-20px);
    background: rgba(255, 255, 255, 0.98);
    color: #003366;
    border: 1px solid #66ccff;
    box-shadow: 0 4px 15px rgba(0, 51, 102, 0.2);
    border-radius: 12px;
    padding: 15px 25px;
    font-size: 16px;
    font-weight: bold;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 9999;
    max-width: 300px;
    text-align: center;
}

.alert-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.alert-message {
    font-size: 1rem;
}

.alert-close {
    padding: 6px 14px;
    background: #66ccff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    font-weight: bold;
    transition: background 0.3s ease;
}

.alert-close:hover {
    background: #3399ff;
}
`;
document.head.appendChild(customAlertStyle);
