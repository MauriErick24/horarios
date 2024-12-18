import React from "react";

export const Ayuda = () => {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <h1>
        <button
          onClick={() => handleScroll("ayudas")}
          style={{
            all: "unset",
            cursor: "pointer",

            textDecoration: "underline",
          }}
        >
          Ayudas
        </button>{" "}
        y{" "}
        <button
          onClick={() => handleScroll("preguntas")}
          style={{
            all: "unset",
            cursor: "pointer",

            textDecoration: "underline",
          }}
        >
          Preguntas Frecuentes
        </button>
      </h1>
      <br />

      <div>
        <h2 id="ayudas">Ayudas</h2>

        <div>
          <h3>¿Cómo comienzo a usar el calendario?</h3>
          <ul>
            <li>
              Selecciona la carrera que deseas en el primer campo desplegable.
              Esto cargará automáticamente los semestres y materias disponibles.
            </li>
            <li>
              Luego, selecciona uno o varios semestres. Esto filtrará las
              materias que corresponden a esos semestres.
            </li>
            <li>
              Finalmente, en la sección de Materias, elige las materias que
              deseas agregar a tu horario.
            </li>
          </ul>
        </div>
        <div>
          <h3>¿Qué hago si mi horario tiene demasiados conflictos?</h3>
          <ul>
            <li>
              Los conflictos (cuando dos materias se solapan) aparecen
              resaltados en rojo tanto en el horario como en la sección de
              "Conflictos".
            </li>
            <li>
              Para resolverlos, puedes deseleccionar alguna de las materias
              conflictivas en la lista de "Materias".
            </li>
            <li>
              Revisa si hay otro grupo disponible para la misma materia que no
              cause conflicto.
            </li>
          </ul>
        </div>
        <div>
          <h3>¿Puedo guardar mi horario?</h3>
          <ul>
            <li>
              Si, primero debes seleccionar al menos una materia y después
              presionar el botón <strong>Exportar calendario a PNG.</strong>
            </li>
            <li>La imagen comenzará a descargarse.</li>
          </ul>
        </div>
      </div>

      <br />
      <div>
        <h2 id="preguntas">Preguntas frecuentes</h2>

        <div>
          <h3>¿Qué hago si no encuentro una materia en la lista?</h3>
          <ul>
            <li>
              Asegúrate de haber seleccionado la carrera y el semestre correcto.
              Si no aparece, verifica si es una materia optativa o especial, que
              podría no estar incluida en los semestres generales.
            </li>
          </ul>
        </div>
        <div>
          <h3>¿Por qué no puedo ver todo el calendario en mi pantalla?</h3>
          <ul>
            <li>
              En pantallas pequeñas, solo se muestra una parte del calendario.
              Usa la barra de desplazamiento horizontal para moverte y ver todos
              los días. También puedes ampliar la ventana del navegador o usar
              un dispositivo con pantalla más grande para una mejor
              visualización.
            </li>
          </ul>
        </div>
        <div>
          <h3>¿Qué sucede si selecciono más de 9 materias?</h3>
          <ul>
            <li>
              El calendario está diseñado para mostrar hasta 9 materias con
              colores distintos. Si seleccionas más, las materias adicionales no
              tendrán un color asignado, lo que puede dificultar su
              identificación.
            </li>
          </ul>
        </div>
        <div>
          <h3>¿Cómo identificar los conflictos en el horario?</h3>
          <ul>
            <li>
              Los conflictos aparecen automáticamente resaltados en rojo dentro
              del calendario. Además, en la sección "Conflictos", puedes ver un
              listado detallado que incluye el día, la hora y las materias que
              se solapan.
            </li>
          </ul>
        </div>
        <div>
          <h3>¿Qué pasa si tengo materias en varios semestres?</h3>
          <ul>
            <li>
              El calendario soporta la selección de materias de múltiples
              semestres. Selecciona todos los semestres en los que tengas
              materias y luego elige las materias que deseas incluir en tu
              horario.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
