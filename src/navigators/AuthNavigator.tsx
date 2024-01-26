import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  EnterNumber,
  EnterOtp,
  Login,
  Onboarding,
  ResetPassword,
  SignUp,
} from '../screens';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
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
