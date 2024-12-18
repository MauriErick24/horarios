// Función para generar un color aleatorio que no se repita
function getRandomColor(usedColors) {
  let color;
  do {
    // Generar color aleatorio en formato hexadecimal
    color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  } while (usedColors.has(color)); // Verificar que el color no se haya usado previamente
  usedColors.add(color); // Añadir el color al conjunto de usados
  return color;
}

// Parser que asigna colores únicos a cada materia
export function parseSchedule(data) {
  const slotTimesLookup = {
    0: "6:45 - 8:15",
    1: "8:15 - 9:45",
    2: "9:45 - 11:15",
    3: "11:15 - 12:45",
    4: "12:45 - 14:15",
    5: "14:15 - 15:45",
    6: "15:45 - 17:15",
    7: "17:15 - 18:45",
    8: "18:45 - 20:15",
    9: "20:15 - 21:45",
  };

  const days = {
    Lunes: 0,
    Martes: 1,
    Miércoles: 2,
    Jueves: 3,
    Viernes: 4,
    Sábado: 5,
  };

  const rows = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    time: slotTimesLookup[index],
    slots: Array(6).fill(null),
  }));

  const usedColors = new Set(); // Conjunto para almacenar colores ya utilizados
  const materiaColors = {}; // Objeto para almacenar el color asignado a cada materia

  data.forEach((materia) => {
    // Asignar un color único si aún no se ha asignado
    if (!materiaColors[materia.materia]) {
      materiaColors[materia.materia] = getRandomColor(usedColors);
    }

    materia.horarios.forEach((horario) => {
      const slotIndex = Object.values(slotTimesLookup).indexOf(
        `${horario.horaInicio} - ${horario.horaFin}`
      );
      const dayIndex = days[horario.dia];

      if (slotIndex !== -1 && dayIndex !== undefined) {
        // Formato con la materia y su color asignado
        const cellContent = `${materia.materia}\nAula: ${horario.aula}\nGrupo: ${materia.grupo}`;
        rows[slotIndex].slots[dayIndex] = {
          content: cellContent,
          color: materiaColors[materia.materia], // Asignar color
        };
      }
    });
  });

  return { rows, materiaColors };
}
