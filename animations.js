/* ============================================
   CONSTRUCTA - Animation Engine
   Advanced animations and effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initBlueprintAnimations();
    initFoundationAnimation();
    initStructureAnimation();
    initFinishesAnimation();
    initParallaxEffects();
    initMagneticElements();
    initTextReveal();
    initGradientBorder();
    initMorphingShapes();
    initFloatingElements();
    initShimmerEffects();
    initWaveAnimations();
});

/* Blueprint Drawing Animation */
function initBlueprintAnimations() {
    const blueprints = document.querySelectorAll('.blueprint-svg-anim');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lines = entry.target.querySelectorAll('.bp-draw');
                lines.forEach((line, i) => {
                    line.style.animationDelay = `${i * 0.15}s`;
                    line.style.animation = 'drawLine 1s ease forwards';
                });

                const dims = entry.target.querySelector('.bp-dims');
                if (dims) {
                    setTimeout(() => {
                        dims.style.opacity = '1';
                        dims.style.transition = 'opacity 0.5s ease';
                    }, lines.length * 150 + 500);
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    blueprints.forEach(bp => observer.observe(bp));
}

/* Foundation Construction Animation */
function initFoundationAnimation() {
    const foundations = document.querySelectorAll('.foundation-svg');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const svg = entry.target;

                // Excavation
                const excavation = svg.querySelector('.fnd-excavation');
                if (excavation) {
                    excavation.style.animation = 'drawExcavation 1.5s ease forwards';
                }

                // Base
                const base = svg.querySelector('.fnd-base');
                if (base) {
                    setTimeout(() => {
                        base.style.opacity = '1';
                        base.style.transition = 'opacity 0.5s ease';
                    }, 1500);
                }

                // Rebar
                const rebar = svg.querySelector('.fnd-rebar');
                if (rebar) {
                    setTimeout(() => {
                        rebar.style.opacity = '1';
                        rebar.style.transition = 'opacity 0.5s ease';
                    }, 2000);
                }

                // Concrete pour
                const concrete = svg.querySelector('.fnd-concrete');
                if (concrete) {
                    setTimeout(() => {
                        concrete.style.height = '30px';
                        concrete.style.transition = 'height 1.5s ease';
                    }, 2500);
                }

                // Column
                const column = svg.querySelector('.fnd-column');
                if (column) {
                    setTimeout(() => {
                        column.style.opacity = '1';
                        column.style.transition = 'opacity 0.5s ease';
                    }, 4000);
                }

                // Label
                const label = svg.querySelector('.fnd-label');
                if (label) {
                    setTimeout(() => {
                        label.style.opacity = '1';
                        label.style.transition = 'opacity 0.5s ease';
                    }, 4500);
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    foundations.forEach(f => observer.observe(f));
}

/* Structure Assembly Animation */
function initStructureAnimation() {
    const structures = document.querySelectorAll('.structure-svg');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const svg = entry.target;

                // Columns
                const cols = svg.querySelectorAll('.str-col');
                cols.forEach((col, i) => {
                    setTimeout(() => {
                        col.style.opacity = '1';
                        col.style.animation = 'fadeInUp 0.5s ease forwards';
                    }, 500 + i * 200);
                });

                // Beams
                const beams = svg.querySelectorAll('.str-beam');
                beams.forEach((beam, i) => {
                    setTimeout(() => {
                        beam.style.opacity = '1';
                        beam.style.transition = 'opacity 0.5s ease';
                    }, 1000 + i * 300);
                });

                // Second floor columns
                const cols2 = svg.querySelectorAll('.str-col2');
                cols2.forEach((col, i) => {
                    setTimeout(() => {
                        col.style.opacity = '1';
                        col.style.animation = 'fadeInUp 0.5s ease forwards';
                    }, 1500 + i * 200);
                });

                // Slabs
                const slabs = svg.querySelectorAll('.str-slab');
                slabs.forEach((slab, i) => {
                    setTimeout(() => {
                        slab.style.opacity = '1';
                        slab.style.transition = 'opacity 0.5s ease';
                    }, 2000 + i * 200);
                });

                // Roof
                const roof = svg.querySelector('.str-roof');
                if (roof) {
                    setTimeout(() => {
                        roof.style.opacity = '1';
                        roof.style.transition = 'opacity 0.5s ease';
                    }, 2500);
                }

                // Crane
                const crane = svg.querySelector('.str-crane');
                if (crane) {
                    setTimeout(() => {
                        crane.style.opacity = '1';
                        crane.style.transition = 'opacity 0.5s ease';
                    }, 300);
                }

                // Worker
                const worker = svg.querySelector('.str-worker');
                if (worker) {
                    setTimeout(() => {
                        worker.style.opacity = '1';
                        worker.style.transition = 'opacity 0.5s ease';
                    }, 1000);
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    structures.forEach(s => observer.observe(s));
}

/* Finishes Animation */
function initFinishesAnimation() {
    const finishes = document.querySelectorAll('.finishes-svg');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const svg = entry.target;

                // Panels
                const panels = svg.querySelectorAll('.fin-panel');
                panels.forEach((panel, i) => {
                    setTimeout(() => {
                        panel.style.opacity = '1';
                        panel.style.animation = 'panelIn 0.4s ease forwards';
                    }, 100 + i * 100);
                });

                // Windows
                const windows = svg.querySelectorAll('.fin-window');
                windows.forEach((win, i) => {
                    setTimeout(() => {
                        win.style.opacity = '1';
                        win.style.transition = 'opacity 0.5s ease';
                    }, 700 + i * 100);
                });

                // Trees
                const trees = svg.querySelectorAll('.fin-tree');
                trees.forEach((tree, i) => {
                    setTimeout(() => {
                        tree.style.opacity = '1';
                        tree.style.animation = 'treeGrow 0.6s ease forwards';
                    }, 1300 + i * 200);
                });

                // Tree trunks
                const trunks = svg.querySelectorAll('.fin-tree-trunk');
                trunks.forEach((trunk, i) => {
                    setTimeout(() => {
                        trunk.style.opacity = '1';
                        trunk.style.transition = 'opacity 0.3s ease';
                    }, 1300 + i * 200);
                });

                // Paving
                const paving = svg.querySelector('.fin-paving');
                if (paving) {
                    setTimeout(() => {
                        paving.style.opacity = '1';
                        paving.style.transition = 'opacity 0.5s ease';
                    }, 1700);
                }

                // Sign
                const sign = svg.querySelector('.fin-sign');
                if (sign) {
                    setTimeout(() => {
                        sign.style.opacity = '1';
                        sign.style.transition = 'opacity 0.5s ease';
                    }, 1900);
                }

                // Sign text
                const signText = svg.querySelector('.fin-sign-text');
                if (signText) {
                    setTimeout(() => {
                        signText.style.opacity = '1';
                        signText.style.transition = 'opacity 0.5s ease';
                    }, 2100);
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    finishes.forEach(f => observer.observe(f));
}

/* Parallax Effects */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                parallaxElements.forEach(el => {
                    const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
                    const rect = el.getBoundingClientRect();
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * speed;

                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        el.style.transform = `translateY(${rate}px)`;
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* Magnetic Elements */
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');

    magneticElements.forEach(el => {
        const strength = parseFloat(el.getAttribute('data-magnetic')) || 0.3;

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
            el.style.transition = 'transform 0.3s ease';
        });

        el.addEventListener('mouseenter', () => {
            el.style.transition = 'transform 0s';
        });
    });
}

/* Text Reveal Animation */
function initTextReveal() {
    const revealTexts = document.querySelectorAll('[data-reveal-text]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target;
                const originalText = text.textContent;
                const chars = originalText.split('');

                text.innerHTML = chars.map((char, i) => 
                    `<span style="display: inline-block; opacity: 0; transform: translateY(20px); transition: all 0.3s ease ${i * 0.03}s">${char === ' ' ? '&nbsp;' : char}</span>`
                ).join('');

                setTimeout(() => {
                    text.querySelectorAll('span').forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                }, 100);

                observer.unobserve(text);
            }
        });
    }, { threshold: 0.5 });

    revealTexts.forEach(text => observer.observe(text));
}

/* Gradient Border Animation */
function initGradientBorder() {
    const gradientBorders = document.querySelectorAll('[data-gradient-border]');

    gradientBorders.forEach(el => {
        el.style.position = 'relative';
        el.style.background = 'var(--bg-secondary)';
        el.style.borderRadius = '12px';

        const before = document.createElement('div');
        before.style.cssText = `
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: 14px;
            background: linear-gradient(45deg, var(--accent), var(--accent-secondary), var(--accent));
            background-size: 200% 200%;
            z-index: -1;
            animation: gradientMove 3s ease infinite;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        el.appendChild(before);

        el.addEventListener('mouseenter', () => {
            before.style.opacity = '1';
        });

        el.addEventListener('mouseleave', () => {
            before.style.opacity = '0';
        });
    });
}

/* Morphing Shapes */
function initMorphingShapes() {
    const morphElements = document.querySelectorAll('[data-morph]');

    morphElements.forEach(el => {
        el.style.animation = 'morph 8s ease-in-out infinite';
    });
}

/* Floating Elements */
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('[data-float]');

    floatingElements.forEach((el, i) => {
        const delay = i * 0.5;
        const duration = 3 + Math.random() * 2;
        el.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite`;
    });
}

/* Shimmer Effects */
function initShimmerEffects() {
    const shimmerElements = document.querySelectorAll('[data-shimmer]');

    shimmerElements.forEach(el => {
        el.style.position = 'relative';
        el.style.overflow = 'hidden';

        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            animation: shimmer 2s infinite;
        `;

        el.appendChild(shimmer);
    });
}

/* Wave Animations */
function initWaveAnimations() {
    const waveElements = document.querySelectorAll('[data-wave]');

    waveElements.forEach(el => {
        el.style.animation = 'wave 2s ease-in-out infinite';
    });
}

/* GSAP-like Animation Helper */
const Animation = {
    fadeIn: (element, duration = 0.5, delay = 0) => {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}s ease ${delay}s`;
        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });
    },

    fadeOut: (element, duration = 0.5, delay = 0) => {
        element.style.transition = `opacity ${duration}s ease ${delay}s`;
        element.style.opacity = '0';
    },

    slideIn: (element, direction = 'up', duration = 0.5, delay = 0) => {
        const transforms = {
            up: 'translateY(30px)',
            down: 'translateY(-30px)',
            left: 'translateX(30px)',
            right: 'translateX(-30px)'
        };

        element.style.opacity = '0';
        element.style.transform = transforms[direction];
        element.style.transition = `all ${duration}s ease ${delay}s`;

        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0)';
        });
    },

    scaleIn: (element, duration = 0.5, delay = 0) => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.9)';
        element.style.transition = `all ${duration}s ease ${delay}s`;

        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    },

    stagger: (elements, animation = 'fadeIn', duration = 0.5, staggerDelay = 0.1) => {
        elements.forEach((el, i) => {
            Animation[animation](el, duration, i * staggerDelay);
        });
    }
};

/* Scroll Progress Indicator */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--accent);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

/* Intersection Observer Helper */
function observeElements(selector, callback, options = {}) {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { ...defaultOptions, ...options });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

/* Animate on Scroll Helper */
function animateOnScroll(selector, animationClass, options = {}) {
    observeElements(selector, (el) => {
        el.classList.add(animationClass);
    }, options);
}

/* Smooth Reveal */
function smoothReveal(elements, options = {}) {
    const {
        duration = 0.6,
        delay = 0,
        stagger = 0.1,
        y = 30
    } = options;

    elements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = `translateY(${y}px)`;
        el.style.transition = `all ${duration}s ease ${delay + i * stagger}s`;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(el);
    });
}

/* Number Counter Animation */
function animateNumber(element, target, duration = 2000, suffix = '') {
    let start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (easeOutExpo)
        const easeOut = 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(easeOut * target);

        element.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString() + suffix;
        }
    }

    requestAnimationFrame(update);
}

/* Typewriter Effect */
function typewriter(element, text, speed = 50) {
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

/* Glitch Text Effect */
function glitchText(element, originalText) {
    const chars = '!<>-_\/[]{}—=+*^?#________';
    let iteration = 0;

    const interval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iteration >= originalText.length) {
            clearInterval(interval);
        }

        iteration += 1 / 3;
    }, 30);
}

/* Particle System */
class ParticleSystem {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.options = {
            particleCount: 50,
            color: 'var(--accent)',
            size: 2,
            speed: 1,
            ...options
        };

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    init() {
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.options.speed,
                vy: (Math.random() - 0.5) * this.options.speed,
                size: Math.random() * this.options.size + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.options.color;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

/* Export utilities */
window.Animation = Animation;
window.observeElements = observeElements;
window.animateOnScroll = animateOnScroll;
window.smoothReveal = smoothReveal;
window.animateNumber = animateNumber;
window.typewriter = typewriter;
window.glitchText = glitchText;
window.ParticleSystem = ParticleSystem;
