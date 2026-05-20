/* ============================================
   CONSTRUCTA - Main JavaScript
   Arquitectura e Ingeniería Integral
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initNavigation();
    initMobileMenu();
    initThemeToggle();
    initScrollAnimations();
    initCounterAnimation();
    initProjectTiles();
    initProjectFilter();
    initProcessPhases();
    initContactForm();
    initSmoothScroll();
});

/* Loading Screen */
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingPercent = document.querySelector('.loading-percent');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = '';
            }, 500);
        }
        loadingPercent.textContent = Math.floor(progress) + '%';
    }, 100);

    document.body.style.overflow = 'hidden';
}

/* Navigation */
function initNavigation() {
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Show nav after hero
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
            nav.classList.remove('nav-hidden');
        } else {
            nav.classList.remove('scrolled');
        }

        // Active section
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const id = section.getAttribute('id');

            if (rect.top <= 150 && rect.bottom >= 150) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });

        lastScroll = currentScroll;
    });
}

/* Mobile Menu */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');

        const spans = menuToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        });
    });
}

/* Theme Toggle */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/* Scroll Animations */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate metric circles
                const metrics = entry.target.querySelectorAll('.metric-progress');
                metrics.forEach(metric => {
                    const target = metric.getAttribute('data-target');
                    const circumference = 2 * Math.PI * 45;
                    const offset = circumference - (target / 100) * circumference;
                    metric.style.strokeDashoffset = offset;
                });
            }
        });
    }, observerOptions);

    // Add reveal class to elements
    const revealElements = document.querySelectorAll('.section-header, .project-tile, .service-card, .calc-group, .contact-item');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/* Counter Animation */
function initCounterAnimation() {
    const statItems = document.querySelectorAll('.stat-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                const numberEl = entry.target.querySelector('.stat-number');
                animateCounter(numberEl, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(item => observer.observe(item));
}

function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

/* Project Tiles */
function initProjectTiles() {
    const tiles = document.querySelectorAll('.project-tile');

    tiles.forEach(tile => {
        tile.addEventListener('click', (e) => {
            if (e.target.closest('.btn-close-expand')) return;

            const isExpanded = tile.classList.contains('expanded');

            // Close all tiles
            tiles.forEach(t => {
                t.classList.remove('expanded');
                t.style.gridColumn = '';
            });

            // Expand clicked tile
            if (!isExpanded) {
                tile.classList.add('expanded');

                // Scroll to tile
                setTimeout(() => {
                    tile.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    });

    // Close button
    document.querySelectorAll('.btn-close-expand').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tile = btn.closest('.project-tile');
            tile.classList.remove('expanded');
        });
    });
}

/* Project Filter */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tiles = document.querySelectorAll('.project-tile');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tiles.forEach(tile => {
                const category = tile.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    tile.classList.remove('hidden');
                    tile.style.animation = 'fadeIn 0.5s ease';
                } else {
                    tile.classList.add('hidden');
                }

                tile.classList.remove('expanded');
            });
        });
    });
}

/* Process Phases */
function initProcessPhases() {
    const nodes = document.querySelectorAll('.timeline-node');
    const phases = document.querySelectorAll('.phase-content');
    const dots = document.querySelectorAll('.process-dot');
    const prevBtn = document.getElementById('prev-phase');
    const nextBtn = document.getElementById('next-phase');
    const progress = document.getElementById('timeline-progress');

    let currentPhase = 1;
    const totalPhases = 4;

    function goToPhase(phase) {
        currentPhase = phase;

        // Update nodes
        nodes.forEach(node => {
            const nodePhase = parseInt(node.getAttribute('data-phase'));
            node.classList.toggle('active', nodePhase === phase);
        });

        // Update phases
        phases.forEach(p => {
            const pPhase = parseInt(p.getAttribute('data-phase'));
            p.classList.toggle('active', pPhase === phase);
        });

        // Update dots
        dots.forEach(dot => {
            const dotPhase = parseInt(dot.getAttribute('data-phase'));
            dot.classList.toggle('active', dotPhase === phase);
        });

        // Update progress
        const progressPercent = ((phase - 1) / (totalPhases - 1)) * 100;
        progress.style.width = progressPercent + '%';

        // Update buttons
        prevBtn.disabled = phase === 1;
        nextBtn.disabled = phase === totalPhases;
    }

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            goToPhase(parseInt(node.getAttribute('data-phase')));
        });
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToPhase(parseInt(dot.getAttribute('data-phase')));
        });
    });

    prevBtn.addEventListener('click', () => {
        if (currentPhase > 1) goToPhase(currentPhase - 1);
    });

    nextBtn.addEventListener('click', () => {
        if (currentPhase < totalPhases) goToPhase(currentPhase + 1);
    });

    // Initialize
    goToPhase(1);
}

/* Contact Form */
function initContactForm() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show success message
        showToast('Mensaje enviado', 'Gracias por contactarnos. Te responderemos pronto.', 'success');

        form.reset();
    });
}

/* Toast Notification */
function showToast(title, message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">×</button>
    `;

    container.appendChild(toast);

    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
    });

    setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

/* Smooth Scroll */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* Parallax Effect */
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 0.5;
        const yPos = -(window.pageYOffset * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
});

/* Magnetic Button Effect */
document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

/* Text Scramble Effect */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span style="color: var(--accent)">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

/* Initialize Text Scramble on hover */
document.querySelectorAll('.scramble-text').forEach(el => {
    const fx = new TextScramble(el);
    const originalText = el.innerText;

    el.addEventListener('mouseenter', () => {
        fx.setText(originalText);
    });
});

/* Cursor Effect */
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease, opacity 0.15s ease;
    mix-blend-mode: difference;
`;
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
cursorDot.style.cssText = `
    position: fixed;
    width: 4px;
    height: 4px;
    background: var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
`;
document.body.appendChild(cursorDot);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursorDot.style.left = e.clientX - 2 + 'px';
    cursorDot.style.top = e.clientY - 2 + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

/* Hide cursor on touch devices */
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
}

/* Keyboard Navigation */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }

        // Close expanded tiles
        document.querySelectorAll('.project-tile.expanded').forEach(tile => {
            tile.classList.remove('expanded');
        });
    }
});

/* Performance: Pause animations when tab is hidden */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.classList.add('paused');
    } else {
        document.body.classList.remove('paused');
    }
});

/* Preload critical resources */
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
    });
}

window.addEventListener('load', preloadImages);
