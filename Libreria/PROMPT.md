Quiero crear el sitio web de **Librería La Hoja Suelta**, una librería independiente de barrio con libros nuevos y usados, en **Villa Crespo, Buenos Aires, Argentina**.

## Objetivo
Que la gente del barrio y lectores de toda la ciudad descubran la librería, sepan qué tenemos, cuándo abrimos y cómo llegar, y que se anoten a los eventos (presentaciones y club de lectura). También que puedan reservar un libro por WhatsApp antes de venir.

Público: lectores de 25 a 55 años, vecinos de Villa Crespo, Palermo y Almagro, y estudiantes de la UBA. El 80% entra desde el celular, muchas veces desde Instagram o Google Maps, caminando por la zona o buscando "librería cerca".

## Contenido real
- Qué ofrece:
  - Libros nuevos: narrativa latinoamericana, poesía, ensayo, editoriales independientes argentinas (Eterna Cadencia, Blatt & Ríos, Godot, Sigilo).
  - Libros usados y agotados: compra, venta y canje.
  - Sección infantil y juvenil con rincón de lectura.
  - Club de lectura mensual (primer jueves de cada mes, 19 h, $3.000 con café incluido).
  - Presentaciones de libros y lecturas en vivo los sábados.
  - Pedidos especiales: si no lo tenemos, lo conseguimos en 7 a 10 días.
  - Envíos en CABA por moto ($2.500) y al resto del país por correo.
  - Gift cards desde $10.000.
- Dirección: Av. Corrientes 5280, Villa Crespo, CABA (a 2 cuadras de la estación Malabia, línea B).
- Horarios: lunes a viernes de 10 a 20 h; sábados de 10 a 21 h; domingos cerrado. Feriados: consultar en Instagram.
- Contacto:
  - WhatsApp: +54 9 11 5555-0123 (reservas y pedidos)
  - Mail: hola@lahojasuelta.com.ar
  - Instagram: @lahojasuelta.libros
- Medios de pago: efectivo (10% de descuento), débito, crédito en 3 cuotas sin interés, Mercado Pago.

## Secciones
1. **Inicio (hero)**: nombre, frase de marca ("Libros con historia, en un barrio con historias"), foto del local y dos botones: "Ver novedades" y "Cómo llegar".
2. **Novedades y recomendados**: 6 a 8 libros destacados con tapa, título, autor, precio y una recomendación corta escrita por el librero. Botón "Reservar por WhatsApp" en cada uno.
3. **Qué hacemos**: tarjetas con los servicios (nuevos, usados y canje, infantil, pedidos especiales, envíos, gift cards).
4. **Agenda**: próximos eventos con fecha, hora, descripción y botón para anotarse. Incluye el club de lectura.
5. **Nosotros**: historia breve (abrió en 2014, la fundaron dos hermanas ex bibliotecarias), foto del equipo y valores (librería independiente, curaduría, barrio).
6. **Visitanos**: dirección, mapa embebido, horarios en tabla, medios de pago y cómo llegar en subte y colectivo (líneas 15, 42, 55, 65).
7. **Contacto / footer**: WhatsApp, mail, Instagram, formulario simple (nombre, mail, mensaje) y suscripción al newsletter mensual.

## Estilo
- Personalidad: cálida, culta pero cercana, con algo de humor. Como charlar con un librero que sabe mucho y no te hace sentir mal por no haber leído a Borges. Tuteo/voseo rioplatense.
- Paleta orientativa: tonos papel y tinta. Fondo crema, texto casi negro, un acento terracota y un verde oscuro secundario. Nada de blanco puro ni negro puro.
- Tipografías: una serif con personalidad para títulos (por ejemplo, Fraunces o Playfair Display) y una sans legible para el texto (Inter o Source Sans 3). Máximo dos familias, cargadas desde Google Fonts. Si la paleta o las tipografías difieren de las referencias visuales, priorizá las referencias.
- Imágenes: fotos reales del local, estanterías, manos con libros y luz natural. Nada de bancos de imágenes genéricos. Las tapas de libros en tamaño uniforme. Detalles gráficos sutiles, como una línea que imite el corte de una hoja o un subrayado a mano.

## Referencias visuales
En la carpeta referencias/ hay tres diseños:
- referencias/desktop.png: la página completa en escritorio.
- referencias/mobile.png: la página completa en celular.
- referencias/hero.png: detalle del inicio en escritorio y celular.

Seguí estas referencias de forma fiel en estructura, paleta, tipografías,
espaciados y estilo de los componentes. Usá los textos que aparecen en
ellas. Si una imagen contradice este documento, este documento manda.

Elementos de las referencias que sí quiero:
- Header con el botón "Reservar un libro" y botón flotante de WhatsApp en mobile.
- Indicador "Abierto ahora / Cerrado" según el horario real, calculado siempre con la hora de Buenos Aires (America/Argentina/Buenos_Aires), no con la del navegador del visitante.
- Libros sin foto de tapa: usá tapas ilustradas de color como en la referencia.

Diferencias con las referencias:
- El mapa de "Visitanos" es un Google Maps embebido real, no una ilustración.

## Requisitos técnicos
- HTML semántico (header, nav, main, section, article, footer) y jerarquía correcta de encabezados (un solo h1).
- Mobile first: diseñar desde 360 px y escalar con media queries a 768 px y 1200 px.
- Accesibilidad: contraste mínimo AA (4.5:1), texto alternativo en todas las imágenes, navegable con teclado y foco visible, labels en los formularios, lang="es-AR".
- CSS ordenado: variables CSS para colores, tipografías y espaciados; metodología BEM o similar; comentarios por sección; sin estilos inline.
- Rendimiento: imágenes en WebP con loading="lazy", tamaño de página razonable.
- SEO básico: title y meta description, Open Graph para compartir en redes y datos estructurados de tipo BookStore (dirección y horarios).
- Sin frameworks ni librerías. JavaScript vanilla SOLO para el menú mobile (abrir/cerrar y aria-expanded) y el indicador de abierto/cerrado, en menos de 50 líneas. Todo lo demás (WhatsApp, formularios, scroll suave) se resuelve con HTML y CSS.

## Aclaraciones
- Es una sola página (index.html) con navegación por anclas.
- No hay backend. Formulario de contacto y newsletter: usar Netlify Forms.
  "Reservar" y "Anotarme" abren WhatsApp con un mensaje precargado que
  incluye el título del libro o el nombre del evento.
- No tengo fotos todavía: usá placeholders con el tamaño final y el nombre
  de archivo definitivo (por ejemplo, img/local-fachada.webp, 1200x800).
- Marcá con comentarios dónde se editan las novedades y los eventos, para
  que yo pueda actualizarlos sin conocer todo el código.

## Fuera de alcance
Carrito, pagos online, buscador, login y panel de administración.

## Estructura de archivos
index.html, css/styles.css, js/main.js, img/, README.md, APRENDIZAJE.md

## Criterios de terminado
- Lighthouse 90+ en las cuatro categorías, en mobile.
- Sin errores en el validador del W3C ni en la consola.
- Se puede navegar todo el sitio solo con el teclado.
- El README explica cómo probar los formularios una vez desplegado en Netlify (en local no envían).

## Documentación
- Comentarios en el código: cortos, explican el porqué y no el qué. Además,
  marcas claras de dónde editar novedades, eventos y horarios.
- README.md: qué es el proyecto, estructura de carpetas, cómo verlo en local,
  cómo editar novedades, eventos y horarios, cómo reemplazar los placeholders
  por fotos reales, y cómo desplegar en Netlify y probar los formularios.
- APRENDIZAJE.md: al terminar cada fase, agregá una sección con las decisiones
  que tomaste, por qué, qué alternativas descartaste y los conceptos nuevos
  que aparecieron (por ejemplo, por qué usaste article y no div). Escribilo
  para alguien que está aprendiendo.

## Fases (esperá mi aprobación al terminar cada una)
1. Propuesta: estructura de secciones, jerarquía de encabezados, y la paleta y tipografías que extraés de las referencias. Sin código.
2. HTML semántico completo, sin estilos.
3. Estilos mobile first.
4. Desktop, JavaScript (menú e indicador de horario) y detalles visuales.
5. SEO, datos estructurados y verificación de los criterios de terminado.

Al final de cada fase: actualizá APRENDIZAJE.md y decime cómo verificar
lo que hiciste.
