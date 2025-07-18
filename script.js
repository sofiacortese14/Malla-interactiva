document.addEventListener('DOMContentLoaded', () => {
  const asignaturas = document.querySelectorAll('.asignatura');
  const progresoTexto = document.getElementById('progreso');

  function actualizarProgreso() {
    const total = asignaturas.length;
    const completadas = document.querySelectorAll('.asignatura.completada').length;
    const porcentaje = Math.round((completadas / total) * 100);
    progresoTexto.textContent = `Progreso: ${porcentaje}%`;
  }

  asignaturas.forEach(asignatura => {
    asignatura.addEventListener('click', () => {
      asignatura.classList.toggle('completada');
      actualizarProgreso();
    });
  });

  actualizarProgreso(); // Para inicializar con progreso 0
});
