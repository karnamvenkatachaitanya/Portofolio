import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "./supabase";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "./components/CardProject";
import TechStackIcon from "./components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "./components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 2 }}><Typography>{children}</Typography></Box>}
    </div>
  );
}
TabPanel.propTypes = { children: PropTypes.node, index: PropTypes.number.isRequired, value: PropTypes.number.isRequired };

function a11yProps(index) {
  return { id: `tab-${index}`, "aria-controls": `tabpanel-${index}` };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => { AOS.init({ once: false }); }, []);

  const fetchData = useCallback(async () => {
    const { data: projData } = await supabase.from("projects").select("*").order("id");
    const { data: certData } = await supabase.from("certificates").select("*").order("id");
    setProjects(projData || []);
    setCertificates(certData || []);
    console.log("Certificates:", certData);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const displayedCertificates = certificates;

  return (
    <Box sx={{ p: 3 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Tabs value={value} onChange={(e, v) => setValue(v)} variant="fullWidth">
          <Tab icon={<Code />} label="Projects" {...a11yProps(0)} />
          <Tab icon={<Award />} label="Certificates" {...a11yProps(1)} />
          <Tab icon={<Boxes />} label="Tech Stack" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={setValue}>
        <TabPanel value={value} index={0}><Typography>Projects here...</Typography></TabPanel>

        <TabPanel value={value} index={1}>
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayedCertificates.map((cert, i) => (
              <Certificate key={cert.id || i} ImgSertif={cert.Img} />
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={value} index={2}><Typography>Stack here...</Typography></TabPanel>
      </SwipeableViews>
    </Box>
  );
}
