import * as React from "react";
import Button from "@mui/material/Button";

const DisplayButton = (props) => {
  return (
    <Button
      variant={props.type}
      color={props.color}
      style={{
        ...props.style
      }}
      disabled={props.disabled}
      startIcon={props.startIcon}
      onClick={() => {
        // alert("clicked");
        props.onPress();
      }}
    >
      <p
        style={{
          ...props.textStyle
        }}
      >
        {props.text}
      </p>
    </Button>
  );
};

export { DisplayButton };
