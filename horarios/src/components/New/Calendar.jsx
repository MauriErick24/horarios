import React, { useState } from "react";
import "./Calendar.css";
import schedule from "../data/materias";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Chip } from "@mui/material";
import html2canvas from "html2canvas";

const generateTimeSlots = () => {
  const timeSlots = [];
  let hour = 6;
  let minute = 45;

  for (let i = 0; i < 10; i++) {
    const startTime = `${String(hour).padStart(2, "0")}:${String(
      minute
    ).padStart(2, "0")}`;
    minute += 90;
    if (minute >= 60) {
      hour += Math.floor(minute / 60);
      minute %= 60;
    }
    const endTime = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
    timeSlots.push({ startTime, endTime });
  }
  return timeSlots;
};

const getColor = (index) => {
  const colors = [
    "#14471E",
    "#68904D",
    "#DA6A00",
    "#EE9B01",
    "#513C2F",
    "#5A7A0A",
    "#AA1803",
    "#BD613C",
    "#9E9E9E",
  ];
  return colors[index % colors.length];
};

const Calendar = () => {
  const [selectedCareer, setSelectedCareer] = useState("");
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const calendarRef = React.useRef(null);

  const exportToPNG = () => {
    if (selectedSubjects.length > 0) {
      if (calendarRef.current) {
        html2canvas(calendarRef.current).then((canvas) => {
          const link = document.createElement("a");
          link.download = "calendario.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        });
      }
    } else {
      alert("selecciona como minimo una materia");
    }
  };

  const timeSlots = generateTimeSlots();
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  const availableSemesters =
    schedule.horario.find((c) => c.carrera === selectedCareer)?.semestre || [];

  const handleSemesterChange = (e) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setSelectedSemesters((prevSemesters) => {
      const newSemesters = new Set(prevSemesters);
      options.forEach((option) => {
        if (newSemesters.has(option)) {
          newSemesters.delete(option);
        } else {
          newSemesters.add(option);
        }
      });
      return Array.from(newSemesters);
    });
  };

  const availableSubjects = availableSemesters
    .filter((sem) => selectedSemesters.includes(sem.nivel))
    .flatMap((sem) =>
      sem.materia.map((materia) => ({
        nombre: materia.nombre,
        docentes: materia.docentes,
        semestre: sem.nivel,
      }))
    );

  const handleSubjectChange = (e, newValue) => {
    setSelectedSubjects((prevSubjects) => {
      const updatedSubjects = [...prevSubjects];

      newValue.forEach((value) => {
        if (typeof value !== "string") {
          const [subjectName, group] = value.value.split("-");
          const existingSubject = updatedSubjects.find(
            (subject) => subject.value === value.value
          );

          if (!existingSubject && updatedSubjects.length < 9) {
            const subject = availableSubjects
              .flatMap((materia) =>
                materia.docentes.map((docente) => ({
                  semestre: `Semestre ${materia.semestre}`,
                  materia: materia.nombre,
                  label: `Grupo ${docente.grupo}: ${docente.nombre}`,
                  value: `${materia.nombre}-${docente.grupo}`,
                }))
              )
              .find((subject) => subject.value === value.value);

            if (subject) updatedSubjects.push(subject);
          }
        }
      });

      return updatedSubjects;
    });
  };

  const scheduleEvents = selectedSubjects.flatMap((subject) => {
    if (typeof subject !== "string") {
      const [subjectName, group] = subject.value.split("-");

      const materia = availableSubjects.find((m) => m.nombre === subjectName);

      return materia?.docentes
        .filter((docente) => docente.grupo === group)
        .flatMap((docente) =>
          docente.dia.map((dia) => ({
            nombre: dia.nombre,
            horaInicio: dia.horaInicio,
            horaFin: dia.horaFin,
            aula: dia.aula,
            materia: materia.nombre,
            grupo: group,
            color: getColor(selectedSubjects.indexOf(subject)),
          }))
        );
    } else {
      const [subjectName, group] = subject.split("-");

      const materia = availableSubjects.find((m) => m.nombre === subjectName);

      return materia?.docentes
        .filter((docente) => docente.grupo === group)
        .flatMap((docente) =>
          docente.dia.map((dia) => ({
            nombre: dia.nombre,
            horaInicio: dia.horaInicio,
            horaFin: dia.horaFin,
            aula: dia.aula,
            materia: materia.nombre,
            grupo: group,
            color: getColor(selectedSubjects.indexOf(subject)),
          }))
        );
    }
  });

  const detectConflicts = (events) => {
    const conflicts = [];
    events.forEach((event1) => {
      events.forEach((event2) => {
        if (event1 !== event2 && event1.nombre === event2.nombre) {
          if (
            (event1.horaInicio >= event2.horaInicio &&
              event1.horaInicio < event2.horaFin) ||
            (event2.horaInicio >= event1.horaInicio &&
              event2.horaInicio < event1.horaFin)
          ) {
            conflicts.push([event1, event2]);
          }
        }
      });
    });
    return conflicts;
  };

  const conflicts = detectConflicts(scheduleEvents);

  const handleRemoveSubject = (subject) => {
    setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
  };

  const objetivoRef = React.useRef(null);

  const handleScroll = () => {
    objetivoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isEventInConflict = (event, conflicts) => {
    return conflicts.some(
      ([conflictEvent1, conflictEvent2]) =>
        event === conflictEvent1 || event === conflictEvent2
    );
  };

  return (
    <div className="calendar-container" ref={calendarRef}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            textAlign: "center",
            pt: 0,
            border: "2px solid #1976d2",
            borderRadius: "5px",
            margin: "5px",
          }}
        >
          <Button onClick={handleScroll}>
            <p className="exo-2-bold">Buscar materias</p>
          </Button>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            pt: 0,
            border: "2px solid #1976d2",
            borderRadius: "5px",
            margin: "5px",
          }}
        >
          <Button onClick={exportToPNG}>
            <p className="exo-2-bold"> Exportar Calendario a PNG</p>
          </Button>
        </Box>
      </div>

      {/* Calendario */}
      <div className="calendar-main">
        <div className="calendar-time-column">
          <div
            className="calendar-empty-header"
            style={{
              height: "44px",
              textAlign: "center",
              padding: "10px 0",
              fontWeight: "bold",
            }}
          >
            Hora
          </div>
          {timeSlots.map((slot, index) => (
            <div key={index} className="calendar-time-slot">
              {slot.startTime}
            </div>
          ))}
        </div>

        <div className="calendar-scrollable">
          <div className="calendar-header">
            {days.map((day) => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-body">
            {days.map((day) => (
              <div key={day} className="calendar-day-column">
                {timeSlots.map((slot, index) => {
                  const event = scheduleEvents.find(
                    (e) => e.nombre === day && e.horaInicio === slot.startTime
                  );

                  const hasConflict = event
                    ? isEventInConflict(event, conflicts)
                    : false;

                  return (
                    <div key={index} className="calendar-cell">
                      {event ? (
                        <div
                          className="calendar-event"
                          style={{
                            backgroundColor: event.color,
                            border: hasConflict
                              ? "5px solid red"
                              : "1px solid #ccc",
                            display: "flex",
                            flexDirection: "column",
                            color: "white",
                          }}
                        >
                          <p style={{ margin: "0px" }} className="exo-2-bold">
                            {event.materia}
                          </p>
                          <p style={{ margin: "0px" }}>
                            G{event.grupo}: {event.aula}
                          </p>
                        </div>
                      ) : (
                        <div className="calendar-empty-cell"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Conflictos */}
      {conflicts.length > 0 && (
        <div className="calendar-conflicts">
          <h3>Conflictos Detectados</h3>
          <ul>
            {conflicts.map((conflict, index) => (
              <li key={index}>
                Conflicto entre {conflict[0].materia} Aula: {conflict[0].aula} y{" "}
                {conflict[1].materia} Aula: {conflict[1].aula} en{" "}
                {conflict[0].nombre} ({conflict[0].horaInicio} -{" "}
                {conflict[0].horaFin})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Selectores */}
      <div
        id="objetivo"
        ref={objetivoRef}
        style={{
          height: "200px",
        }}
      >
        <div className="selectors" id="selectors">
          {/* Selector de Carrera */}
          <Autocomplete
            value={selectedCareer}
            onChange={(e, newValue) => setSelectedCareer(newValue)}
            options={schedule.horario.map((carrera) => carrera.carrera)}
            renderInput={(params) => (
              <TextField {...params} label="Selecciona una carrera" />
            )}
            sx={{ width: "100%" }}
            disableClearable
          />

          {/* Selector de Semestres */}
          {selectedCareer && (
            <Autocomplete
              multiple
              value={selectedSemesters}
              sx={{ width: "100%" }}
              onChange={(e, newValue) => setSelectedSemesters(newValue)}
              options={availableSemesters.map((sem) => sem.nivel)}
              renderInput={(params) => (
                <TextField {...params} label="Selecciona los semestres" />
              )}
              disableClearable
            />
          )}

          {/* Selector de Materias */}
          {selectedSemesters.length > 0 && (
            <Autocomplete
              multiple
              sx={{ width: "100%" }}
              value={selectedSubjects.map((subject) => subject)}
              onChange={handleSubjectChange}
              groupBy={(option) => `${option.semestre} - ${option.materia}`}
              options={availableSubjects.flatMap((materia) =>
                materia.docentes.map((docente) => ({
                  semestre: `Semestre ${materia.semestre}`,
                  materia: materia.nombre,
                  label: `Grupo ${docente.grupo}: ${docente.nombre}`,
                  value: `${materia.nombre}-${docente.grupo}`,
                }))
              )}
              renderInput={(params) => (
                <TextField {...params} label="Busca por docente" />
              )}
              disableClearable
              renderTags={(value, getTagProps) => {
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    onDelete={() => {
                      setSelectedSubjects((prev) =>
                        prev.filter((subject) => subject.value !== option)
                      );
                    }}
                  />
                ));
              }}
            />
          )}
        </div>
      </div>

      {/* Lista de Materias Seleccionadas */}
      <div className="selected-subjects">
        <h3>Materias Seleccionadas</h3>
        <ul>
          {selectedSubjects.map((subject) => (
            <li key={subject.value}>
              {subject.label}
              <button onClick={() => handleRemoveSubject(subject)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
