import React, { useEffect, useState } from 'react';
import AuthNavigator from './src/navigators/AuthNavigator';
import { Splash } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigators/MainNavigator';

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState<boolean>(true);

  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const { setItem, getItem } = useAsyncStorage('accessToken');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    checkIsAuthorized();
  }, []);

  const checkIsAuthorized = async () => {
    const token = await getItem();

    token && setIsAuthorized(true);
  };

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      {isShowSplash ? (
        <Splash />
      ) : (
        <NavigationContainer>
          {isAuthorized ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
