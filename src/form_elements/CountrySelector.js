import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

class CountrySelector extends React.Component {

  constructor() {
    super();
    let countries = require('country-list')();
    this.state = {
      dataSource: countries.getNames(),
      errorText: ""
    };
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
