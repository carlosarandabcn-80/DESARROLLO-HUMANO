# Respira Nou Barris

Dashboard web interactivo para transformar el borrador académico del proyecto **Respira Nou Barris** en una experiencia navegable, visual e infográfica, preparada para GitHub Pages y alineada con la rúbrica UNIR.

## Contenido

- Proyecto socioeducativo de 6 meses en Nou Barris, Barcelona.
- Destinatarios directos: 400 adolescentes de 12 a 17 años.
- Base poblacional: 148.431 adolescentes de 10 a 19 años en Barcelona.
- Marco teórico: Erikson, Bronfenbrenner, ciclo vital y prevención socioeducativa.
- Tres actividades completas: Aula Respira, Círculos Respira y Conecta Respira.
- Impacto, indicadores, presupuesto de 20.000 €, referencias APA y aprendizajes del grupo.

## Accesibilidad

El dashboard incorpora:

- Skip to content.
- Navegación por teclado.
- Foco visible.
- Icono universal de accesibilidad en la cabecera.
- Modo accesible.
- Alto contraste.
- Control de tamaño de texto.
- Opción para desactivar animaciones.
- Roles ARIA en navegación, gráficos y paneles interactivos.
- Textos alternativos en imágenes.
- Descripción textual y tabla alternativa para cada gráfico.

## Visualización de datos

Se usa Chart.js desde CDN, con una visualización alternativa si la librería no carga. Los gráficos incluyen:

- Base poblacional adolescente.
- Evolución de mala salud mental declarada.
- Evolución del bienestar emocional.
- Insatisfacción corporal.
- Indicadores del proyecto.
- Distribución presupuestaria.

## Estructura

```text
respira-nou-barris-dashboard/
├── index.html
├── README.md
├── assets/
│   ├── data/
│   │   └── data.json
│   └── images/
│       ├── logo-unir.png
│       ├── accessibility-icon.png
│       └── charts/
├── css/
│   ├── main.css
│   ├── layout.css
│   ├── accessibility.css
│   └── animations.css
└── js/
    ├── app.js
    ├── charts.js
    ├── navigation.js
    ├── accessibility.js
    └── interactions.js
```

## Ejecutar en local

Desde la carpeta del proyecto:

```bash
python -m http.server 8080
```

Abrir:

```text
http://localhost:8080
```

## Subir a GitHub

```bash
git init
git add .
git commit -m "Proyecto UNIR dashboard interactivo"
git branch -M main
git remote add origin https://github.com/USUARIO/REPO.git
git push -u origin main
```

Activar GitHub Pages:

```text
Settings → Pages → main / root
```

## Fuentes

Los contenidos se han extraído de:

- `BORRADOR Ultima version (1).docx`
- `808_act3_grupal (3).docx`

Las referencias APA completas se mantienen dentro de `assets/data/data.json` y se renderizan en la sección final del dashboard.
