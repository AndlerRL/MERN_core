import React, { Suspense } from 'react';
import Home from 'containers/Home';
import Post from 'containers/Post';
import NewPost from 'containers/NewPost';
import NotFound from 'components/404';
import { Route, Switch } from 'react-router-dom';
import Layout from 'containers/Layout';

const App = () => (
  <Suspense fallback="L O A D I N G . . .">
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts" component={Post} />
        <Route exact path="/admin/new-post" component={NewPost} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </Suspense>
);

export default App;
