import React, { Suspense } from 'react';
import Home from 'containers/Home';
import Post from 'containers/Post';
import NewPost from 'containers/NewPost';
import NotFound from 'components/404';
import { Route, Switch } from 'react-router-dom';
import Layout from 'containers/Layout';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const App = () => (
  <Suspense fallback={() => (
    <SkeletonTheme color="#222" highlightColor="#333">
      <Layout>
        <div style={{ height: 64, backgroundColor: 'rgba(0, 77, 64, 1)' }} />
        <Skeleton width="100%" height="100vh" duration={1} />
      </Layout>
    </SkeletonTheme>
  )}
  >
    <SkeletonTheme color="#222" highlightColor="#333">
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Post} />
          <Route exact path="/admin/new-post" component={NewPost} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </SkeletonTheme>
  </Suspense>
);

export default App;
