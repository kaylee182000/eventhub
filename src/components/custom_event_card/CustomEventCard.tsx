import { View, Text } from 'react-native';
import React from 'react';

interface CustomEventCardProps {
  eventData: {
    date: string;
    month: string;
    name: string;
    address: string;
    bookmark: boolean;
  };
}

const CustomEventCard = ({ eventData }: CustomEventCardProps) => {
  return (
    <View>
      <Text>{eventData.name}</Text>
    </View>
  );
};

export default CustomEventCard;
