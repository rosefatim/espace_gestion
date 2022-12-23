import React, { Component } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, Alert, Snackbar, Stack } from "@mui/material";
import { DisplayButton } from "../librairy/button";
import { Delete } from "@mui/icons-material";

export class Test extends Component {
  state = {
    checked: false,
  };

  closeAlert = () => {
    return this.setState({
      checked: false,
    });
  };

  // handleChange = (event) => {
  //   return this.setState({
  //     checked: event.target,  
  //   });
  // };

  handleChecked = (event) => {
    return this.setState({
      checked: event.target,
    });
  };
  
  deleteElement = () => {
    const { data, toDelete } = this.state;
    const newData = data.filter((item) => {
      return toDelete.includes(item.id) === false;
    });
    this.setState({
      data: newData,
      toDelete: [],
    });
    return this.props.manageData(newData);
  };
  render() {
    const { checked } = this.state;
    return (
      <div>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={checked} onChange={this.handleChecked} />
            }
          />
        </FormGroup>

        {/* checkBox alert */}
        <Snackbar
          open={checked}
          onClose={() => this.closeAlert()}
        >
          <Alert
            onClose={() => {
              this.closeAlert();
            }}
            severity="warning"
          >
            voulez vous supprimer ?
            <Stack direction="row" style={{ marginTop: "10%" }}>
             
              <DisplayButton
                type="contained"
                text="Delete"
                color="error"
                startIcon={<Delete />}
                style={{ height: 30 }}
                onPress={() => { 
                  this.deleteElement();
                } }
              />
            </Stack>
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default Test;
