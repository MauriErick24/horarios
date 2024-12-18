import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Aula } from "./Aula";
import Pensum from "./Pensum";

export default function BasicButtonGroup({ onClick1, onClick2 }) {
  const [showAulas, setShowAulas] = React.useState(true);
  const [showPensum, setShowPensum] = React.useState(false);

  const handleClickAulas = () => {
    setShowAulas(true);
    setShowPensum(false);
  };

  const handleClickPensun = () => {
    setShowAulas(false);
    setShowPensum(true);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <ButtonGroup
        variant="contained"
        aria-label="Basic button group"
        sx={{ bgcolor: "#1c3f73" }}
      >
        <Button
          sx={{ bgcolor: "#ccc", color: "#1c3f73", width: "100%" }}
          onClick={handleClickAulas}
        >
          Mapa de aulas
        </Button>
        <Button
          sx={{ bgcolor: "#ccc", color: "#1c3f73", width: "100%" }}
          onClick={handleClickPensun}
        >
          Consulta de pensum
        </Button>
      </ButtonGroup>

      <div style={{ padding: "1em" }}>
        {showAulas && <Aula />}
        {showPensum && <Pensum />}
      </div>
    </div>
  );
}
