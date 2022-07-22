import * as React from "react";
import Button from "@mui/material/Button";

const DisplayButton = (props) => {
  return (
    <Button
      variant={props.type}
      style={{
        ...props.style
      }}
      onClick={() => {
        // alert("clicked");
        props.onPress();
      }}
      disabled={props.disabled}
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
