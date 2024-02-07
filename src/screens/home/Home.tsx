import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setIsAuthorized } from '../../store/auth/authReducer';
import { NavigationProp } from '@react-navigation/native';

interface HomeProps {
  navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: HomeProps) => {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(setIsAuthorized(false));
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
