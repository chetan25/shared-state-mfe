import React, {useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MaterialLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import globalStoreInstance from '../global-state/store';
import { useSnapshot } from 'valtio';
import { updateUser, subscribeToGlobalState} from 'global-state';

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

const Home = () => {
  const {user} = useSnapshot(globalStoreInstance);
  const [globalUser, setGlobalUser] = useState<{
    name: string;
    id: string;
  } | null>(null);

  useEffect(() => {
    const unSub = subscribeToGlobalState(state => {
      console.log('global State in Container', state);
      const currentUser = state ? state.user : null;
      setGlobalUser(currentUser);
    });

    return () => {
      unSub();
    }
  }, []);

  const classes = useStyles();

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
              Container App
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
              State from Global Lib - User --- {globalUser ? globalUser.name : ''}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              This is a dummy site.This is a Micro FE App, consiting of 3 micro front ends, the Conatiner App, Marketing App and Order App.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={6} justify="center">
                <Grid item>
                  <Link to="/mfe-marketing">
                    <Button variant="contained" color="primary">
                      Marketing-Mfe
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/mfe-order">
                      <Button variant="contained" color="primary">
                        Order-Mfe
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

export default Home;