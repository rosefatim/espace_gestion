import React from 'react'
import { Box,AppBar, Stack, Toolbar, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { sessionHandler } from '../functions/sessionStore';
import { DisplayLink } from '../librairy/buttonLink';

const navbar = (props) => {
  return (
    <div><Box sx={{ flexGrow: 1 }}>
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
            text="Contact Us"
          />
          <DisplayLink
            to="/"
            style={{ textDecoration: "none", color: "white" }}
            disabled={false}
            text={props.text}
            onPress={async () => {
              await this.props.deleteData();
              return sessionHandler("auth_token", null, "remove");
            }}
            textStyle={{ textDecoration: "none" }}
            startIcon={<AccountCircle />}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  </Box></div>
  )
}

export default navbar