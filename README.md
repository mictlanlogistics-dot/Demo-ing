# CONSTRUCTA 🏗️

**Plataforma integral para arquitectos e ingenieros**

[![Version](https://img.shields.io/badge/version-1.0.0-gold)](https://github.com/tuusuario/constructa)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

> "Construimos el futuro desde cero"

## 🎯 Características Principales

### Animaciones tipo "Construcción"
- Elementos que se "dibujan" y ensamblan como planos arquitectónicos
- Animaciones SVG con stroke-dasharray para efecto de dibujo línea por línea
- Transiciones fluidas entre estados constructivos

### Grid Interactivo BIG-style
- Proyectos como tiles expandibles con datos técnicos
- Filtros por categoría (Residencial, Comercial, Infraestructura, Industrial)
- Especificaciones técnicas SOM-style con métricas circulares animadas

### Video Hero Inmersivo
- Video de fondo con overlay de grid arquitectónico
- Animaciones de entrada con stagger delays
- Estadísticas animadas con contadores

### Visualizador 3D Interactivo
- Modelo 3D CSS con rotación, zoom y sección
- Comparador Before/After con slider interactivo
- Vista Wireframe con cotas técnicas
- Vista Exploded con capas constructivas

### Proceso Constructivo Animado (4 Fases)
1. **Diseño** - Blueprint drawing animation
2. **Cimentación** - Excavación, acero, vaciado
3. **Estructura** - Columnas, vigas, losas, grúa
4. **Acabados** - Fachada, ventanas, paisajismo

### Calculadora de Proyectos
- **Estructural**: Cálculo de vigas, momentos, deflexiones
- **Costos**: Estimación por tipo, ubicación y acabado
- **Materiales**: Cálculo de concreto, acero, agregados
- **Concreto**: Diseño de mezcla ACI 211.1

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript Vanilla** - Sin dependencias externas
- **SVG** - Animaciones de blueprint y wireframes
- **CSS 3D Transforms** - Visualizador 3D

## 📁 Estructura del Proyecto

```
constructa-web/
├── index.html          # Página principal SPA
├── css/
│   ├── main.css        # Estilos principales
│   ├── animations.css  # Animaciones y efectos
│   └── components.css  # Componentes reutilizables
├── js/
│   ├── main.js         # Lógica principal
│   ├── animations.js   # Motor de animaciones
│   ├── calculator.js   # Calculadoras técnicas
│   └── viewer3d.js     # Visualizador 3D
└── assets/
    ├── images/         # Imágenes del proyecto
    └── videos/         # Videos
```

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tuusuario/constructa.git
cd constructa
```

2. Abre `index.html` en tu navegador o usa un servidor local:
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve .

# Con PHP
php -S localhost:8000
```

3. Visita `http://localhost:8000`

## 🎨 Personalización

### Temas
El sitio soporta modo oscuro y claro. Cambia el tema haciendo clic en el ícono del sol/luna en la navegación.

### Variables CSS
Modifica las variables en `:root` en `css/main.css`:

```css
:root {
    --accent: #e8c547;        /* Color principal */
    --bg-primary: #0a0a0f;    /* Fondo oscuro */
    --font-primary: 'Space Grotesk', sans-serif;
}
```

## 📱 Responsive

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px
- Mobile pequeño: < 480px

## 🔧 Servicios Integrados

- **Modelado BIM**: Revit, ArchiCAD, Tekla
- **Desarrollo Web**: Three.js, React, Next.js
- **Renderizado 3D**: V-Ray, Corona, Unreal Engine 5
- **Cálculo Estructural**: ETABS, SAP2000, Robot
- **Documentación Técnica**: Planos ejecutivos, especificaciones
- **Consultoría Digital**: Transformación tecnológica

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 👥 Créditos

Diseñado y desarrollado para arquitectos e ingenieros.

Inspirado en:
- [Olson Kundig](https://olsonkundig.com) - Video hero inmersivo
- [BIG - Bjarke Ingels Group](https://big.dk) - Grid interactivo
- [SOM](https://som.com) - Datos técnicos y especificaciones

---

**CONSTRUCTA** © 2026 - Arquitectura e Ingeniería Integral
