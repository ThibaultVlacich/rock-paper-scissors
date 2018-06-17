import React from 'react';

import 'Styles/home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  renderOption(option) {
    return (
      <div className="col-md-4">
        <button className={`btn ${this.state.playerChoice === option ? "btn-primary" : "btn-light"} btn-option`} onClick={() => this.chooseOption(option)}>
          <i className={`fa fa-hand-${option}-o`} />
          <span>{option}</span>
        </button>
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
      </div>
    );
  }
}

export default Home;
