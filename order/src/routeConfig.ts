import Order from './components/Order';
import Checkout from './components/checkout';

const initialRoute = '/mfe-order';
export default () => [
    {
      path: `${initialRoute}/checkout`,
      component: Checkout,
    },
    {
      path: `${initialRoute}`,
      component: Order,
      // exact: true
    }
  ];