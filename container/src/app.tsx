import React, {Suspense, lazy, useEffect}  from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { updateUser, useGlobalState } from './global-state/store';

const MarketingApp = lazy(() => import( /* webpackChunkName: "marketing" */ './components/marketing-app'));
const OrderApp = lazy(() => import( /* webpackChunkName: "order" */ './components/order-app'));

import Header from './components/header';
import Loader from './components/loader';
import Home from './components/Home';

// to avoid name collision in production, we would prefix class names generated
const generateClassName = createGenerateClassName({
  productionPrefix: 'hst'
});

const App = () => {
  const { user } = useGlobalState();
  console.log('eweewewewe');

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
                  <Route exact path='/' component={Home} />
                  <Route path='/mfe-order' component={OrderApp} />
                  <Route path='/mfe-marketing' component={MarketingApp} />
                </Switch>
              </Suspense> 
          </div>
        </StylesProvider>
      </BrowserRouter>
    );
};

export default App;