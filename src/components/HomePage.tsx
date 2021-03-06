import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  List,
  ListItemText,
  Button,
  Drawer
} from '@material-ui/core';
import LoginPage from './LoginPage';

interface PropsInterface {
  loginState: boolean;
  setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

interface LoginPropsInterface {
  setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles: (
  props?: any
) => Record<'list' | 'fullList' | 'group', string> = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  group: {
    fontWeight: 900
  }
});

const HomePage: React.FC<PropsInterface> = ({
  loginState,
  setLoginState,
  username,
  setUsername,
  password,
  setPassword
}) => {
  const classes: Record<'list' | 'fullList' | 'group', string> = useStyles();
  const [drawerOut, setDrawerOut]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);

  const toggleDrawer: (
    open: boolean
  ) => (
    event: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>
  ) => void = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ): void => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerOut(open);
  };

  const list: () => JSX.Element = (): JSX.Element => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem className={classes.group} button key="title">
          <ListItemText className={classes.group} primary="Groups" />
        </ListItem>
        {['Family', 'Friends', 'The bois', 'Obama'].map((text) => (
          <Link to={`/list/${text}`}>
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const loginProps: LoginPropsInterface = {
    setLoginState,
    username,
    setUsername,
    password,
    setPassword
  };

  return (
    <>
      {loginState ? (
        <div>
          <h1>Welcome {username}!</h1>
          <Button onClick={toggleDrawer(true)}>See Groups</Button>

          <Drawer
            anchor={'left'}
            open={drawerOut}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </div>
      ) : (
        <LoginPage {...loginProps}>
          <p>Please log in!</p>
        </LoginPage>
      )}
    </>
  );
};

export default HomePage;
