import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Splash } from '../screens';
import { rootState } from '../store';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import DrawerNavigator from './DrawerNavigator';

const AppNavigator = () => {
  const auth = useSelector((state: rootState) => state.auth);

  const [isShowSplash, setIsShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isShowSplash ? (
        <Splash />
      ) : auth.isAuthorized ? (
        <DrawerNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default AppNavigator;
