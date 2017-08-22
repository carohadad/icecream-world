import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import CountrySelector from './form_elements/CountrySelector'
import FlavorsSelector from './form_elements/FlavorsSelector'
import Paper from 'material-ui/Paper';

import databaseRef from './database.js'

import './Form.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();



class Form extends React.Component {
  constructor() {
      super();
      this.state = {
        selectedCountry: null,
        flavors:[]
      };
      this.firebaseVotes = databaseRef.ref("votes");

    }

  countrySelected(countryName) {
    this.setState({
      selectedCountry: countryName
    })
  }

  handleflavorSelected(flavor) {
    this.state.flavors.push(flavor);
    this.setState({flavors: this.state.flavors});
  }

  handleFlavorDelete(key) {
    let flavors = this.state.flavors;
    const flavourToDelete = flavors.map((flavor) => flavor.key).indexOf(key);
    flavors.splice(flavourToDelete, 1);
    this.setState({flavors: flavors});
  }

  submit() {
    if (this.state.selectedCountry && this.state.flavors.length > 0) {
      this.firebaseVotes.push({country: this.state.selectedCountry, flavors: this.state.flavors});
    }
  }

  render() {
    return(
      <div>
        <Paper style={{'padding': '10px' }}>
          <h2> Vote: </h2>
          <CountrySelector countrySelected={(countryName) => this.countrySelected(countryName)}/>
          <FlavorsSelector
            flavorSelected={(flavor) => this.handleflavorSelected(flavor)}
            flavors={this.state.flavors}
            handleFlavorDelete={(key) => this.handleFlavorDelete(key)} />
          <br/>
          <RaisedButton label="Vote!" primary={true} onClick={()=> this.submit()}/>
        </Paper>
        <br/>
      </div>
    )
  }

}

export default Form;
