import Landing from './components/landing';
import Pricing from './components/pricing';

const initialRoute = '/mfe-marketing';
export default () => [
    {
      path: `${initialRoute}/pricing`,
      component: Pricing,
      exact: true
    //   routes: [
    //     {
    //       path: "/tacos/bus",
    //       component: Bus
    //     },
    //     {
    //       path: "/tacos/cart",
    //       component: Cart
    //     }
    //   ]
    },
    {
      path: `${initialRoute}`,
      component: Landing,
      exact: true
    }
  ];