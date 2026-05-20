/* ============================================
   CONSTRUCTA - Calculator Engine
   Engineering calculations and estimations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCalculatorTabs();
    initStructuralCalculator();
    initCostCalculator();
    initMaterialsCalculator();
    initConcreteCalculator();
});

/* Calculator Tabs */
function initCalculatorTabs() {
    const tabs = document.querySelectorAll('.calc-tab');
    const contents = document.querySelectorAll('.calc-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const calcType = tab.getAttribute('data-calc');

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            contents.forEach(c => {
                c.classList.remove('active');
                if (c.id === 'calc-' + calcType) {
                    c.classList.add('active');
                }
            });
        });
    });
}

/* Structural Calculator */
function initStructuralCalculator() {
    const btn = document.getElementById('btn-calc-estructural');
    if (!btn) return;

    btn.addEventListener('click', calculateStructural);

    // Auto-calculate on input change
    const inputs = document.querySelectorAll('#calc-estructural input, #calc-estructural select');
    inputs.forEach(input => {
        input.addEventListener('change', calculateStructural);
        input.addEventListener('input', debounce(calculateStructural, 500));
    });
}

function calculateStructural() {
    const tipo = document.getElementById('est-tipo').value;
    const material = document.getElementById('est-material').value;
    const L = parseFloat(document.getElementById('est-longitud').value) || 6;
    const b = parseFloat(document.getElementById('est-base').value) || 30;
    const h = parseFloat(document.getElementById('est-altura').value) || 50;
    const w = parseFloat(document.getElementById('est-carga').value) || 15;
    const fs = parseFloat(document.getElementById('est-fs').value) || 1.5;

    // Material properties
    const E_values = {
        acero: 200000,
        hormigon: 25000,
        madera: 12000
    };

    const E = E_values[material] || 200000;

    // Convert to consistent units (m, kN)
    const b_m = b / 100;
    const h_m = h / 100;
    const I = (b_m * Math.pow(h_m, 3)) / 12;

    // Calculations for simply supported beam with UDL
    const M_max = (w * Math.pow(L, 2)) / 8; // kN·m
    const V_max = (w * L) / 2; // kN
    const delta_max = (5 * w * Math.pow(L, 4)) / (384 * E * 1000 * I); // m
    const delta_mm = delta_max * 1000; // mm

    // L/delta ratio
    const L_delta = L / (delta_max || 0.001);

    // Status check
    const L_delta_min = 250; // Minimum L/delta for beams
    const isSafe = L_delta >= L_delta_min;

    // Update results
    updateResult('res-momento', M_max.toFixed(2));
    updateResult('res-deflexion', delta_mm.toFixed(2));
    updateResult('res-cortante', V_max.toFixed(2));
    updateResult('res-inercia', (I * 100000000).toFixed(0)); // cm⁴
    updateResult('res-relacion', Math.floor(L_delta));

    const statusEl = document.getElementById('res-estado');
    const statusCard = document.getElementById('res-status');

    if (isSafe) {
        statusEl.textContent = '✓ CUMPLE';
        statusEl.style.color = 'var(--success)';
        statusCard.style.borderColor = 'var(--success)';
    } else {
        statusEl.textContent = '✗ NO CUMPLE';
        statusEl.style.color = 'var(--error)';
        statusCard.style.borderColor = 'var(--error)';
    }

    // Update beam diagram
    updateBeamDiagram(L, w, delta_max);
}

function updateBeamDiagram(L, w, delta) {
    const deflectionCurve = document.getElementById('deflection-curve');
    const momentDiagram = document.getElementById('moment-diagram');

    if (!deflectionCurve || !momentDiagram) return;

    const svgWidth = 400;
    const svgHeight = 200;
    const beamY = 100;
    const beamStart = 50;
    const beamEnd = 350;
    const beamLength = beamEnd - beamStart;

    // Deflection curve (parabolic for UDL)
    let deflectionPath = `M ${beamStart} ${beamY}`;
    const points = 50;
    const scale = Math.min(delta * 50000, 30); // Scale for visualization

    for (let i = 0; i <= points; i++) {
        const x = beamStart + (i / points) * beamLength;
        const x_norm = i / points;
        const y_deflection = scale * (4 * x_norm * (1 - x_norm)); // Parabolic deflection
        deflectionPath += ` L ${x} ${beamY + y_deflection}`;
    }

    deflectionCurve.setAttribute('d', deflectionPath);

    // Moment diagram (parabolic, max at center)
    const M_scale = 40;
    let momentPath = `M ${beamStart} ${beamY + 60}`;

    for (let i = 0; i <= points; i++) {
        const x = beamStart + (i / points) * beamLength;
        const x_norm = i / points;
        const M_val = 4 * x_norm * (1 - x_norm); // Parabolic moment
        momentPath += ` L ${x} ${beamY + 60 - M_val * M_scale}`;
    }

    momentPath += ` L ${beamEnd} ${beamY + 60} Z`;
    momentDiagram.setAttribute('d', momentPath);
}

/* Cost Calculator */
function initCostCalculator() {
    const btn = document.getElementById('btn-calc-costos');
    if (!btn) return;

    btn.addEventListener('click', calculateCost);

    const inputs = document.querySelectorAll('#calc-costos input, #calc-costos select');
    inputs.forEach(input => {
        input.addEventListener('change', calculateCost);
    });
}

function calculateCost() {
    const tipo = document.getElementById('cost-tipo').value;
    const area = parseFloat(document.getElementById('cost-area').value) || 500;
    const acabado = document.getElementById('cost-acabado').value;
    const niveles = parseInt(document.getElementById('cost-niveles').value) || 2;
    const ubicacion = document.getElementById('cost-ubicacion').value;
    const complejidad = document.getElementById('cost-complejidad').value;

    // Base costs per m² (MXN)
    const baseCosts = {
        residencial: 15000,
        comercial: 20000,
        industrial: 18000,
        infraestructura: 25000
    };

    // Finish multipliers
    const finishMultipliers = {
        economico: 0.7,
        intermedio: 1.0,
        alto: 1.5,
        premium: 2.5
    };

    // Location multipliers
    const locationMultipliers = {
        cdmx: 1.2,
        gdl: 1.0,
        mty: 1.1,
        qro: 0.9,
        puebla: 0.85
    };

    // Complexity multipliers
    const complexityMultipliers = {
        baja: 0.9,
        media: 1.0,
        alta: 1.3
    };

    // Level multiplier
    const levelMultiplier = 1 + (niveles - 1) * 0.05;

    // Calculate
    const baseCost = baseCosts[tipo] || 15000;
    const costPerM2 = baseCost * 
        finishMultipliers[acabado] * 
        locationMultipliers[ubicacion] * 
        complexityMultipliers[complejidad] * 
        levelMultiplier;

    const totalCost = costPerM2 * area;

    // Time estimation (months)
    const baseTime = {
        residencial: 8,
        comercial: 12,
        industrial: 10,
        infraestructura: 18
    };

    const timeMultiplier = complexityMultipliers[complejidad] * levelMultiplier;
    const estimatedTime = (baseTime[tipo] || 8) * timeMultiplier;

    // Labor percentage
    const laborPercent = 30 + (complexityMultipliers[complejidad] - 1) * 10;

    // Update results
    updateResult('res-costo-total', '$' + formatNumber(totalCost));
    updateResult('res-costo-m2', '$' + formatNumber(Math.round(costPerM2)));
    updateResult('res-tiempo', estimatedTime.toFixed(1));
    updateResult('res-mano-obra', laborPercent.toFixed(0));

    // Update breakdown
    updateCostBreakdown(totalCost);
}

function updateCostBreakdown(totalCost) {
    const breakdown = document.getElementById('cost-breakdown');
    if (!breakdown) return;

    const materials = 0.40;
    const labor = 0.30;
    const equipment = 0.15;
    const indirect = 0.15;

    const segments = breakdown.querySelectorAll('.breakdown-segment');
    if (segments.length >= 4) {
        segments[0].style.setProperty('--seg-width', (materials * 100) + '%');
        segments[1].style.setProperty('--seg-width', (labor * 100) + '%');
        segments[2].style.setProperty('--seg-width', (equipment * 100) + '%');
        segments[3].style.setProperty('--seg-width', (indirect * 100) + '%');

        segments[0].querySelector('.seg-label').textContent = `Materiales ${(materials * 100).toFixed(0)}%`;
        segments[1].querySelector('.seg-label').textContent = `Mano de Obra ${(labor * 100).toFixed(0)}%`;
        segments[2].querySelector('.seg-label').textContent = `Equipos ${(equipment * 100).toFixed(0)}%`;
        segments[3].querySelector('.seg-label').textContent = `Indirectos ${(indirect * 100).toFixed(0)}%`;
    }
}

/* Materials Calculator */
function initMaterialsCalculator() {
    const btn = document.getElementById('btn-calc-materiales');
    if (!btn) return;

    btn.addEventListener('click', calculateMaterials);

    const inputs = document.querySelectorAll('#calc-materiales input, #calc-materiales select');
    inputs.forEach(input => {
        input.addEventListener('change', calculateMaterials);
    });
}

function calculateMaterials() {
    const elemento = document.getElementById('mat-elemento').value;
    const longitud = parseFloat(document.getElementById('mat-longitud').value) || 10;
    const altura = parseFloat(document.getElementById('mat-altura').value) || 2.5;
    const ancho = parseFloat(document.getElementById('mat-ancho').value) || 0.15;
    const desperdicio = parseFloat(document.getElementById('mat-desperdicio').value) || 10;

    // Volume calculation
    let volumen = longitud * altura * ancho;

    // Adjust for element type
    const typeMultipliers = {
        muro: 1.0,
        losa: 1.0,
        viga: 1.0,
        columna: 1.0,
        piso: 0.05 // Thin layer
    };

    volumen *= typeMultipliers[elemento] || 1;

    // Add waste
    const factorDesperdicio = 1 + (desperdicio / 100);
    const volumenTotal = volumen * factorDesperdicio;

    // Material quantities (per m³ of concrete)
    // Standard mix 1:2:3 (cement:sand:gravel)
    const cementoPorM3 = 350; // kg
    const arenaPorM3 = 0.45; // m³
    const gravaPorM3 = 0.9; // m³
    const aguaPorM3 = 180; // L
    const aceroPorM3 = 100; // kg (estimate)

    updateResult('res-volumen', volumenTotal.toFixed(2));
    updateResult('res-cemento', Math.round(volumenTotal * cementoPorM3).toLocaleString());
    updateResult('res-arena', (volumenTotal * arenaPorM3).toFixed(2));
    updateResult('res-grava', (volumenTotal * gravaPorM3).toFixed(2));
    updateResult('res-agua', Math.round(volumenTotal * aguaPorM3).toLocaleString());
    updateResult('res-acero', Math.round(volumenTotal * aceroPorM3).toLocaleString());
}

/* Concrete Mix Design Calculator */
function initConcreteCalculator() {
    const btn = document.getElementById('btn-calc-concreto');
    if (!btn) return;

    btn.addEventListener('click', calculateConcrete);

    const inputs = document.querySelectorAll('#calc-concreto input, #calc-concreto select');
    inputs.forEach(input => {
        input.addEventListener('change', calculateConcrete);
    });
}

function calculateConcrete() {
    const fc = parseInt(document.getElementById('conc-fc').value) || 250;
    const volumen = parseFloat(document.getElementById('conc-volumen').value) || 10;
    const ac = parseFloat(document.getElementById('conc-ac').value) || 0.5;
    const asentamiento = parseInt(document.getElementById('conc-asentamiento').value) || 10;
    const tma = parseInt(document.getElementById('conc-tma').value) || 19;
    const aditivo = document.getElementById('conc-aditivo').value;

    // ACI 211.1 method (simplified)
    // Water content based on slump and TMA
    const waterContent = {
        19: { 5: 185, 10: 200, 15: 210 },
        25: { 5: 180, 10: 195, 15: 205 },
        38: { 5: 170, 10: 185, 15: 195 }
    };

    const waterPerM3 = waterContent[tma]?.[asentamiento] || 200;

    // Cement content
    const cementPerM3 = waterPerM3 / ac;

    // Coarse aggregate volume (simplified)
    const coarseAggVolume = {
        19: 0.65,
        25: 0.68,
        38: 0.72
    };

    const Vca = coarseAggVolume[tma] || 0.65;
    const gravelPerM3 = Vca * 1600; // kg (approximate SSD density)

    // Fine aggregate by difference
    const cementVolume = cementPerM3 / 3150; // m³
    const waterVolume = waterPerM3 / 1000; // m³
    const gravelVolume = gravelPerM3 / 2700; // m³
    const airVolume = 0.02; // 2% entrapped air

    const sandVolume = 1 - (cementVolume + waterVolume + gravelVolume + airVolume);
    const sandPerM3 = Math.max(sandVolume * 2650, 0); // kg

    // Admixture adjustment
    let admixtureFactor = 1;
    if (aditivo === 'plasticizante') admixtureFactor = 0.9;
    if (aditivo === 'retardante') admixtureFactor = 0.95;
    if (aditivo === 'acelerante') admixtureFactor = 0.95;

    const adjustedWater = waterPerM3 * admixtureFactor;

    // Total quantities
    const totalCement = cementPerM3 * volumen;
    const totalSand = sandPerM3 * volumen;
    const totalGravel = gravelPerM3 * volumen;
    const totalWater = adjustedWater * volumen;

    // Unit weight
    const unitWeight = cementPerM3 + sandPerM3 + gravelPerM3 + waterPerM3;

    // Yield (bags per m³)
    const bagsPerM3 = cementPerM3 / 50;

    updateResult('res-conc-cemento', Math.round(totalCement).toLocaleString());
    updateResult('res-conc-arena', Math.round(totalSand).toLocaleString());
    updateResult('res-conc-grava', Math.round(totalGravel).toLocaleString());
    updateResult('res-conc-agua', Math.round(totalWater).toLocaleString());
    updateResult('res-conc-peso', Math.round(unitWeight).toLocaleString());
    updateResult('res-conc-rendimiento', bagsPerM3.toFixed(2));
}

/* Helper Functions */
function updateResult(id, value) {
    const el = document.getElementById(id);
    if (el) {
        // Animate the change
        el.style.opacity = '0';
        setTimeout(() => {
            el.textContent = value;
            el.style.opacity = '1';
            el.style.transition = 'opacity 0.3s ease';
        }, 150);
    }
}

function formatNumber(num) {
    return num.toLocaleString('es-MX');
}

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

/* Export for use in other modules */
window.Calculator = {
    calculateStructural,
    calculateCost,
    calculateMaterials,
    calculateConcrete,
    formatNumber,
    debounce
};
