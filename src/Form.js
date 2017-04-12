import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import databaseRef from './database.js'

import './Form.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();




class ConuntrySelector extends React.Component {

  constructor() {
    super();
    var countries = require('country-list')();
    this.state = {
      dataSource: countries.getNames(),
    };
  }

  render() {
    return(
        <AutoComplete
          hintText="Type your country name"
          dataSource={this.state.dataSource}
          floatingLabelText="Where are you from?"
          fullWidth={true}
          filter={AutoComplete.fuzzyFilter}
          maxSearchResults={5}
          onNewRequest={(countryName) => this.props.countrySelected(countryName)}
        />
    )
  }
}

class Form extends React.Component {
  constructor() {
      super();
      this.state = {
        selectedCountry: null,
      };
    }

  countrySelected(countryName) {
    databaseRef.ref("votes").push({country: countryName});
  }


  render() {
    return(
      <div>
        <ConuntrySelector countrySelected={(countryName) => this.countrySelected(countryName)}/>
      </div>
    )
  }

}

export default Form;
