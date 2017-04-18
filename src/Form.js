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
      errorText: ""
    };
  }

  handleUpdateInput(searchText) {
    let errorText = ((searchText == "") ? "Please enter your location." : "");
    this.setState({
      errorText: errorText
    });
  };

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
          onUpdateInput={(newText) => this.handleUpdateInput(newText)}
          errorText={this.state.errorText}
        />
    )
  }
}

class FlavorsSelector extends React.Component {

  constructor() {
    super();
    this.state = {
      dataSource : [],
      searchText: "",
      errorText: ""
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

  handleUpdateInput(searchText) {
    let errorText = ((searchText == "") ? "Please enter at least one flavor." : "");
    this.setState({
      searchText: searchText, errorText: errorText
    });
  };

  renderChips(flavors) {
    return flavors.map((elem) =>
      <Chip backgroundColor={elem.color} key={elem.key}>
        {elem.name}
      </Chip>
    )
  }

  flavorSelected(flavor) {
    this.setState({searchText: ""});
    this.props.flavorSelected(flavor);
  }

  render() {
    return (
        <div>
            {this.renderChips(this.props.flavors)}
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
              openOnFocus={true}
              errorText={this.state.errorText}
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

  flavorSelected(flavor) {
    this.state.flavors.push(flavor);
    this.setState({flavors: this.state.flavors});
  }

  submit() {
    if (this.state.selectedCountry && this.state.flavors.length > 0) {
      this.firebaseVotes.push({country: this.state.selectedCountry, flavors: this.state.flavors});
    }
  }


  render() {
    return(
      <div>
        <ConuntrySelector countrySelected={(countryName) => this.countrySelected(countryName)}/>
        <FlavorsSelector flavorSelected={(flavor) => this.flavorSelected(flavor)} flavors={this.state.flavors} />
        <RaisedButton label="Vote!" primary={true} onClick={()=> this.submit()}/>
      </div>
    )
  }

}

export default Form;
