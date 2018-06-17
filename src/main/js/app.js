import React from 'react';
import ReactDOM from 'react-dom';

// Styles
import 'Styles/app.scss';

// Pages
import Home from 'Pages/home';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Home />
        <footer className="text-center">
          Rock, Paper, Scissors - Made by <a href="https://thibault.vlacich.fr/" target="_blank">Thibault Vlacich</a>
        </footer>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react'),
);
