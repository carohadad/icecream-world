import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

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

class FlavorsSelector extends React.Component {

  constructor() {
    super();
    this.state = {
      dataSource : [],
      selectedFlavors: [],
      searchText: ""
    }
  }

  componentWillMount() {
    databaseRef.ref("flavours").once('value').then((flavorSnapshot) => {
      var flavors = []
      flavorSnapshot.forEach((elem) => {
        flavors.push({name: elem.val().name, color: elem.val().color, key: elem.getKey()});
      })
      this.setState({
        dataSource: flavors
      });
    });
  }

  componentWillUnmount() {
    this.firebaseflavorsRef.off();
  }

  dataSourceConfig() {
    return { text: 'name', value: 'name'}
  }

  flavorSelected(flavor) {
    this.state.selectedFlavors.push(flavor);
    this.setState({selectedFlavors: this.state.selectedFlavors, searchText: ""});
  }

  handleUpdateInput(searchText) {
    this.setState({
        searchText: searchText,
      });
    };

  renderChips(flavors) {
    return flavors.map((elem) =>
      <Chip backgroundColor={elem.color} key={elem.key}>
        {elem.name}
      </Chip>
    )
  }

  render() {
    return (
        <div>
            {this.renderChips(this.state.selectedFlavors)}
            <AutoComplete
              hintText="Select your favourite Ice Cream flavors"
              dataSource={this.state.dataSource}
              dataSourceConfig={this.dataSourceConfig()}
              floatingLabelText="Select your favourite Ice Cream flavors"
              fullWidth={true}
              filter={AutoComplete.fuzzyFilter}
              maxSearchResults={5}
              onNewRequest={(flavor) => this.flavorSelected(flavor)}
              searchText={this.state.searchText}
              onUpdateInput={(newText) => this.handleUpdateInput(newText)}
             />
          </div>
    )
  }
}

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

  flavorsSelected() {

  }

  submit() {
    if (this.state.selectedCountry) {
      this.firebaseVotes.push({country: this.state.selectedCountry, flavors: this.state.flavors});
    }
  }


  render() {
    return(
      <div>
        <ConuntrySelector countrySelected={(countryName) => this.countrySelected(countryName)}/>
        <FlavorsSelector flavorsSelected={(flavorsArray) => this.flavorsSelected(flavorsArray)} />
        <RaisedButton label="Vote!" primary={true} onClick={()=> this.submit()}/>
      </div>
    )
  }

}

export default Form;
