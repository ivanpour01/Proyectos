/* La Hoja Suelta · JS mínimo: menú mobile e indicador "Abierto ahora" */

// La clase "js" deja que el CSS oculte el menú solo si este script corre.
document.documentElement.classList.add('js');

// --- Menú mobile ---
const boton = document.querySelector('.header__menu-btn');
const menu = document.getElementById('menu-principal');
const abrir = (si) => {
  boton.setAttribute('aria-expanded', si);
  menu.classList.toggle('nav--abierto', si);
};
boton.addEventListener('click', () => abrir(boton.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', (e) => e.target.closest('a') && abrir(false));
document.addEventListener('keydown', (e) => e.key === 'Escape' && abrir(false));

// --- Abierto ahora / Cerrado ---
// EDITAR HORARIOS: [abre, cierra] en horas. 0 = domingo ... 6 = sábado. null = cerrado.
// Los feriados no se detectan: se avisan por Instagram.
const HORARIOS = { 0: null, 1: [10, 20], 2: [10, 20], 3: [10, 20], 4: [10, 20], 5: [10, 20], 6: [10, 21] };
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

function actualizarEstado() {
  // Siempre hora de Buenos Aires, no la del navegador del visitante.
  const partes = new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires', weekday: 'long', hour: 'numeric', hourCycle: 'h23',
  }).formatToParts(new Date());
  const valor = (tipo) => partes.find((p) => p.type === tipo).value;
  const dia = DIAS.indexOf(valor('weekday').toLowerCase());
  const hora = Number(valor('hour'));
  const hoy = HORARIOS[dia];
  const abierto = hoy && hora >= hoy[0] && hora < hoy[1];

  let detalle = '';
  if (abierto) {
    detalle = `hasta las ${hoy[1]} h`;
  } else {
    // Busca el próximo día con horario (hoy mismo si todavía no abrió).
    for (let i = hoy && hora < hoy[0] ? 0 : 1; i <= 7; i++) {
      const prox = HORARIOS[(dia + i) % 7];
      if (prox) { detalle = `abre ${['hoy', 'mañana'][i] || DIAS[(dia + i) % 7]} a las ${prox[0]} h`; break; }
    }
  }
  document.getElementById('estado-horario').textContent = abierto ? 'Abierto ahora' : 'Cerrado';
  document.getElementById('estado-detalle').textContent = detalle;
  document.querySelector('.estado').classList.toggle('estado--cerrado', !abierto);
}
actualizarEstado();
setInterval(actualizarEstado, 60000);
