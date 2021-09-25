import React, { useEffect } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { MemoryHistory } from 'history';
import { subscribeToGlobalState } from 'container/GlobalState';

// import Landing from './components/landing';
// import Pricing from './components/pricing';
import getRoutes from './routeConfig';

// to avoid name collision in production, we would prefix class names generated
const generateClassName = createGenerateClassName({
  productionPrefix: 'mrk'
});

interface OrderAppProps {
  history: MemoryHistory;
}

const OrderApp = ({history}: OrderAppProps) => {
  useEffect(() => {
    const unSub = subscribeToGlobalState((state: Object) => {
      console.log('order', state)
    });

    return () => { unSub() };
  }, []);
  
  return (
    <div>
       <StylesProvider generateClassName={generateClassName}>
           <Router history={history}>
              <Switch>
                {
                  getRoutes().map((route) => {
                    return (
                      <Route
                          key={route.path}
                          path={route.path}
                          // exact={route.exact}
                        >
                          <route.component />
                        </Route>
                    )
                  })
                }
                  {/* <Route exact path='/pricing' component={Pricing} /> */}
                  {/* <Route exact path='/' component={Landing} /> */}
              </Switch>
           </Router>
       </StylesProvider>
    </div>
  );
};

export default OrderApp;