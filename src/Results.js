import React from 'react';
import databaseRef from './database.js'
import Chip from 'material-ui/Chip';
import {Card, CardHeader, CardText} from 'material-ui/Card';


class Results extends React.Component {

  constructor() {
    super();
    this.state = {
      last_votes: [],
    }
  }

  componentWillMount() {
    databaseRef.ref("votes").limitToLast(3).on("child_added", (snapshot) => {
      var lasts = this.state.last_votes;
      lasts.push(snapshot.val());
      this.setState({
        last_votes: lasts
      });
    })
  }

  renderChips(flavors) {
    return flavors.map((elem) =>
      <Chip
        backgroundColor={elem.color}
        key={elem.key}
      >
        {elem.name}
      </Chip>
    )
  }

  renderLastVotes(votes) {
    return votes.map((vote) =>
      <CardText expandable={true} style={{display: 'flex', flexWrap: 'wrap'}}>
        <label>{vote.country}</label>
        {this.renderChips(vote.flavors)}
      </CardText>
    )
  }


  render() {
    return(
      <Card>
        <CardHeader
        title="Last Votes"
        actAsExpander={true}
        showExpandableButton={true}
        />
        {this.renderLastVotes(this.state.last_votes)}
      </Card>
    )
  }


}

export default Results;
