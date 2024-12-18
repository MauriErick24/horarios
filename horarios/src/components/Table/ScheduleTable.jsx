import React, { useState } from "react";
import "./ScheduleTable.css";

const ScheduleApp = ({ initialSchedule }) => {
  const [schedule, setSchedule] = useState(() => {
    const clearedSchedule = { ...initialSchedule };
    Object.keys(clearedSchedule).forEach((day) => {
      clearedSchedule[day] = clearedSchedule[day].map(() => null);
    });
    return clearedSchedule;
  });

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const colors = ["#FFCCCB", "#CCE5FF", "#D5FFD5", "#FFFACD", "#E6CCFF"];

  const handleSubjectToggle = (subjectName) => {
    if (selectedSubjects.includes(subjectName)) {
      setSelectedSubjects((prev) => prev.filter((s) => s !== subjectName));
      removeSubjectFromSchedule(subjectName);
    } else {
      setSelectedSubjects((prev) => [...prev, subjectName]);
      addSubjectToSchedule(subjectName);
    }
  };

  const addSubjectToSchedule = (subjectName) => {
    const updatedSchedule = { ...schedule };
    Object.keys(updatedSchedule).forEach((day) => {
      updatedSchedule[day] = initialSchedule[day].map((slot, index) =>
        slot?.subject === subjectName ? slot : schedule[day][index]
      );
    });
    setSchedule(updatedSchedule);
  };

  const removeSubjectFromSchedule = (subjectName) => {
    const updatedSchedule = { ...schedule };
    Object.keys(updatedSchedule).forEach((day) => {
      updatedSchedule[day] = updatedSchedule[day].map((slot) =>
        slot?.subject === subjectName ? null : slot
      );
    });
    setSchedule(updatedSchedule);
  };

  const renderSchedule = () => {
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const timeSlots = [];

    let currentTime = 6 * 60 + 45;
    while (currentTime <= 21 * 60 + 45) {
      const hours = Math.floor(currentTime / 60);
      const minutes = currentTime % 60;
      timeSlots.push(`${hours}:${minutes < 10 ? "0" : ""}${minutes}`);
      currentTime += 90;
    }

    return (
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Hora</th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
            <th>Sábado</th>
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, index) => (
            <tr key={index}>
              <td>{time}</td>
              {days.map((day) => (
                <td key={day}>
                  {schedule[day]?.[index] ? (
                    <div
                      style={{
                        backgroundColor:
                          colors[
                            initialSchedule[day]
                              ?.map((slot) => slot?.subject)
                              .indexOf(schedule[day][index]?.subject) %
                              colors.length
                          ],
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      <strong>{schedule[day][index].subject}</strong>
                      <br />
                      Aula: <strong>{schedule[day][index].room}</strong>
                      <br />
                      Prof: <strong>{schedule[day][index].teacher}</strong>
                      <br />
                      Carrera: <strong>{schedule[day][index].career}</strong>
                      <br />
                      Grupo: <strong>{schedule[day][index].group}</strong>
                    </div>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="schedule-app">
      <div className="schedule-view">{renderSchedule()}</div>
      <div className="subject-list">
        <h3>Materias</h3>
        {Array.from(
          new Set(
            Object.values(initialSchedule)
              .flat()
              .filter((slot) => slot)
              .map((slot) => slot.subject)
          )
        ).map((subjectName, index) => (
          <div key={subjectName}>
            <label>
              <input
                type="checkbox"
                checked={selectedSubjects.includes(subjectName)}
                onChange={() => handleSubjectToggle(subjectName)}
              />
              <span
                style={{
                  backgroundColor: colors[index % colors.length],
                  padding: "3px 6px",
                  borderRadius: "3px",
                  marginRight: "5px",
                }}
              >
                {subjectName}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleApp;
