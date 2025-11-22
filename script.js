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
// LIVE METRICS ANIMATION
// ===============================================

function animateLiveMetrics() {
    const metricValues = document.querySelectorAll('.data-metrics-live .metric-value');
    
    metricValues.forEach(valueEl => {
        const target = parseFloat(valueEl.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateValue = () => {
            current += increment;
            if (current < target) {
                if (target > 1000) {
                    valueEl.textContent = Math.floor(current).toLocaleString();
                } else if (target === 24) {
                    // For the 24/7 metric, show whole number without decimal
                    valueEl.textContent = Math.floor(current);
                } else {
                    valueEl.textContent = current.toFixed(1);
                }
                requestAnimationFrame(updateValue);
            } else {
                if (target > 1000) {
                    valueEl.textContent = target.toLocaleString();
                } else if (target === 24) {
                    // For the 24/7 metric, show whole number without decimal
                    valueEl.textContent = Math.floor(target);
                } else {
                    valueEl.textContent = target.toFixed(1);
                }
            }
        };
        
        updateValue();
    });
}

// Trigger animation when hero section is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateLiveMetrics();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    heroObserver.observe(heroSection);
}

// ===============================================
// REAL-TIME DATA FLOW CHART
// ===============================================

class DataFlowChart {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.dataPoints = [];
        this.maxPoints = 50;
        this.time = 0;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    generateDataPoint() {
        // Simulate real-time data with sine wave + random noise
        const baseValue = Math.sin(this.time * 0.05) * 30 + 50;
        const noise = (Math.random() - 0.5) * 20;
        return Math.max(10, Math.min(90, baseValue + noise));
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Add new data point
        if (this.dataPoints.length >= this.maxPoints) {
            this.dataPoints.shift();
        }
        this.dataPoints.push(this.generateDataPoint());
        this.time++;
        
        // Draw grid
        this.drawGrid();
        
        // Draw data line
        this.drawDataLine();
        
        // Draw glow effect
        this.drawGlow();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawGrid() {
        const gridColor = 'rgba(129, 140, 248, 0.1)';
        const gridSpacing = 40;
        
        this.ctx.strokeStyle = gridColor;
        this.ctx.lineWidth = 1;
        
        // Horizontal lines
        for (let y = 0; y < this.canvas.height; y += gridSpacing) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
        
        // Vertical lines
        for (let x = 0; x < this.canvas.width; x += gridSpacing) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
    }
    
    drawDataLine() {
        if (this.dataPoints.length < 2) return;
        
        const xStep = this.canvas.width / (this.maxPoints - 1);
        
        // Draw line
        this.ctx.strokeStyle = 'rgba(129, 140, 248, 0.8)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        this.dataPoints.forEach((value, index) => {
            const x = index * xStep;
            const y = this.canvas.height - (value / 100 * this.canvas.height);
            
            if (index === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });
        
        this.ctx.stroke();
        
        // Draw area fill
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height);
        this.ctx.closePath();
        
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, 'rgba(129, 140, 248, 0.3)');
        gradient.addColorStop(1, 'rgba(129, 140, 248, 0.05)');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    drawGlow() {
        if (this.dataPoints.length === 0) return;
        
        const lastValue = this.dataPoints[this.dataPoints.length - 1];
        const x = this.canvas.width;
        const y = this.canvas.height - (lastValue / 100 * this.canvas.height);
        
        // Draw glowing point
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = 'rgba(129, 140, 248, 0.8)';
        this.ctx.fillStyle = 'rgba(129, 140, 248, 1)';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }
}

// Initialize chart when visible
const chartCanvas = document.getElementById('dataFlowChart');
if (chartCanvas) {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                new DataFlowChart('dataFlowChart');
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    chartObserver.observe(chartCanvas);
}

// ===============================================
// PARTICLE ANIMATION SYSTEM
// ===============================================

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.connectionDistance = 150;
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Track mouse movement
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
        
        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas.width, this.canvas.height));
        }
        
        this.animate();
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.update(this.canvas.width, this.canvas.height, this.mouse);
            particle.draw(this.ctx);
        });
        
        // Draw connections
        this.drawConnections();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const opacity = 1 - (distance / this.connectionDistance);
                    this.ctx.strokeStyle = `rgba(129, 140, 248, ${opacity * 0.2})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

class Particle {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.originalRadius = this.radius;
    }
    
    update(width, height, mouse) {
        // Boundary check
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        
        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                this.vx -= Math.cos(angle) * force * 0.2;
                this.vy -= Math.sin(angle) * force * 0.2;
                this.radius = this.originalRadius * (1 + force);
            } else {
                this.radius = this.originalRadius;
            }
        }
        
        this.x += this.vx;
        this.y += this.vy;
        
        // Friction
        this.vx *= 0.99;
        this.vy *= 0.99;
    }
    
    draw(ctx) {
        ctx.fillStyle = 'rgba(129, 140, 248, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(129, 140, 248, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// Initialize particle system
if (document.getElementById('particleCanvas')) {
    const particleSystem = new ParticleSystem('particleCanvas');
}

// ===============================================
// BINARY RAIN EFFECT
// ===============================================

function createBinaryRain() {
    const sections = document.querySelectorAll('.dual-strategy, .services');
    
    sections.forEach(section => {
        const rainContainer = document.createElement('div');
        rainContainer.className = 'binary-rain';
        section.style.position = 'relative';
        section.insertBefore(rainContainer, section.firstChild);
        
        // Create falling binary digits
        setInterval(() => {
            if (Math.random() > 0.7) {
                const digit = document.createElement('div');
                digit.className = 'binary-digit';
                digit.textContent = Math.random() > 0.5 ? '1' : '0';
                digit.style.left = Math.random() * 100 + '%';
                digit.style.animationDuration = (Math.random() * 3 + 2) + 's';
                rainContainer.appendChild(digit);
                
                setTimeout(() => digit.remove(), 5000);
            }
        }, 200);
    });
}

// Initialize binary rain
createBinaryRain();

// ===============================================
// FLOATING DATA PARTICLES
// ===============================================

function createFloatingParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        heroSection.appendChild(particle);
        
        setTimeout(() => particle.remove(), 8000);
    }, 500);
}

// Initialize floating particles
createFloatingParticles();

// ===============================================
// DATA FLOW LINES IN DASHBOARD
// ===============================================

function animateDashboardDataFlow() {
    const dashboard = document.querySelector('.sim-dashboard');
    if (!dashboard) return;
    
    setInterval(() => {
        const dataPoint = document.createElement('div');
        dataPoint.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(129, 140, 248, 0.8);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: 0;
            pointer-events: none;
            animation: flowRight 2s ease-in-out forwards;
        `;
        dashboard.style.position = 'relative';
        dashboard.style.overflow = 'hidden';
        dashboard.appendChild(dataPoint);
        
        setTimeout(() => dataPoint.remove(), 2000);
    }, 300);
}

// Add flow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes flowRight {
        0% { transform: translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateX(500px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize dashboard data flow
const dashboardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateDashboardDataFlow();
            dashboardObserver.unobserve(entry.target);
        }
    });
});

const simDashboard = document.querySelector('.sim-dashboard');
if (simDashboard) {
    dashboardObserver.observe(simDashboard);
}

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

// ===============================================
// NEWSLETTER FORM HANDLING
// ===============================================

const newsletterForm = document.getElementById('newsletterForm');
const formMessage = document.getElementById('formMessage');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('.email-input');
        const email = emailInput.value.trim();
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Disable button and show loading state
        const submitBtn = this.querySelector('.subscribe-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Subscribing...</span>';
        
        try {
            // Send subscription request to API
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                showFormMessage('✓ Successfully subscribed! Check your email for confirmation.', 'success');
                emailInput.value = '';
                
                // Optional: Track conversion with analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'newsletter_subscription', {
                        'event_category': 'engagement',
                        'event_label': 'newsletter'
                    });
                }
            } else {
                showFormMessage(data.error || '× Subscription failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Subscription error:', error);
            showFormMessage('× Connection error. Please check your internet and try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }
}

