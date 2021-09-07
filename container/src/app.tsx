import React, {Suspense, lazy, useEffect}  from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { updateUser, useGlobalState } from './global-state/store';

const MarketingApp = lazy(() => import('./components/marketing-app'));
// const AuthApp = lazy(() => import('./components/auth-app'));

import Header from './components/header';
import Loader from './components/loader';

// to avoid name collision in production, we would prefix class names generated
const generateClassName = createGenerateClassName({
  productionPrefix: 'hst'
});

const App = () => {
  const { user } = useGlobalState();

  useEffect(() => {
    updateUser(
      {
        name: 'Rock',
        id: '121212'
      },
    );
    console.log('done');
  }, []);
    
    const onNameChange = () => {
      console.log({user});
      if (user && user.name === 'John') {
        updateUser(
          {
            name: 'Rock',
            id: '121212'
          },
        );
      } else {
        updateUser(
          {
            name: 'John',
            id: '22222'
          },
        );
      }
    }

    return (
      <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
          <div>
              <Header onNameChange={onNameChange} />
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route path='/auth'>
                    <h2>Test</h2>
                  </Route>
                  <Route path='/' component={MarketingApp} />
                </Switch>
              </Suspense> 
          </div>
        </StylesProvider>
      </BrowserRouter>
    );
};

export default App;