import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import databaseRef from './../database.js'

class CountrySelector extends React.Component {

  constructor() {
    super();
    this.state = {
      dataSource: [],
      errorText: ""
    };
  }

  componentWillMount() {
    databaseRef.ref('countries').once('value').then((snapshot) => {
      this.state = {
        dataSource: snapshot.val(),
        errorText: ""
      };
    });
  }

  handleUpdateInput(searchText) {
    let errorText = ((searchText === "") ? "Please enter your location." : "");
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
          filter={AutoComplete.fuzzyFilter}
          maxSearchResults={5}
          onNewRequest={(countryName) => this.props.countrySelected(countryName)}
          onUpdateInput={(newText) => this.handleUpdateInput(newText)}
          errorText={this.state.errorText}
        />
    )
  }
}

export default CountrySelector;
