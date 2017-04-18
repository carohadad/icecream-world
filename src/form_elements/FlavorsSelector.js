import React from 'react';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';
//TODO: Remove this DB reference and move to parent
import databaseRef from './../database.js'

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
      let flavors = []
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
    let errorText = ((searchText === "" && this.props.flavors.length === 0) ? "Please enter at least one flavor." : "");
    this.setState({
      searchText: searchText, errorText: errorText
    });
  };

  renderChips(flavors) {
    return flavors.map((elem) =>
      <Chip
        backgroundColor={elem.color}
        key={elem.key}
        onRequestDelete={() => this.props.handleFlavorDelete(elem.key)}
      >
        {elem.name}
      </Chip>
    )
  }

  flavorSelected(flavor) {
    this.setState({searchText: ""});
    if (!this.props.flavors.includes(flavor)) {
      this.props.flavorSelected(flavor);
    }
  }

  render() {
    return (
        <div>
          <div className="chips">
            {this.renderChips(this.props.flavors)}
          </div>
          <AutoComplete
            hintText="Add your favourite Ice Cream :-)"
            dataSource={this.state.dataSource}
            dataSourceConfig={this.dataSourceConfig()}
            floatingLabelText="Add your favourite Ice Cream :-)"
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

export default FlavorsSelector;

