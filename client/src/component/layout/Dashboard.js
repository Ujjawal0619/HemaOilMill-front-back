import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CenteredGrid from '../recordPannel/CenteredGrid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DrawerItems from './DrawerItems';
import AuthContext from '../../context/auth/authContext';
import InputContext from '../../context/input/inputContext';

import * as BsIcons from 'react-icons/bs';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  heading: {
    fontSize: '1rem',
    display: 'inline-block',
    marginLeft: '2rem',
    borderRadius: '5px',
    padding: '5px 50px',
    backgroundColor: '#fff',
    color: '#3f51b5',
    fontWeight: '1000',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    textTransform: 'capitalize',
  },
  // necessary for content to be below app bar
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    marginTop: '3.5rem',
    padding: '24px',
    overflow: 'hidden',
    width: '100vw',
  },
}));

function Dashboard(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const authContext = useContext(AuthContext);
  const inputContext = useContext(InputContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Side Bar

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const fullHeader = useMediaQuery('(min-width:600px)')
    ? { zIndex: '1300', width: '100vw' }
    : {};

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar} style={fullHeader}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h4' noWrap style={{ margin: '0 auto' }}>
            <BsIcons.BsDropletHalf style={{ marginRight: '1rem' }} />
            <strong> HEMA OIL MILL</strong>
            <h6 className={classes.heading}>{inputContext.type}</h6>
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <DrawerItems />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            <DrawerItems />
          </Drawer>
        </Hidden>
      </nav>

      {/* input & record list */}
      <main className={classes.content}>
        <CenteredGrid />
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
