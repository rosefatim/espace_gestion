import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";

const OpenAlert = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  
  const closeAlert = () => {
    return this.setState({
        open: false
    });
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeAlert}
        message="remplissez les champs"
      />
    </div>
  );
};

export default OpenAlert;
