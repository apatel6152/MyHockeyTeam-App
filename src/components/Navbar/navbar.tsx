import React from "react";
import { Typography, Toolbar, AppBar } from "@mui/material";
import './navbar.css';

const navbar: React.FC = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar className="appBar">
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            My Hockey Team
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default navbar;
