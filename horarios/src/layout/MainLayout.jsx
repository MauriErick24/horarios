import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import InfoAcadLayout from "../layout/InfoAcadLayout";

import HorariosLayout from "./HorariosLayout";
import { Ayuda } from "./Ayuda";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0.5, display: "flex", justifyContent: "center" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar position="static" sx={{ bgcolor: "#1c3f73" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignContent: "center",
            height: "40px",
          }}
        >
          <p className="exo-2-bold">CAPPUCHINO </p>{" "}
          <p className="exo-2-bold">Gestion II/2024</p>
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          sx={{ bgcolor: "#1c3f73" }}
        >
          <Tab label="Organización de horarios" {...a11yProps(0)} />
          <Tab label="Información academica" {...a11yProps(1)} />
          <Tab label="Ayuda" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel
        value={value}
        index={0}
        dir={theme.direction}
        className="exo-2-p"
      >
        <HorariosLayout />
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        dir={theme.direction}
        className="exo-2-p"
      >
        <InfoAcadLayout />
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
        dir={theme.direction}
        className="exo-2-p"
      >
        <Ayuda />
      </TabPanel>
    </Box>
  );
}
