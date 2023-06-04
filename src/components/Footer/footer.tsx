import React from "react";
import { Typography } from "@mui/material";
import "./footer.css";

const footer: React.FC = () => {
  return (
    <div>
      <footer className="footer">
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          &copy; {new Date().getFullYear()} Hockey Team. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
};

export default footer;
