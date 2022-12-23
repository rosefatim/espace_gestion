import React, { Component } from "react";
import { Box, AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { sessionHandler } from "../functions/sessionStore";
import { DisplayLink } from "../librairy/buttonLink";

export class Home extends Component {
  render() {
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            style={{ paddingLeft: 25, paddingRight: 25 }}
          >
            <Toolbar>
              <Typography component="div" sx={{ flexGrow: 1 }}>
                LOGO
              </Typography>
              <Stack direction="row " justifyContent="space-evently">
                <DisplayLink
                  to="error"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: 5,
                  }}
                  disabled={false}
                  text="Contactez-nous"
                />
                <DisplayLink
                  to="login"
                  style={{ textDecoration: "none", color: "white" }}
                  disabled={false}
                  text="Se connecter"
                  textStyle={{ textDecoration: "none" }}
                  startIcon={<AccountCircle />}
                />
                
              </Stack>
            </Toolbar>
          </AppBar>
        </Box>
        {/* main */}

        <Typography
          variant="h3"
          style={{ textAlign: "center", marginTop: "5%" }}
        >
          Bienvenu sur MyTodoList
        </Typography>
        <div style={{marginLeft:"10%"}}>
          <Typography
            variant="h4"
            style={{ marginTop: "5%", marginBottom: "2%" }}
          >
            Qui sommes nous?
          </Typography>
          <Typography variant="subtitle1">
            MyTodoList est une appication qui vous permettra de gerer votre
            liste de todos en un clique.
          </Typography>
          <Typography variant="subtitle1">
            Cliquez ici pour vous inscrire
          </Typography>
          <DisplayLink
            to="/register"
            style={{
              textDecoration: "none",
              backgroundColor: "#1E90FF",
              color: "white",
            }}
            disabled={false}
            text="S'inscrire"
            onPress={{}}
            textStyle={{ textDecoration: "none" }}
          />
          <Typography variant="subtitle1"></Typography>
        </div>
      </div>
    );
  }
}

export default Home;
