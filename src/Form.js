import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import * as firebase from 'firebase';
import './Form.css';

// Firebase config
const config = {
  apiKey: "AIzaSyCmkP2i7T_BuXYPIa3_kFkehOqo1yl5KVs",
  authDomain: "icecream-world.firebaseapp.com",
  databaseURL: "https://icecream-world.firebaseio.com",
  projectId: "icecream-world",
  storageBucket: "icecream-world.appspot.com",
  messagingSenderId: "789735052164"
};

const database = firebase
  .initializeApp(config)
  .database()
  .ref();


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
        selectedCountry: null
      };
    }

  countrySelected(countryName) {
    this.setState({selectedCountry: countryName})
  }


  addVote() {
    database.child('votes').push({country: this.state.selectedCountry});
  };


  render() {
    return(
      <div>
        <div> </div>
        <ConuntrySelector countrySelected={(countryName) => this.countrySelected(countryName)}/>
        <div className='selectedCountry'>Selected Conuntry is {this.state.selectedCountry}</div>
        <button onClick={this.addVote()}>
          Vote
        </button>


      </div>
    )
  }

}

export default Form;
