import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { CirclePicker } from 'react-color';


class NewFlavor extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      colorHex: "",
      color: {},
      name: "",
      errorName: "",
    };
  }

  disabledForm() {
    return (this.state.colorHex === "" || this.state.name === "");
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose(){
    if (this.state.colorHex !== "" && this.state.name !== "") {
      this.props.flavorAddedHandler(this.state.name, this.state.colorHex);
    }
    this.setState({open: false, colorHex: '', color: {}, name: '', errorName: ''});
  };

  setColor(color, event){
    this.setState({colorHex: color.hex, color: color});
  }

  setName(event) {
    const name = event.target.value;
    const errorText = (name === "") ? "Name is required" : "";
    this.setState({name: name, errorName: errorText});
  }

  render() {
    const actions = [
      <FlatButton
        label="Save!"
        primary={true}
        onTouchTap={() => this.handleClose()}
        disabled={this.disabledForm()}
      />,
    ];

    return(

      <div>
        <RaisedButton label="Add Flavor" onTouchTap={() => this.handleOpen()} />
        <Dialog
          title="Ice Cream Flavor Factory"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={() => this.handleClose()}
        >
          Nobody liked this flavor yet. Add it so others can like it ;)
          <br/>
          <TextField
            floatingLabelText="Flavor Name"
            onChange={(event) => this.setName(event)}
            errorText={this.state.errorName}
          />
          <br/>
          Flavor Color:
          <CirclePicker
            colors={[
              '#E5CCB2','#A9EE9F', '#E9D0DD', '#EDC944', '#EEE933',
              '#664000', '#EB923B', '#EEEEEA', '#EE2D25', '#EEEEDE',
              '#A87B95', '#91D0D6']}
            color={this.state.color}
            onChangeComplete={(color, event) => this.setColor(color, event)}/>
        </Dialog>
      </div>
    )

  }
}

export default NewFlavor;
