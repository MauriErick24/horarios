import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import pensumList from "../components/data/pensumData";

const Pensum = () => {
  const [selectedPensum, setSelectedPensum] = React.useState(null);

  const handlePensum = (event, value) => {
    console.log(value);
    const found = pensumList.find((element) => element.carrera === value);
    setSelectedPensum(found || null);
  };

  return (
    <div>
      <h1>Pensum</h1>
      <Autocomplete
        disablePortal
        options={pensumList.map((element) => element.carrera)}
        onChange={handlePensum}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Buscar por carrera" />
        )}
      />
      {selectedPensum && (
        <img
          src={selectedPensum.image}
          alt={selectedPensum.carrera}
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
};

export default Pensum;
