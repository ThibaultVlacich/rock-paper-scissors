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
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react'),
);
