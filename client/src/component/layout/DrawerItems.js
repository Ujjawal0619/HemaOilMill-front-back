import React, { useContext, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AuthContext from '../../context/auth/authContext';
import InputContext from '../../context/input/inputContext';
import RecordContext from '../../context/record/recordContext';

import * as RiIcons from 'react-icons/ri';
import * as HiIcons from 'react-icons/hi';
import * as BsIcons from 'react-icons/bs';
import * as GiIcons from 'react-icons/gi';
import * as BiIcons from 'react-icons/bi';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

const DrawerItems = () => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const inputContext = useContext(InputContext);
  const recordContext = useContext(RecordContext);

  const { logout } = authContext;
  const { type, setType } = inputContext;
  const { getRecords, clearLoadInput, clearRecords } = recordContext;

  useEffect(() => {
    if (!type) {
      setType('mustard');
    }
  }, []);

  const handleSetType = (type) => {
    setType(type);
    clearAll();
  };

  const clearAll = () => {
    clearLoadInput();
    clearRecords();
  };

  // Side Bar Menue
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={() => handleSetType('mustard')}>
          <ListItemIcon>
            <GiIcons.GiGrain size='25px' />
          </ListItemIcon>
          <ListItemText primary='Mustard' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => handleSetType('oil')}>
          <ListItemIcon>
            <BsIcons.BsDropletHalf size='25px' />
          </ListItemIcon>
          <ListItemText primary='Oil' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => handleSetType('containers')}>
          <ListItemIcon>
            <BiIcons.BiCylinder size='25px' />
          </ListItemIcon>
          <ListItemText primary='Containers' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => handleSetType('employees')}>
          <ListItemIcon>
            <BsIcons.BsPeopleFill size='25px' />
          </ListItemIcon>
          <ListItemText primary='Employees' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => handleSetType('payments')}>
          <ListItemIcon>
            <HiIcons.HiCurrencyRupee size='25px' />
          </ListItemIcon>
          <ListItemText primary='Payments' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => handleSetType('cake')}>
          <ListItemIcon>
            <GiIcons.GiCow size='25px' />
          </ListItemIcon>
          <ListItemText primary='Cake' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => handleSetType('other')}>
          <ListItemIcon>
            <RiIcons.RiBillFill size='25px' />
          </ListItemIcon>
          <ListItemText primary='Other' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => handleSetType('transactions')}>
          <ListItemIcon>
            <GiIcons.GiMoneyStack size='25px' />
          </ListItemIcon>
          <ListItemText primary='Transactions' />
        </ListItem>
      </List>
      <Divider />
      <List style={{ color: '#fff', background: '#757575' }}>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <BiIcons.BiLogOutCircle size='25px' style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

export default DrawerItems;
