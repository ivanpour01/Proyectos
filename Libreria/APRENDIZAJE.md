# APRENDIZAJE — La Hoja Suelta

Un diario de decisiones. Una sección por fase.

## Fase 1 — Propuesta (sin código)

### Qué se hizo
Se leyó el PROMPT y las tres referencias, y se definió la estructura de la página, la jerarquía de encabezados, la paleta y las tipografías antes de escribir una línea de HTML.

### Decisiones y por qué
- **Una sola página con anclas**: el sitio es chico y el 80% de las visitas es desde el celular. Un scroll continuo evita cargas y es más simple de mantener.
- **Un solo `h1`** (la frase de marca del hero) y un `h2` por sección. Los títulos de cada tarjeta son `h3`. Los lectores de pantalla y Google usan esa jerarquía como índice; saltar niveles la rompe.
- **Paleta extraída de las referencias** (muestreando los píxeles), no inventada. Se guardará en variables CSS para cambiarla en un solo lugar.
- **Contraste**: el terracota de la referencia sobre el crema da ~4,3:1, un poco menos que el 4,5:1 de AA. Se propone oscurecerlo apenas para texto y botones. Las referencias son una guía visual; el criterio de accesibilidad del PROMPT es un requisito.
- **Tipografías**: una serif con itálica expresiva para títulos y una sans para texto. Máximo dos familias para no frenar la carga.

### Alternativas descartadas
- Blanco y negro puros: el PROMPT los prohíbe, y el crema y el casi negro dan el clima de "papel y tinta".
- Un framework CSS: el PROMPT pide vanilla, y para aprender conviene entender el CSS base.

### Conceptos nuevos
- **Jerarquía de encabezados**: la estructura de títulos es un esquema del documento, no un recurso de tamaño. El tamaño se cambia con CSS.
- **Ratio de contraste (WCAG)**: compara la luminosidad de texto y fondo. AA pide 4,5:1 para texto normal.
- **Variables CSS (custom properties)**: `--color-acento: #...;` se define una vez y se usa en todo el sitio.

### Cómo verificar
Revisar la propuesta en el chat contra las referencias. No hay archivos de código todavía.

## Fase 2 — HTML semántico (sin estilos)

### Qué se hizo
Se escribió `index.html` completo: header, 7 secciones, footer y botón flotante de WhatsApp. No se enlaza CSS todavía, así que el navegador lo muestra "pelado". Eso es lo esperado: si la página se entiende sin estilos, la estructura está bien.

### Decisiones y por qué
- **`article` para cada libro y cada evento**: un `article` es contenido que tiene sentido por sí solo (se podría copiar a otro sitio). Un `div` no dice nada; `article` le explica su rol al navegador y a los lectores de pantalla.
- **`section` con `aria-labelledby`**: cada sección apunta a su `h2`, así se anuncia con nombre ("región: Agenda").
- **Un solo `h1`** en el hero; los demás títulos bajan en orden (`h2` > `h3`).
- **Enlaces `wa.me` con `?text=`**: abren WhatsApp con el mensaje armado, sin JS. El título va codificado (espacio = `%20`, tilde = `%C3%AD`, etc.).
- **`<time datetime>`** en los eventos: la fecha visible es para personas y el atributo es para máquinas (buscadores, calendarios).
- **`<table>` con `caption` y `th scope`** para los horarios: son datos en filas y columnas, que es para lo que existe la tabla.
- **`address`** para la dirección y **`blockquote`** para las recomendaciones del librero.
- **Netlify Forms**: `data-netlify="true"`, el input oculto `form-name` y un campo "trampa" (honeypot) para frenar bots. Cada formulario tiene su `name` distinto.
- **Tapas sin foto**: `div` con clases (`libro__tapa--verde`, etc.) y `aria-hidden="true"`, porque el título ya está en el `h3` y leerlo dos veces sería ruido. El color se dibuja en la fase 3.
- **Hero con imagen sin `loading="lazy"`**: es lo primero que se ve; diferirla empeora la carga percibida. El resto sí es lazy.
- **Clases BEM** (`libro`, `libro__tapa`, `libro__tapa--verde`) puestas desde ya, solo donde van a hacer falta.

### Alternativas descartadas
- `div` en todo: funciona pero no tiene significado.
- Una librería de mapas: el `iframe` de Google es lo pedido y no suma JS.

### Conceptos nuevos
- **HTML semántico**: elegir la etiqueta por lo que el contenido *es*, no por cómo se ve.
- **Landmarks** (`header`, `nav`, `main`, `footer`): puntos de salto para lectores de pantalla.
- **Skip link**: enlace "Saltar al contenido" para usuarios de teclado.
- **`aria-expanded` y `aria-controls`**: avisan si un menú está abierto; el botón ya está, falta el JS.
- **Honeypot**: campo oculto que solo completan los bots.

### Cómo verificar
1. Abrí `index.html` en el navegador (doble clic). Debe leerse todo en orden lógico, sin estilos.
2. Navegá con Tab: debe pasar por enlaces, botones y campos en orden.
3. Probá un botón "Reservar por WhatsApp": abre WhatsApp con el título del libro.
4. Pegá el HTML en validator.w3.org (pestaña "Direct Input"): no debería dar errores.

> Corrección a la fase 2: el atributo del formulario de Netlify es `data-netlify-honeypot`, no `netlify-honeypot`. El validador del W3C solo acepta atributos estándar o que empiecen con `data-`.

## Fase 3 — Estilos mobile first

### Qué se hizo
Se escribió `css/styles.css` y se agregaron clases BEM al HTML. El diseño está pensado para 360 px; las pantallas grandes se ajustan en la fase 4.

### Decisiones y por qué
- **Mobile first**: el CSS base es el del celular. Después, con `@media (min-width: ...)`, se *agrega* lo necesario. Es más simple que el camino inverso (deshacer estilos de escritorio).
- **Variables CSS** en `:root` para colores, fuentes y espaciados. Cambiar el terracota es tocar una línea.
- **Terracota más oscuro** (`#A64A28`) que el de la referencia (`#B4532F`): el original da 4,3:1 contra el crema y AA pide 4,5:1. El cambio es casi imperceptible.
- **BEM** (`libro__tapa--verde`): bloque, elemento, modificador. Los nombres dicen qué es cada cosa y evitan que un estilo "se escape" a otro lado.
- **Tapas con variables locales**: cada modificador solo define `--tapa-bg` y `--tapa-fg`, y el estilo de la tapa se escribe una vez.
- **`aspect-ratio`** en tapas, fotos y mapa: reserva el espacio antes de que cargue la imagen y evita saltos de layout.
- **Margen lateral con `max()`**: una sola variable da el margen en celular y centra el contenido en pantallas anchas, sin contenedores extra en el HTML.
- **Navegación sin JS por ahora**: la barra se desliza horizontal. Ocultar el menú sin JS lo dejaría inaccesible, así que el hamburguesa espera a la fase 4.
- **Foco visible** con `:focus-visible`, que aparece al navegar con teclado pero no al hacer clic.
- **`scroll-padding-top`** para que el header fijo no tape los títulos al saltar por anclas.
- **`prefers-reduced-motion`**: quien pidió menos animaciones en su sistema no ve scroll suave.

### Alternativas descartadas
- Una grilla de 1 columna para los libros: la referencia mobile muestra 2 columnas, y así se ven más libros sin scrollear.
- Imágenes de fondo en CSS para las tapas: el color con variables pesa menos y se edita fácil.

### Conceptos nuevos
- **Custom properties** (`var(--x)`): variables que se pueden redefinir en un contexto (la sección oscura cambia `--foco`).
- **`clamp`/`max()`**: funciones de CSS para valores que se adaptan.
- **Cascada y especificidad**: por eso se usan clases simples y planas, no selectores largos.
- **`position: sticky`**: el header se pega arriba al scrollear.
- **Contadores CSS** (`counter-increment`): generan el 01, 02, 03 de los valores.

### Cómo verificar
1. Abrí `index.html`, tocá `F12` y activá la vista de dispositivo (`Ctrl+Shift+M`). Probá con 360 px de ancho.
2. Mirá que no haya scroll horizontal en la página (solo en la barra de navegación).
3. Compará con `referencias/mobile.png`: colores, tipografías, tapas en 2 columnas, agenda oscura y contacto verde.
4. Navegá con Tab: cada enlace y botón debe mostrar un contorno terracota (o claro sobre fondos oscuros).
5. Las imágenes `img/*.webp` todavía no existen: se ve el recuadro beige con el texto alternativo.
6. En pantalla ancha el contenido queda en una columna angosta. Es lo esperado hasta la fase 4.

## Fase 4 — Desktop, JavaScript y detalles visuales

### Qué se hizo
- CSS para 768 px (tablet) y 1200 px (escritorio): header en una fila, hero a dos columnas, 4 libros por fila, servicios y agenda en 3 columnas, y Nosotros, Visitanos y Contacto en 2 columnas.
- `js/main.js` (49 líneas): menú mobile e indicador "Abierto ahora / Cerrado".
- Detalles: borde de hoja recortada en el hero, subrayado a mano en "estantes", iconos en los servicios y punto de color en el indicador.

### Decisiones y por qué
- **Mejora progresiva del menú**: el JS agrega la clase `js` a `<html>` y recién ahí el CSS esconde el menú. Si el JS falla, la navegación sigue visible. Esconder el menú solo con CSS lo dejaría inaccesible.
- **`aria-expanded`** se actualiza en cada clic: avisa a los lectores de pantalla si el menú está abierto. Se cierra con Escape y al elegir un enlace.
- **Hora de Buenos Aires con `Intl.DateTimeFormat` y `timeZone`**: el navegador calcula día y hora de esa zona sin importar dónde esté el visitante. Evitamos `getHours()`, que usa la hora local del visitante.
- **Horarios en un objeto** (`HORARIOS`) al principio del archivo: se editan ahí y el resto del código no cambia. La tabla visible del HTML se edita aparte.
- **Envoltorios en el HTML** (`hero__texto`, `nosotros__cuerpo`, `visita`, `contacto`): para armar columnas con grid hace falta que los hijos directos sean las columnas.
- **Festón con `radial-gradient`** y **subrayado con un SVG en `data:`**: sin imágenes extra, así que no suman peticiones.
- **Emoji en `content` con texto alternativo vacío** (`content: "📚" / ""`): son decorativos, así que los lectores de pantalla los ignoran.
- **Breakpoints 768 y 1200**: se redefine la variable `--ancho-max` y el margen lateral se recalcula solo.

### Alternativas descartadas
- Detectar feriados: requeriría un calendario o una API. Se mantiene el aviso "consultar en Instagram".
- Animar el menú: sumaba código sin aportar a la lectura.

### Conceptos nuevos
- **Mejora progresiva**: la página funciona sin JS y el JS agrega comodidad.
- **Zonas horarias**: `new Date()` es un instante único; la hora que ves depende de la zona con que se formatea.
- **CSS Grid** para columnas, y la diferencia entre `grid` (dos dimensiones) y `flex` (una).
- **`@media (min-width)`**: aplica estilos desde un ancho en adelante.
- **Pseudoelementos** (`::before`, `::after`): decoración que no está en el HTML.

### Cómo verificar
1. Menú: en vista de 360 px, tocá "Menú": se abre y `aria-expanded` pasa a `true` (se ve en las herramientas de desarrollo). Escape lo cierra.
2. A 768 px o más desaparece el botón "Menú" y aparece "Reservar un libro" en el header.
3. Indicador: en la consola escribí `new Date()` y comparalo con el horario de la tabla. Para simularlo, probá cambiar la hora de tu PC o editá `HORARIOS`.
4. Compará con `referencias/desktop.png` a 1400 px de ancho.
5. Los placeholders de foto y el mapa se ven vacíos sin internet o sin las imágenes: es esperable.

## Fase 5 — SEO, datos estructurados y verificación

### Qué se hizo
- `<head>` completo: `description`, `canonical`, Open Graph, `twitter:card`, `theme-color` y favicon provisorio.
- Datos estructurados `BookStore` en JSON-LD (dirección, horarios, contacto, Instagram).
- Placeholders WebP con el nombre y tamaño definitivos, para que no haya imágenes rotas.
- README completo.
- Medición con Lighthouse (mobile) y correcciones.

### Resultado de Lighthouse (mobile, servidor local)
Primera medición: Performance 92, Accesibilidad 96, Buenas prácticas 96, SEO 100.
Después de los arreglos: **99 / 100 / 100 / 100**, con CLS 0 y sin errores en consola.

### Problemas encontrados y cómo se resolvieron
- **Contraste insuficiente** (3,7:1): las etiquetas terracota claro sobre el verde no llegaban a 4,5:1. Se creó `--color-terracota-pastel` (4,8:1) solo para ese fondo.
- **Salto de layout (CLS 0,16)**: al llegar la fuente real, el texto cambiaba de ancho y movía la foto. Se definieron fuentes de respaldo (`size-adjust`) con el ancho medido de Lora e Inter, así el texto casi no se mueve al cambiar.
- **Error 404 en consola**: el navegador pide `/favicon.ico` solo. Se agregó un favicon SVG embebido en el `<head>`.
- **Imágenes inexistentes**: también daban 404. Los placeholders WebP los resuelven hasta tener las fotos reales.

### Decisiones y por qué
- **JSON-LD** y no microdatos: va en un solo bloque separado del HTML visible, es el formato que recomienda Google y es fácil de editar.
- **`canonical` y URLs absolutas** en Open Graph: las redes necesitan direcciones completas para traer la imagen. Se supuso el dominio `lahojasuelta.com.ar`; hay que ajustarlo si es otro.
- **Sin coordenadas (`geo`) en el JSON-LD**: no se inventan datos. Se pueden agregar con las del mapa.
- **Fuentes desde Google Fonts** como pide el PROMPT, con `preconnect` y `display=swap`.
- **No se minificó el CSS ni se configuró compresión**: Lighthouse lo sugiere, pero Netlify comprime en producción y el archivo pesa poco.

### Alternativas descartadas
- Alojar las fuentes en el propio sitio: es más rápido pero contradice el pedido.
- `font-display: optional`: evita el salto pero puede mostrar la fuente de respaldo en la primera visita.

### Conceptos nuevos
- **Open Graph**: etiquetas `meta` que definen la tarjeta que se ve al compartir un enlace.
- **Datos estructurados (schema.org)**: describen el negocio para buscadores en un formato que entienden las máquinas.
- **Core Web Vitals**: LCP (cuándo aparece lo principal), CLS (cuánto se mueve el contenido) y TBT (cuánto se bloquea la página).
- **`size-adjust`**: ajusta el tamaño de una fuente de respaldo para que ocupe lo mismo que la real.
- **URL canónica**: le dice a Google cuál es la dirección oficial de la página.

### Cómo verificar
1. Pegá `index.html` de nuevo en validator.w3.org (pestaña "Direct Input"): no debería dar errores.
2. En Chrome, `F12` → Lighthouse → *Mobile* → *Analyze*: tienen que dar 90 o más en las cuatro categorías.
3. Abrí la consola (`F12` → *Console*): no tiene que haber errores rojos.
4. Recorré todo con `Tab` y probá el menú mobile (abre, cierra y `Escape` lo cierra).
5. Una vez desplegado en Netlify, seguí la sección "Cómo probar los formularios" del README.

## Ajuste posterior — Imágenes reales

### Qué se hizo
Se incorporaron las ilustraciones, las 8 tapas, el logo y los favicons del material entregado. Se movieron a `img/` con los nombres definitivos.

### Decisiones y por qué
- **Tapas como `<img>`** en vez de bloques de color: las imágenes ya traen categoría, título y autor dibujados. Las etiquetas (Nuevo, Usado, Agotado) quedaron como texto HTML encima, porque cambian con el tiempo y deben poder editarse sin rehacer la imagen.
- **`alt` descriptivo en las tapas** ("Tapa de X, de Y"): antes las tapas eran decorativas (`aria-hidden`) porque eran solo color; ahora son contenido visual con información.
- **Texto `alt` del hero corregido**: decía "Fachada…", pero la imagen son estantes. El `alt` tiene que describir lo que se ve.
- **Logo con `alt=""`**: está junto al nombre escrito. Si tuviera `alt`, el lector de pantalla repetiría "La Hoja Suelta" dos veces.
- **Favicon en SVG con respaldo PNG** y `apple-touch-icon` para el ícono al guardar el sitio en el celular.
- **Se borró CSS que ya no hacía falta** (colores de tapa, adorno circular, logo dibujado): menos código que mantener.

### Conceptos nuevos
- **Imagen decorativa vs. informativa**: la decorativa lleva `alt=""` (o `aria-hidden`); la informativa, una descripción.
- **`object-fit: cover`**: la imagen llena su caja y se recorta sin deformarse.

### Cómo verificar
1. Abrí `index.html`: se ven las 8 tapas con su etiqueta, el logo y el favicon en la pestaña.
2. Revisá que no haya errores 404 en la consola (`F12`).
3. Antes de desplegar, mové o borrá `img/materiales-la-hoja-suelta/`.

## Ajuste posterior — URLs de Netlify y vista previa en redes

### Qué se hizo
- `canonical`, `og:url`, `og:image` y los datos estructurados ahora usan el dominio real: `https://librerialahojasuelta.netlify.app`. Antes se había supuesto un dominio que no existe.
- `og:image` pasó a `img/og-imagen.jpg` (1200×630) y se agregaron `og:image:type`, `og:image:width` y `og:image:height` (el `alt` ya estaba).
- El espacio entre "Ver novedades" y la flecha: el HTML ya tenía un espacio, pero el botón es `inline-flex` y en un contenedor flex el espacio entre elementos se descarta. Se resolvió con `gap` en `.btn`.

### Por qué la vista previa necesita URLs absolutas
Quien genera la vista previa (WhatsApp, Instagram, Facebook, X) no abre tu página como un navegador: un servidor suyo descarga el HTML, lee las etiquetas `og:` y después, en otra petición, descarga la imagen. Una ruta relativa como `img/og-imagen.jpg` solo tiene sentido dentro de tu sitio, relativa a la dirección de la página que la contiene; ese servidor no tiene ese contexto, y menos aún cuando el mismo dato se guarda en una caché y se muestra en otro lugar. La URL absoluta (`https://...`) dice con exactitud dónde buscar la imagen. Además:
- Tiene que ser pública y accesible por https, sin login.
- JPG o PNG es lo más compatible; WebP no lo aceptan todas las plataformas.
- Declarar ancho y alto deja a la red armar la tarjeta sin esperar a descargar la imagen.
- Las redes guardan en caché la vista previa: si cambiás la imagen, hay que pedirle a la plataforma que la actualice (por ejemplo con el depurador de enlaces de Facebook).

### Cómo verificar
1. Abrí https://www.opengraph.xyz con la dirección publicada y mirá título, descripción e imagen.
2. Abrí en el navegador `https://librerialahojasuelta.netlify.app/img/og-imagen.jpg`: tiene que verse la imagen.
3. Compará el botón "Ver novedades →": ahora hay espacio entre el texto y la flecha.
