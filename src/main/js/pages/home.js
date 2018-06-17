import React from 'react';
import axios from 'axios';

import 'Styles/home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      played: false,
      gameId: null,
      playerChoice: null,
      serverChoice: null,
      result: null,
    };
  }

  resetGame() {
    this.setState({
      played: false,
      gameId: null,
      playerChoice: null,
      serverChoice: null,
      result: null,
    });
  }

  chooseOption(option) {
    this.resetGame();

    this.setState({
      playerChoice: option,
    });
  }

  play() {
    if (!this.state.playerChoice) {
      alert('Error: You must choose an option before playing!');
      return;
    }

    axios.put('/api/games')
      .then(response => axios.put(`/api/games/${response.data.id}`, { playerChoice: this.state.playerChoice.toUpperCase() }))
      .then(response => {
        this.setState({
          played: true,
          serverChoice: response.data.serverChoice.toLowerCase(),
          result: response.data.result.toLowerCase(),
        });
      })
      .catch(error => {
        this.resetGame();

        alert('Error: An error happened while trying to play with the server. Please try again.');
        console.log(error);
      })
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
    let descriptiveResult, state;

    if (this.state.result === 'draw') {
      descriptiveResult = 'It\'s a tie !';
      state = 'warning';
    } else if (this.state.result === 'win') {
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
