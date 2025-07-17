const asignaturas = document.querySelectorAll('.asignatura');
const progreso = document.getElementById('progreso');

// Cargar progreso guardado
let estado = JSON.parse(localStorage.getItem('estado_malla')) || {};

function actualizarEstados() {
  asignaturas.forEach(asig => {
    const id = asig.dataset.id;
    const estadoAsig = estado[id];

    asig.classList.remove('en-curso', 'aprobada');

    if (estadoAsig === 'en-curso') {
      asig.classList.add('en-curso');
    } else if (estadoAsig === 'aprobada') {
      asig.classList.add('aprobada');
    }
  });
  actualizarProgreso();
}

function actualizarProgreso() {
  const total = asignaturas.length;
  let aprobadas = 0;
  for (let id in estado) {
    if (estado[id] === 'aprobada') aprobadas++;
  }
  const porcentaje = Math.round((aprobadas / total) * 100);
  progreso.textContent = `Progreso: ${porcentaje}%`;
}

// Cambiar estado al hacer clic
asignaturas.forEach(asig => {
  const id = asig.dataset.id;

  asig.addEventListener('click', () => {
    if (!estado[id]) {
      estado[id] = 'en-curso';
    } else if (estado[id] === 'en-curso') {
      estado[id] = 'aprobada';
    } else {
      delete estado[id];
    }

    localStorage.setItem('estado_malla', JSON.stringify(estado));
    actualizarEstados();
  });
});

actualizarEstados();
