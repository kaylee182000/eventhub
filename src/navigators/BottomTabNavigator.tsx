import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Home } from '../screens';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
