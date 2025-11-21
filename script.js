// ===============================================
// SMOOTH SCROLLING
// ===============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===============================================
// NAVBAR SCROLL EFFECT
// ===============================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===============================================
// MOBILE MENU TOGGLE
// ===============================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// ===============================================
// SCROLL ANIMATIONS
// ===============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.identity-card, .service-card, .pathway-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===============================================
// DATA FLOW ANIMATION
// ===============================================

const dataNodes = document.querySelectorAll('.data-node');
const connectionLines = document.querySelectorAll('.connection-line');

// Add dynamic glow effect on hover
dataNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
        node.style.transform = 'scale(1.2)';
        node.style.boxShadow = '0 0 50px rgba(99, 102, 241, 0.6)';
    });
    
    node.addEventListener('mouseleave', () => {
        node.style.transform = 'scale(1)';
        node.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.3)';
    });
});

// ===============================================
// COUNTER ANIMATION (if you want to add stats)
// ===============================================

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

// ===============================================
// ENHANCED CARD INTERACTIONS
// ===============================================

const cards = document.querySelectorAll('.identity-card, .service-card, .pathway-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transition = 'all 0.3s ease';
    });
    
    // Add subtle tilt effect on mouse move
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===============================================
// PIPELINE STAGE ANIMATION
// ===============================================

const pipelineStages = document.querySelectorAll('.pipeline-stage');

const pipelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 1s ease forwards';
        }
    });
}, { threshold: 0.5 });

pipelineStages.forEach(stage => {
    pipelineObserver.observe(stage);
});

// ===============================================
// PARALLAX EFFECT FOR HERO VISUAL
// ===============================================

window.addEventListener('scroll', () => {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
});

// ===============================================
// FORM VALIDATION (if you add a contact form)
// ===============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===============================================
// TYPING EFFECT FOR HERO TITLE (OPTIONAL)
// ===============================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===============================================
// LAZY LOADING FOR IMAGES (if you add images)
// ===============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ===============================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===============================================
// CURSOR TRAIL EFFECT (OPTIONAL - SUBTLE)
// ===============================================

class CursorTrail {
    constructor() {
        this.dots = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        // Create dots
        for (let i = 0; i < 10; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            dot.style.cssText = `
                position: fixed;
                width: 5px;
                height: 5px;
                background: rgba(99, 102, 241, ${0.8 - i * 0.08});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.2s ease;
            `;
            document.body.appendChild(dot);
            this.dots.push({ element: dot, x: 0, y: 0 });
        }
        
        // Track mouse
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Animate
        this.animate();
    }
    
    animate() {
        let x = this.mouse.x;
        let y = this.mouse.y;
        
        this.dots.forEach((dot, index) => {
            dot.element.style.left = x + 'px';
            dot.element.style.top = y + 'px';
            
            dot.x = x;
            dot.y = y;
            
            const nextDot = this.dots[index + 1] || this.dots[0];
            x += (nextDot.x - x) * 0.3;
            y += (nextDot.y - y) * 0.3;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor trail (uncomment if desired)
// new CursorTrail();

// ===============================================
// CONSOLE MESSAGE
// ===============================================

console.log('%c🚀 Welcome to Entropy AI Lab', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cBuilt with a Data-First approach', 'font-size: 14px; color: #64748b;');

// ===============================================
// PERFORMANCE OPTIMIZATION
// ===============================================

// Debounce function for scroll events
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

// Apply debounce to scroll handlers if needed
const debouncedScroll = debounce(() => {
    // Your scroll logic here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===============================================
// SIMULATION DASHBOARD ANIMATIONS
// ===============================================

// Animate metric values on scroll into view
const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const metricValue = entry.target.querySelector('.metric-value');
            if (metricValue && !metricValue.classList.contains('animated')) {
                metricValue.classList.add('animated');
                const targetValue = parseInt(metricValue.textContent.replace(/,/g, ''));
                animateCounter(metricValue, targetValue, 1500);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.metric-card').forEach(card => {
    metricObserver.observe(card);
});

// Animate graph bars sequentially
const graphObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.graph-bar');
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.animation = `growBar 0.8s ease-out forwards`;
                }, index * 100);
            });
            graphObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const dashboardGraph = document.querySelector('.dashboard-graph');
if (dashboardGraph) {
    graphObserver.observe(dashboardGraph);
}

// Add hover effect to simulation features
document.querySelectorAll('.sim-feature').forEach(feature => {
    feature.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Update counter animation function to handle commas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const hasDecimal = target.toString().includes('.');
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            if (hasDecimal) {
                element.textContent = target.toFixed(1);
            } else {
                element.textContent = target.toLocaleString();
            }
            clearInterval(timer);
        } else {
            if (hasDecimal) {
                element.textContent = start.toFixed(1);
            } else {
                element.textContent = Math.floor(start).toLocaleString();
            }
        }
    }, 16);
}

