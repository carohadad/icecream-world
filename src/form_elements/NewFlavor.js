import React from 'react';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { CirclePicker } from 'react-color';
import databaseRef from './../database.js'


class NewFlavor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: {},
      name: props.defaultName,
      errorName: "",
      disabled: true
    };
    this.firebaseFlavours = databaseRef.ref("flavors");
  }

  componentWillReceiveProps(nextProps) {
    // even if it's binded in the defaultValue on the textField, this, this don't get updated
    this.setState({name: nextProps.defaultName});
  }

  checkDisabled(name, color) {
    return (color === "" || name === "");
  }

  handleClose(){
    if (this.state.color.hex !== "" && this.state.name !== "") {
      this.props.flavorAddedHandler(this.state.name, this.state.color.hex);
    }
    this.setState({colorHex: '', color: {}, name: '', errorName: ''});
    this.props.close();
  };

  setColor(color, event){
    this.setState({
      colorHex: color.hex,
      color: color,
      disabled: this.checkDisabled(this.state.name, color.hex)
    });
  }

  setName(event) {
    const name = event.target.value;
    const errorText = (name === "") ? "Name is required" : "";
    this.setState({
      name: name,
      errorName: errorText,
      disabled: this.checkDisabled(name, this.state.color.hex)});
  }

  render() {
    const actions = [
      <FlatButton
        label="Save!"
        primary={true}
        onTouchTap={() => this.handleClose()}
        disabled={this.state.disabled}
      />,
    ];

    return(
      <div>
        <Dialog
          title="Ice Cream Flavor Factory"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={() => this.handleClose()}
        >
          Nobody liked this flavor yet. Add it so others can like it ;)
          <br/>
          <TextField
            floatingLabelText="Flavor Name"
            onChange={(event) => this.setName(event)}
            errorText={this.state.errorName}
            value={this.state.name}
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
