import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

interface CustomEventCardProps {
  eventData: {
    date: string;
    month: string;
    name: string;
    address: string;
    bookmark: boolean;
  };
  onPressCard: () => void;
}

const CustomEventCard = ({ eventData, onPressCard }: CustomEventCardProps) => {
  return (
    <Pressable onPress={onPressCard}>
      <View style={[globalStyles.shadow, styles.container]}>
        <Text>{eventData.name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 250,
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'white',
  },
});

export default CustomEventCard;
