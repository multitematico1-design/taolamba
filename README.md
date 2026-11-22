# Taolamba Gastrobar · Carta digital

Carta interactiva pensada primero para celulares (se abre desde un código QR): un gramófono con discos de vinilo
que representan las categorías. Sitio estático: no necesita compilar ni instalar nada.

## Estructura

```
index.html          Página principal
css/styles.css      Estilos (colores y tipografías en :root)
js/data.js          LA CARTA: platos, precios y descripciones  ← aquí se edita
js/app.js           Interfaz y animaciones (React + htm)
assets/img/         Gramófono, logo, monograma "T", flores y adorno (del PDF)
assets/favicon.png  Iconos de pestaña y de pantalla de inicio
404.html            Página de error
.nojekyll           Evita que GitHub Pages procese el sitio con Jekyll
```

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `carta-taolamba`).
2. Sube **el contenido de esta carpeta** a la raíz del repositorio (arrastrando los archivos en "Add file → Upload files", o con git).
3. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   elige la rama `main` y la carpeta `/ (root)`, y guarda.
4. En uno o dos minutos la carta queda en `https://TU-USUARIO.github.io/carta-taolamba/`.
5. Genera el código QR con esa dirección. Si luego cambias la carta, la dirección no cambia y el QR sigue sirviendo.

Todas las rutas son relativas, así que funciona igual en una dirección propia (dominio) o dentro de una subcarpeta.

## Probarlo en tu computador

Abre `index.html` con el navegador, o desde esta carpeta ejecuta `python3 -m http.server 8000` y entra a `http://localhost:8000`.
Para ver cómo queda en celular, usa las herramientas de desarrollador del navegador (modo dispositivo) o abre la dirección de GitHub Pages en tu teléfono.

## Cambiar la carta

Edita `js/data.js`. Cada disco tiene secciones y cada sección tiene platos:

```js
['Nombre del plato', '$20.000', 'Descripción (puede ir vacía: \'\')']
```

- **Complemento o variante** (se muestra sangrado y sin precio propio de plato): agrega `null, X` al final, como `['Adiciones','$2.500','Tocineta o pepperoni',null,X]`.
- **Foto de un plato**: guarda la imagen en `assets/img/platos/` (mejor en .webp, máximo 800 px de ancho) y ponla como cuarto dato:
  `['Rayuela','$25.000','Masa madurada…','assets/img/platos/rayuela.webp']`. Si no hay foto, no se muestra nada.
- **Nota de una sección**: propiedad `note:'…'` de la sección (como en Sándwiches).
- **Nuevo disco**: copia un bloque de `CATS` con un `id` nuevo, `name`, `plaque` (texto corto de la placa del estante), `short` (pestaña) y colores `hi`/`lo`.
  El estante se desliza de lado si hay más discos de los que caben en pantalla.

## Dependencias externas

Se cargan desde internet (no hace falta instalarlas): React 18.3.1 (cdnjs), htm 3.1.1 (jsDelivr) y las tipografías
Fraunces y DM Sans (Google Fonts). Si quieres que funcione sin conexión o sin terceros, descarga esos archivos a una carpeta
`vendor/` y cambia las rutas en `index.html`.

## Pendiente / recomendado

- Fotografías reales de los platos (ya hay espacio para ellas).
- Logo en vector o en alta resolución (el actual es un recorte de una foto y puede verse suave en pantallas grandes).
- Los precios y textos son los del PDF de la carta; revisa que estén vigentes antes de publicar.
