import React from 'react';
import databaseRef from './database.js'
import Chip from 'material-ui/Chip';
import {Card, CardHeader, CardText} from 'material-ui/Card';


class Results extends React.Component {

  constructor() {
    super();
    this.state = {
      lastVotes: [],
      selectedCountry: 'Argentina',
      flavorsForCountry: {}

    }
    this.flavorsForCountry = {}
  }

  componentWillMount() {
    databaseRef.ref("votes").limitToLast(3).on("child_added", (snapshot) => {
      var lasts = this.state.lastVotes;
      lasts.push(snapshot.val());
      this.setState({
        last_votes: lasts
      });
    });

    databaseRef.ref("votes")
      .orderByChild('country')
      .equalTo('Argentina').on("child_added", (snapshot) => {
        this.addFlavors(snapshot.val().flavors)
    });
  }

  addFlavors(flavors) {
    flavors.forEach((flavor, index) => {
      if (this.flavorsForCountry[flavor.name] == null) {
        this.flavorsForCountry[flavor.name] = {name: flavor.name, votes: 1, color: flavor.color};
      }
      else {
        this.flavorsForCountry[flavor.name]['votes'] +=1;
      }
    });

    this.setState({flavorsForCountry: this.flavorsForCountry});
  }

  renderChip(elem) {
    return <Chip
        backgroundColor={elem.color}
        key={elem.key}
      >
        {elem.name}
      </Chip>
  }

  renderChips(flavors) {
    return flavors.map((elem) =>
      this.renderChip(elem)
    );
  }

  renderLastVotes(votes) {
    return votes.map((vote) =>
      <CardText expandable={true} style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
        <label>{vote.country}: </label>
        {this.renderChips(vote.flavors)}
      </CardText>
    )
  }

  renderVotesForCountry(data) {
    return Object.keys(data).sort((e) => data[e].votes).map((flavor) =>
      <CardText expandable={true} style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
        {this.renderChip(data[flavor])}
        <label> {data[flavor].votes} votes</label>
      </CardText>
    )
  }


  render() {
    return(
      <div id='results'>
        <Card>
          <CardHeader
          title="Last Votes"
          actAsExpander={true}
          showExpandableButton={true}
          />
          {this.renderLastVotes(this.state.lastVotes)}
        </Card>
        <Card>
          <CardHeader
          title={"Favourite flavors in " + this.state.selectedCountry}
          actAsExpander={true}
          showExpandableButton={true}
          />
          {this.renderVotesForCountry(this.state.flavorsForCountry)}

        </Card>
      </div>
    )
  }


}

export default Results;
