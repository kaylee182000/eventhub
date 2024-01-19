import React, { useEffect, useState } from 'react';
import AuthNavigator from './src/navigators/AuthNavigator';
import { Splash } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return isShowSplash ? (
    <Splash />
  ) : (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default App;
