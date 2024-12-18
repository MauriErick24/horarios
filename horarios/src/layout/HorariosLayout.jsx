import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Calendar from "../components/New/Calendar";
import schedule from "../components/data/materias";

const drawerBleeding = 56;
const Root = styled("div")(({ theme }) => ({
  height: "100%",
  width: "100%",
  backgroundColor: grey[100],
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.default,
  }),
}));

function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const [open, setOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    if (selectedCareer && selectedSemesters.length > 0) {
      const selectedSemesterTitles = selectedSemesters.map(
        (semester) => semester.id
      );

      const subjects = schedule.horario.flatMap((career) => {
        if (career.carrera !== selectedCareer.nombre) return [];
        return career.semestre
          .filter((semester) =>
            selectedSemesterTitles.includes(String(semester.nivel))
          )
          .flatMap((semester) =>
            semester.materia.map((materia) => ({
              nombre: materia.nombre,
              grupos: materia.docentes.map((docente) => ({
                grupo: docente.grupo,
                docentes: docente.nombre,
                horarios: docente.dia,
              })),
            }))
          );
      });

      setFilteredSubjects(subjects);
    } else {
      setFilteredSubjects([]);
    }
  }, [selectedCareer, selectedSemesters]);

  const handleChange = (event) => {
    console.log("🚀 ~ handleChange ~ event:", event);
    setSelectedSubjects(event);
  };

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(65% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <Box>
        <h1 className="exo-2-bold" style={{ margin: 0 }}>
          Horario:
        </h1>
        <Box sx={{ width: "100%", pb: 5 }}>
          <Calendar
            scheduleData={schedule}
            selectedSubjects1={selectedSubjects}
            setSelectedSubjects={setSelectedSubjects}
          />
        </Box>
      </Box>
    </Root>
  );
}
export default SwipeableEdgeDrawer;
