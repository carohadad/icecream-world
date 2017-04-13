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

class FlavoursSelector extends React.Component {

  constructor() {
    super();
    this.state = {
      dataSource : []
    }
  }

  componentWillMount() {
    this.firebaseFlavoursRef = databaseRef.ref("flavours");
    this.firebaseFlavoursRef.once('value').then((snapshot) => {
      var flavours = []
      snapshot.forEach((elem) => {
        flavours.push(elem.val())
      })
      this.setState({
        dataSource: flavours
      });
    });
  }

  componentWillUnmount() {
    this.firebaseFlavoursRef.off();
  }

  dataSourceConfig() {
    return { text: 'name', value: 'name'}
  }

  render() {
    return (
       <AutoComplete
          hintText="Select your favourite Ice Cream flavours"
          dataSource={this.state.dataSource}
          dataSourceConfig={this.dataSourceConfig()}
          floatingLabelText="Select your favourite Ice Cream flavours"
          fullWidth={true}
          filter={AutoComplete.fuzzyFilter}
          maxSearchResults={5}
        />
    )
  }
}

class Form extends React.Component {
  constructor() {
      super();
      this.state = {
        selectedCountry: null,
        flavours:[]
      };
      this.firebaseVotes = databaseRef.ref("votes");

    }

  countrySelected(countryName) {
    this.setState({
      selectedCountry: countryName
    })
  }

  flavoursSelected() {

  }

  submit() {
    if (this.state.selectedCountry) {
      this.firebaseVotes.push({country: this.state.selectedCountry, flavours: this.state.flavours});
    }
  }


  render() {
    return(
      <div>
        <ConuntrySelector countrySelected={(countryName) => this.countrySelected(countryName)}/>
        <FlavoursSelector flavoursSelected={(flavoursArray) => this.flavoursSelected(flavoursArray)} />
        <RaisedButton label="Vote!" primary={true} onClick={()=> this.submit()}/>
      </div>
    )
  }

}

export default Form;
