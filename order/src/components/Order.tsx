import React, { useEffect, useState, useMemo} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MaterialLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import { subscribeToGlobalState, getAppRoutes } from 'container/GlobalState';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MaterialLink component={Link} to="/" color="inherit">
        Your Website
      </MaterialLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    a: {
      textDecoration: 'none',
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


export default function Album() {
  const [user, setUser] = useState<{name: string} | undefined>();

  const classes = useStyles();

  const routePath = useMemo(() => {
    const allRoutes = getAppRoutes();
    const marketing = allRoutes.filter((rt: {app: string, routes: any }) => rt.app == 'marketing');
    if (marketing) {
      //@ts-ignore
      return marketing[0].routes.pricing;
    }
    return '/mfe-marketing/pricing' 
  }, []);
 
  useEffect(() => {
    const unSub = subscribeToGlobalState((state: {user: {name: string}}) => {
      console.log('order', state);
      const currentUser = state ? state.user : undefined;
      setUser(currentUser);
    });

    return () => { unSub() };
  }, []);

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Order Mfe 
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              State at runitime from Container User --- {user ? user.name : ''}
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link to="/mfe-order/checkout">
                    <Button variant="contained" color="primary">
                      Checkout
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={routePath}>
                    <Button variant="contained" color="primary">
                      Pricing
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main> 
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Built with React + Webapck Module Federation Plugin
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
