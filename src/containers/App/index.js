import React, { Suspense } from 'react';
import Post from 'containers/Post';
import { Route, Switch } from 'react-router-dom';
import Layout from 'containers/Layout';

const App = () => (
  <Suspense fallback="L O A D I N G . . .">
    <Layout>
      <Switch>
        <Route exact path="/" component={Post} />
      </Switch>
    </Layout>
  </Suspense>
);

export default App;
