import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Home, Event, AddEvent, Map, Profile } from '../screens';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Event" component={Event} />
      <Tab.Screen name="AddEvent" component={AddEvent} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
