import React from 'react';
import databaseRef from './database.js'

class DataPrev extends React.Component {
  constructor() {
    super();
    this.state = {
      votes: []
    }
    this.votes = []
  }

  componentWillMount() {
    this.firebaseVotesRef = databaseRef.ref("votes");
    this.firebaseVotesRef.on("child_added", function(dataSnapshot) {
      this.votes.push(dataSnapshot.val());
      this.setState({
        votes: this.votes
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.firebaseVotesRef.off();
  }

  render() {
    return(
      <div>
        <h1>Ice Cream World</h1>
        <div>Because we all like icecream</div>
        <div>But does everyone like the same flavours?</div>
        <div>Is it there ANY world favourite?</div>

        <div>So far {this.state.votes.length} people voted. And counting! </div>
      </div>
    )

  }

}

export default DataPrev;
