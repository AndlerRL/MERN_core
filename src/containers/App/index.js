import React, { Suspense } from 'react';
import Home from 'containers/Home';
import Post from 'containers/Post';
import NewPost from 'containers/NewPost';
import NotFound from 'components/404';
import { Route, Switch } from 'react-router-dom';
import Layout from 'containers/Layout';
import { SkeletonTheme } from 'react-loading-skeleton';

import Fallback from 'components/UI/skeletons/fallback';
import Auth from 'containers/Auth';

const App = () => (
  <SkeletonTheme color="#444" highlightColor="#666">
    <Suspense fallback={(
      <Fallback />
    )}
    >
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Post} />
          <Route exact path="/login" component={Auth} />
          <Route exact path="/admin/new-post" component={NewPost} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Suspense>
  </SkeletonTheme>
);

export default App;
