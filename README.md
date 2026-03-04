# FMG Landing Page

Landing page de **Facilities Management de Guatemala S.A.**

## Stack
- React 18 + Vite 4
- CSS-in-JS (inline styles)
- Google Fonts (Plus Jakarta Sans, Cormorant Garamond, JetBrains Mono)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## Build de producción

```bash
npm run build
npm run preview
```

## Deploy en Vercel

Este repositorio está configurado para deploy automático en Vercel.
Vercel detecta automáticamente Vite/React y no requiere configuración adicional.

## Estructura

```
fmg-landing/
├── public/
│   ├── logo-color.png      # Logo Happiness Club color
│   ├── logo-white.png      # Logo Happiness Club blanco
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── logos.js        # Logos FMG en base64
│   ├── App.jsx             # Componente principal (landing completa)
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```
