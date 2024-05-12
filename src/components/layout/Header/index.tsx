import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/store';
import { setSigninState } from '../../../redux/user/slice';

export const Header = () => {
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const dispatch = useAppDispatch();

  const LogoutHandler = () => {
    dispatch(setSigninState(false));
    localStorage.removeItem('token');
  };

  const LoggedNav = () => {
    return (
      <nav className={styles.nav}>
        <NavLink to="/messages">Messages</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/friends">Friends</NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink onClick={LogoutHandler} to="/">
          Logout
        </NavLink>
      </nav>
    );
  };

  const UnloggedNav = () => {
    return (
      <nav className={styles.nav}>
        <NavLink to="/">Login</NavLink>
      </nav>
    );
  };

  return (
    <div className={styles.layout}>
      <div className={styles.name}>Lite Social Network</div>
      {isSignedIn ? <LoggedNav /> : <UnloggedNav />}
    </div>
  );
};
