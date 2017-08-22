import React from 'react';
import databaseRef from './database.js'

class DataPrev extends React.Component {
  constructor() {
    super();
    this.state = {
      votes: 0
    }
  }

  componentWillMount() {
    this.firebaseVotesRef = databaseRef.ref("votes");
    this.firebaseVotesRef.on("child_added", (childData) => {
      var votes = this.state.votes;
      this.setState({
        votes: votes+1
      });
    }).bind(this);
  }

  componentWillUnmount() {
    this.firebaseVotesRef.off();
  }

  render() {
    return(
      <div>
        <h1>Ice Cream World</h1>

        <div>So far {this.state.votes} people voted. And counting! </div>
      </div>
    )

  }

}

export default DataPrev;
