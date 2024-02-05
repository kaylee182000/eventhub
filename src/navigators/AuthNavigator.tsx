import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  EnterNumber,
  EnterOtp,
  Login,
  Onboarding,
  ResetPassword,
  SignUp,
} from '../screens';
import { rootState } from '../store';

const AuthNavigator = () => {
  const main = useSelector((state: rootState) => state.main);

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={main.alreadyOnboard ? 'Login' : 'Onboarding'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="EnterNumber" component={EnterNumber} />
      <Stack.Screen name="EnterOtp" component={EnterOtp} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
