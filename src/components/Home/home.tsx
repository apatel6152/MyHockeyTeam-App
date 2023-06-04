import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import "./home.css";
import PlayerList from "../PlayersList/playersList";

const home: React.FC = () => {
  return (
    <div>
        <div className="hero">
        <Container maxWidth="md">
          <div className="herotext">
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to our Hockey Team!
            </Typography>
            <Typography variant="subtitle1" component="p">
              Join us as we strive for victory on the ice.
            </Typography>
          </div>
        </Container>
      </div>
      <Container
        maxWidth="md"
        sx={{ fontWeight: "bold", marginTop: "2rem", marginBottom: "2rem" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={14}>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", textDecoration: 'underline' }}
              gutterBottom
            >
              Players List
            </Typography>
            <PlayerList />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default home