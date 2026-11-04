# Librería La Hoja Suelta

Sitio web de una sola página para **La Hoja Suelta**, librería independiente de libros nuevos y usados en Villa Crespo, Buenos Aires. Muestra novedades, servicios, agenda de eventos, historia, cómo llegar y contacto. Las reservas y las inscripciones a eventos abren WhatsApp con un mensaje ya escrito.

Es HTML, CSS y un poco de JavaScript: sin frameworks, sin librerías y sin proceso de compilación.

## Estructura de carpetas

```
index.html          La página completa (secciones por anclas)
css/styles.css      Todos los estilos (variables, componentes, 768 px y 1200 px)
js/main.js          Menú mobile e indicador "Abierto ahora" (menos de 50 líneas)
img/                Imágenes: ilustraciones, tapas (img/tapas/), logo y favicons
README.md           Este archivo
APRENDIZAJE.md      Decisiones de cada fase, explicadas para aprender
```

## Cómo verlo en local

- **Rápido:** hacé doble clic en `index.html`. Todo funciona, menos el envío de formularios.
- **Con servidor local** (más parecido a producción), desde la carpeta del proyecto:
  `npx serve` y abrí la dirección que muestra.

Para ver la versión celular: en el navegador, `F12` y después `Ctrl+Shift+M`.

## Cómo editar el contenido

Todo se edita en `index.html`. Buscá los comentarios con rayas `=====`.

### Novedades (libros)
Buscá `EDITAR NOVEDADES`. Cada `<article class="libro">` es un libro.
- Para **agregar** uno, copiá un bloque entero y pegalo antes de `FIN EDITAR NOVEDADES`.
- Cambiá título (aparece dos veces: en la tapa y en el `h3`), autor, reseña, precio y etiqueta (Nuevo, Usado, etc.).
- Cambiá el enlace de WhatsApp: el título va dentro de `text=`, con los espacios como `%20`.
- La tapa es una imagen de `img/tapas/` (800×1200, proporción 2:3, WebP). Cambiá el nombre del archivo y el texto `alt` ("Tapa de …, de …").
- La etiqueta (`Nuevo`, `Usado`, `Infantil`, `Agotado`) es un `<span class="libro__etiqueta">` opcional: borralo si no corresponde.
- Para **quitar** un libro, borrá su `<article>` completo.
- Todas las tapas tienen que tener el mismo tamaño y proporción para que la grilla quede pareja.

### Eventos (agenda)
Buscá `EDITAR EVENTOS`. Cada `<article class="evento">` es un evento.
- Cambiá la fecha en **dos lugares**: el atributo `datetime="2026-11-05T19:00"` (año-mes-día y hora) y el texto visible ("Jue 5 nov").
- Cambiá tipo, título, descripción, hora y precio, y el nombre del evento en el enlace de WhatsApp.
- `evento--club` pinta la tarjeta en terracota (se usa para el club de lectura).
- Borrá el evento cuando ya pasó.

### Horarios
Se editan en **tres lugares** que tienen que coincidir:
1. La tabla de la sección Visitanos (`EDITAR HORARIOS` en `index.html`).
2. El objeto `HORARIOS` al principio de la sección "Abierto ahora" en `js/main.js`. Cada día es `[hora de apertura, hora de cierre]`; `null` es cerrado. El domingo es el 0.
3. Los datos estructurados `openingHoursSpecification` dentro del `<script type="application/ld+json">` del `<head>` (los usa Google).

El indicador "Abierto ahora / Cerrado" usa siempre la hora de Buenos Aires. No detecta feriados: la tabla dice "Ver Instagram".

### Datos de contacto
El teléfono aparece en muchos enlaces como `5491155550123`. Si cambia, buscá y reemplazá ese número en todo el archivo. Lo mismo con el mail y el Instagram.

## Cómo reemplazar las imágenes por fotos reales

Las imágenes actuales son ilustraciones provisorias. Para usar fotos reales, guardalas **con el mismo nombre** en `img/`:

| Archivo | Tamaño | Dónde se usa |
|---|---|---|
| `img/local-fachada.webp` | 1200×800 | Inicio (el badge verde tapa la esquina superior derecha) |
| `img/equipo-hermanas.webp` | 1200×800 | Nosotros |
| `img/og-imagen.jpg` | 1200×630 | Vista previa al compartir en redes (JPG, motivo centrado) |
| `img/tapas/*.webp` | 800×1200 | Tapas de los libros |
| `img/logo.svg`, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | — | Logo y favicons |

1. Convertí la foto a WebP (por ejemplo en squoosh.app) con ese tamaño y calidad cercana a 75; que pese 150 KB o menos.
2. Reemplazá el archivo y revisá el texto `alt` en `index.html`: tiene que describir la imagen nueva (hoy dice "Ilustración de…" en la de las hermanas).

> **Antes de publicar:** la carpeta `img/materiales-la-hoja-suelta/` contiene los originales en PNG y copias de todo. No la necesita el sitio: pesa de más, así que movela fuera del proyecto o borrala antes de desplegar.

## Desplegar en Netlify

1. Creá una cuenta en [netlify.com](https://www.netlify.com) (alcanza el plan gratuito).
2. **Add new site → Deploy manually** y arrastrá **la carpeta del proyecto** (la que contiene `index.html`).
   - Alternativa: subí el proyecto a GitHub y conectalo desde **Import from Git**. No hace falta comando de build ni carpeta de publicación (dejá todo vacío o en `.`).
3. Esperá un minuto. Netlify te da una dirección del tipo `algo.netlify.app`.
4. Para usar un dominio propio: **Domain management → Add a domain**. Después reemplazá `https://librerialahojasuelta.netlify.app` en `index.html` (`canonical`, `og:url`, `og:image` y JSON-LD) si el dominio es otro.

## Cómo probar los formularios

En local los formularios **no envían**: necesitan Netlify. Una vez desplegado:

1. Entrá a Netlify → tu sitio → **Forms**. Tienen que aparecer dos formularios: `contacto` y `newsletter`. Si no aparecen, revisá que el deploy sea reciente y que **Forms** esté activado en **Site configuration**.
2. En el sitio publicado, completá el formulario de contacto con datos de prueba y enviá. Tiene que mostrar la página de confirmación de Netlify.
3. Volvé a **Forms** → `contacto` → **Submissions**: tiene que aparecer el mensaje.
4. Repetí con el newsletter.
5. Para recibir un aviso por mail en cada envío: **Forms → Form notifications → Add notification → Email notification**.
6. Netlify filtra spam solo. El campo oculto `bot-field` es una trampa para bots.

## Verificar calidad

- **Lighthouse (mobile):** Chrome → `F12` → pestaña **Lighthouse** → *Mobile* → *Analyze page load*. El objetivo es 90 o más en las cuatro categorías.
- **HTML válido:** pegá `index.html` en [validator.w3.org](https://validator.w3.org/#validate_by_input).
- **Teclado:** recorré la página con `Tab`; el foco tiene que verse siempre. Con el menú abierto, `Escape` lo cierra.
- **Vista previa al compartir:** [opengraph.xyz](https://www.opengraph.xyz) con la dirección ya publicada.
- **Datos estructurados:** [Rich Results Test](https://search.google.com/test/rich-results) de Google, con la dirección ya publicada.
