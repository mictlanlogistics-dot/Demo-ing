/* ============================================
   CONSTRUCTA - 3D Viewer Engine
   Interactive 3D visualization
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    init3DViewer();
    initBeforeAfter();
    initViewerTabs();
    initExplodedView();
});

/* 3D Viewer Controls */
function init3DViewer() {
    const model = document.getElementById('viewer-model');
    const rotateX = document.getElementById('rotate-x');
    const rotateY = document.getElementById('rotate-y');
    const zoom = document.getElementById('zoom');
    const section = document.getElementById('section');

    if (!model) return;

    let currentRotateX = -15;
    let currentRotateY = 25;
    let currentZoom = 1;
    let currentSection = 0;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    function updateTransform() {
        model.style.transform = `
            rotateX(${currentRotateX}deg) 
            rotateY(${currentRotateY}deg) 
            scale(${currentZoom})
        `;
    }

    // Slider controls
    if (rotateX) {
        rotateX.addEventListener('input', (e) => {
            currentRotateX = parseInt(e.target.value);
            document.getElementById('val-rotate-x').textContent = currentRotateX + '°';
            updateTransform();
        });
    }

    if (rotateY) {
        rotateY.addEventListener('input', (e) => {
            currentRotateY = parseInt(e.target.value);
            document.getElementById('val-rotate-y').textContent = currentRotateY + '°';
            updateTransform();
        });
    }

    if (zoom) {
        zoom.addEventListener('input', (e) => {
            currentZoom = parseFloat(e.target.value);
            document.getElementById('val-zoom').textContent = currentZoom.toFixed(1) + 'x';
            updateTransform();
        });
    }

    if (section) {
        section.addEventListener('input', (e) => {
            currentSection = parseInt(e.target.value);
            document.getElementById('val-section').textContent = currentSection + '%';
            updateSectionCut(currentSection);
        });
    }

    // Mouse drag rotation
    const canvas = document.getElementById('viewer-canvas');
    if (canvas) {
        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            canvas.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - lastMouseX;
            const deltaY = e.clientY - lastMouseY;

            currentRotateY += deltaX * 0.5;
            currentRotateX -= deltaY * 0.5;

            // Clamp rotation
            currentRotateX = Math.max(-90, Math.min(90, currentRotateX));

            // Update sliders
            if (rotateX) {
                rotateX.value = currentRotateX;
                document.getElementById('val-rotate-x').textContent = Math.round(currentRotateX) + '°';
            }
            if (rotateY) {
                rotateY.value = currentRotateY;
                document.getElementById('val-rotate-y').textContent = Math.round(currentRotateY) + '°';
            }

            updateTransform();

            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            if (canvas) canvas.style.cursor = 'grab';
        });

        // Touch support
        canvas.addEventListener('touchstart', (e) => {
            isDragging = true;
            lastMouseX = e.touches[0].clientX;
            lastMouseY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;

            const deltaX = e.touches[0].clientX - lastMouseX;
            const deltaY = e.touches[0].clientY - lastMouseY;

            currentRotateY += deltaX * 0.5;
            currentRotateX -= deltaY * 0.5;

            currentRotateX = Math.max(-90, Math.min(90, currentRotateX));

            updateTransform();

            lastMouseX = e.touches[0].clientX;
            lastMouseY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Scroll to zoom
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            currentZoom = Math.max(0.5, Math.min(2, currentZoom + delta));

            if (zoom) {
                zoom.value = currentZoom;
                document.getElementById('val-zoom').textContent = currentZoom.toFixed(1) + 'x';
            }

            updateTransform();
        });
    }

    // Auto-rotate when idle
    let idleTimer;
    let isAutoRotating = false;

    function startAutoRotate() {
        if (isAutoRotating) return;
        isAutoRotating = true;

        function rotate() {
            if (!isAutoRotating || isDragging) return;
            currentRotateY += 0.2;
            updateTransform();
            requestAnimationFrame(rotate);
        }

        rotate();
    }

    function stopAutoRotate() {
        isAutoRotating = false;
    }

    // Start auto-rotate after 3 seconds of idle
    document.addEventListener('mousemove', () => {
        stopAutoRotate();
        clearTimeout(idleTimer);
        idleTimer = setTimeout(startAutoRotate, 3000);
    });

    // Initial transform
    updateTransform();
}

function updateSectionCut(percentage) {
    const building = document.querySelector('.building-3d');
    if (!building) return;

    const faces = building.querySelectorAll('.building-face');
    const clipValue = percentage / 100;

    faces.forEach(face => {
        if (clipValue > 0) {
            face.style.clipPath = `inset(0 ${clipValue * 50}% 0 0)`;
        } else {
            face.style.clipPath = 'none';
        }
    });
}

/* Before/After Slider */
function initBeforeAfter() {
    const slider = document.getElementById('before-after-slider');
    const handle = document.getElementById('ba-handle');

    if (!slider || !handle) return;

    const after = slider.querySelector('.ba-after');
    let isDragging = false;

    function updateSlider(x) {
        const rect = slider.getBoundingClientRect();
        let percentage = ((x - rect.left) / rect.width) * 100;
        percentage = Math.max(0, Math.min(100, percentage));

        after.style.width = percentage + '%';
        handle.style.left = percentage + '%';
    }

    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateSlider(e.clientX);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch support
    handle.addEventListener('touchstart', (e) => {
        isDragging = true;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        updateSlider(e.touches[0].clientX);
    }, { passive: true });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Click on slider
    slider.addEventListener('click', (e) => {
        if (e.target.closest('.ba-handle')) return;
        updateSlider(e.clientX);
    });
}

/* Viewer Tabs */
function initViewerTabs() {
    const tabs = document.querySelectorAll('.viewer-tab');
    const contents = document.querySelectorAll('.viewer-tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            contents.forEach(c => {
                c.classList.remove('active');
                if (c.id === 'tab-' + tabId) {
                    c.classList.add('active');
                }
            });
        });
    });
}

/* Exploded View */
function initExplodedView() {
    const layers = document.querySelectorAll('.exploded-layer');

    layers.forEach(layer => {
        layer.addEventListener('click', () => {
            const isActive = layer.classList.contains('active');

            layers.forEach(l => {
                l.classList.remove('active');
                l.style.transform = '';
                l.style.opacity = '';
            });

            if (!isActive) {
                layer.classList.add('active');

                // Expand spacing
                const layerIndex = Array.from(layers).indexOf(layer);
                layers.forEach((l, i) => {
                    const offset = (i - layerIndex) * 20;
                    l.style.transform = `translateY(${offset}px)`;
                    l.style.opacity = i === layerIndex ? '1' : '0.5';
                    l.style.transition = 'all 0.5s ease';
                });
            }
        });
    });
}

/* 3D Building Rotation on Scroll */
function initScrollRotation() {
    const building = document.querySelector('.building-3d');
    if (!building) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const rotation = scrollY * 0.05;
        building.style.transform = `rotateY(${rotation}deg)`;
    });
}

/* Wireframe Animation */
function initWireframeAnimation() {
    const wireframe = document.querySelector('.wireframe-svg');
    if (!wireframe) return;

    const lines = wireframe.querySelectorAll('line, rect');

    lines.forEach((line, i) => {
        const length = line.getTotalLength ? line.getTotalLength() : 100;
        line.style.strokeDasharray = length;
        line.style.strokeDashoffset = length;
        line.style.animation = `drawLine 0.5s ease ${i * 0.05}s forwards`;
    });
}

/* Building Information on Hover */
function initBuildingInfo() {
    const labels = document.querySelectorAll('.viewer-labels .label');

    labels.forEach(label => {
        label.addEventListener('mouseenter', () => {
            label.style.transform = 'scale(1.1)';
            label.style.zIndex = '100';
        });

        label.addEventListener('mouseleave', () => {
            label.style.transform = 'scale(1)';
            label.style.zIndex = '';
        });
    });
}

/* Export */
window.Viewer3D = {
    updateTransform: () => {},
    updateSectionCut,
    initBeforeAfter,
    initExplodedView
};
