import React, { Suspense, useContext } from 'react';
import Home from 'containers/Home';
import Post from 'containers/Post';
import NewPost from 'containers/NewPost';
import NotFound from 'components/404';
import Logout from 'components/logout';
import { Route, Switch } from 'react-router-dom';
import Layout from 'containers/Layout';
import { SkeletonTheme } from 'react-loading-skeleton';

import Fallback from 'components/UI/skeletons/fallback';
import Auth from 'containers/Auth';
import { AuthContext } from 'context/auth-context';

const App = () => {
  const authContext = useContext(AuthContext);
  const { isAuth } = authContext;
  
  return (
    <SkeletonTheme color="#444" highlightColor="#666">
      <Suspense fallback={(
        <Fallback />
      )}
      >
        <Layout>
          {isAuth ? (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/posts" component={Post} />
              <Route exact path="/admin/new-post" component={NewPost} />
              <Route exact path="/logout" component={Logout} />
              <Route component={NotFound} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/posts" component={Post} />
              <Route exact path="/login" component={Auth} />
              <Route component={NotFound} />
            </Switch>
          )}
        </Layout>
      </Suspense>
    </SkeletonTheme>
  )
};

export default App;
