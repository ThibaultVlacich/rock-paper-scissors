import React from 'react';
import axios from 'axios';

import 'Styles/home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      played: false,
      playerChoice: null,
      serverChoice: null,
    };
  }

  chooseOption(option) {
    this.setState({
      playerChoice: option,
    });
  }

  play() {
    if (!this.state.playerChoice) {
      alert('Error: You must choose an option before playing!');
      return;
    }

    axios.post('/api/games', { playerChoice: this.state.playerChoice.toUpperCase() })
      .then(response => {
        this.setState({
          played: true,
          serverChoice: response.data.serverChoice.toLowerCase(),
        });
      })
      .catch(error => {
        this.setState({
          played: false,
          serverChoice: null,
        });

        alert('Error: An error happened while trying to play with the server. Please try again.');
        console.log(error);
      })
  }

  evaluateResult() {
    if (this.state.playerChoice === this.state.serverChoice) {
      return 'tie';
    } else if (this.state.serverChoice === 'rock') {
      if (this.state.playerChoice === 'paper') {
        // Paper wins over rock
        return 'won';
      } else {
        // Scissors lose over rock
        return 'lost';
      }
    } else if (this.state.serverChoice === 'paper') {
      if (this.state.playerChoice === 'rock') {
        // Rock loses over paper
        return 'lost';
      } else {
        // Scissors win over paper
        return 'won';
      }
    } else if (this.state.serverChoice === 'scissors') {
      if (this.state.playerChoice === 'rock') {
        // Rock wins over scissors
        return 'won';
      } else {
        // Paper loses over scissors
        return 'lost';
      }
    }
  }

  renderOption(option) {
    return (
      <div className="col-md-4">
        <button className={`btn ${this.state.playerChoice === option ? 'btn-primary' : 'btn-light'} btn-option`} onClick={() => this.chooseOption(option)}>
          <i className={`fa fa-hand-${option}-o`} />
          <span>{option}</span>
        </button>
      </div>
    );
  }

  renderResult() {
    const result = this.evaluateResult();

    let descriptiveResult, state;

    if (result === 'tie') {
      descriptiveResult = 'It\'s a tie !';
      state = 'warning';
    } else if (result === 'won') {
      descriptiveResult = 'You won!';
      state = 'success';
    } else {
      descriptiveResult = 'You lost!';
      state = 'danger';
    }

    return (
      <div className={`result text-center ${this.state.played ? '' : 'd-none'}`}>
        <hr className="my-4" />
        <h2 className={`text-${state}`}>{descriptiveResult}</h2>
        <p className="lead mt-4">The server chose {this.state.serverChoice}</p>
      </div>
    );
  }

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Rock, Paper, Scissors</h1>
        <hr className="my-4" />
        <p className="lead">
          This website allows you to play Rock, Paper, Scissors against a server.
          <br/><br/>
          Please, choose an option:
        </p>
        <div className="container my-5">
          <div className="row">
            {this.renderOption('rock')}
            {this.renderOption('paper')}
            {this.renderOption('scissors')}
          </div>
        </div>
        <div className="text-center mt-5">
          <button className="btn btn-primary btn-lg" onClick={() => this.play()}>Play!</button>
        </div>
        {this.renderResult()}
      </div>
    );
  }
}

export default Home;
