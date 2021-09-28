import React, { useEffect, useMemo, useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MaterialLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import { subscribeToGlobalState, getAppRoutes } from 'container/GlobalState';
import { updateUser, subscribeToGlobalState as subGlobalState} from 'global-state';

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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album() {
  const [user, setUser] = useState<{name: string} | undefined>();
  const [globalUser, setGlobalUser] = useState<{
    name: string;
    id: string;
  } | null>(null);

  
  const classes = useStyles();

  const routePath = useMemo(() => {
      const allRoutes = getAppRoutes();
      const order = allRoutes.filter((rt: {app: string, routes: any }) => rt.app == 'order');
      if (order) {
        //@ts-ignore
        return order[0].routes.checkout;
      }
      return '/mfe-marketing/pricing' 
  }, []);

  useEffect(() => {
    const unSub = subGlobalState((state) => {
      console.log('Global lib state Marketing', state);
      const currentUser = state ? state.user : null;
      setGlobalUser(currentUser);
    });

    return () => { unSub() };
  }, []);

  useEffect(() => {
    const unSub = subscribeToGlobalState((state: {user: {name: string}}) => {
      console.log('marketing', state);
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
              Marketing App 
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              State at Runtime from Container - User --- {user ? user.name : ''}
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              State from Global lib - User --- {globalUser ? globalUser.name : ''}
              <Button
                 variant="contained"
                 color="primary"
                 onClick={
                   () => {
                    updateUser({
                      name: 'Shaktiman',
                      id: '11111'
                    })
                   }
                 }
              >
                      Update Global State
              </Button>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link to="/mfe-marketing/pricing">
                    <Button variant="contained" color="primary">
                      Pricing
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={routePath}>
                    <Button variant="contained" color="primary">
                      Checkout(mfe)
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
