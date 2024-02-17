import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { ReactNode } from 'react';
import { Home, Event, AddEvent, Map, Profile, Search } from '../screens';
import { appColors } from '../constants/appColors';
import {
  AddSquare,
  Calendar,
  Discover,
  Location,
  Profile as ProfileIcon,
} from 'iconsax-react-native';
import { CustomText } from '../components';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  const AddEventView = () => {
    return (
      <View
        style={{
          padding: 16,
          borderRadius: 50,
          backgroundColor: appColors.primary,
          position: 'absolute',
          top: -20,
        }}
      >
        <AddSquare color={appColors.white} size={30} variant="Bold" />
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 72,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 8,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let icon: ReactNode | React.JSX.Element;
          color = focused ? appColors.primary : appColors.gray;
          switch (route.name) {
            case 'Explore':
              icon = <Discover size={size} color={color} variant="Bold" />;
              break;
            case 'Event':
              icon = <Calendar size={size} color={color} variant="Bold" />;
              break;
            case 'AddEvent':
              icon = <AddEventView />;
              break;
            case 'Map':
              icon = <Location size={size} color={color} variant="Bold" />;
              break;
            case 'Profile':
              icon = <ProfileIcon size={size} color={color} variant="Bold" />;
              break;

            default:
              break;
          }

          return icon;
        },
        tabBarLabel: ({ focused }) => {
          return (
            <>
              {route.name === 'AddEvent' ? null : (
                <CustomText
                  text={route.name}
                  color={focused ? appColors.primary : appColors.gray}
                />
              )}
            </>
          );
        },
      })}
    >
      <Tab.Screen name="Explore" component={HomeStack} />
      <Tab.Screen name="Event" component={Event} />
      <Tab.Screen name="AddEvent" component={AddEvent} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
