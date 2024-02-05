import React, { useEffect, useState } from 'react';
import AuthNavigator from './src/navigators/AuthNavigator';
import { Splash } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigators/MainNavigator';
import store, { persistor } from './src/store';
import { Provider } from 'react-redux';
import { ModalLoading } from './src/components';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
          <Toast />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
