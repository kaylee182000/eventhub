import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { ReactNode } from 'react';
import { Home, Event, AddEvent, Map, Profile } from '../screens';
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

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  const AddEventView = ({ size }: { size: number }) => {
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
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 12,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let icon: ReactNode | React.JSX.Element;
          color = focused ? appColors.primary : appColors.gray;
          switch (route.name) {
            case 'Home':
              icon = <Discover size={size} color={color} variant="Bold" />;
              break;
            case 'Event':
              icon = <Calendar size={size} color={color} variant="Bold" />;
              break;
            case 'AddEvent':
              icon = <AddEventView size={size} />;
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
        // tabBarShowLabel: false,
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Event" component={Event} />
      <Tab.Screen name="AddEvent" component={AddEvent} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
