import React from 'react';
import Post from 'containers/Post';
import { Route, Switch } from 'react-router-dom';

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1>
        Header section
      </h1>
    </header>
    <Switch>
      <Route exact path="/" component={Post} />
    </Switch>
  </div>
);

export default App;
