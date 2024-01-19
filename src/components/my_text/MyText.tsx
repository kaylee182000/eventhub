import { View, Text, TextStyle, StyleProp } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/globalStyles';

interface MyTextProps {
  text: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  styles?: StyleProp<TextStyle>;
}

const MyText = (props: MyTextProps) => {
  const { text, color, fontSize, fontFamily, styles } = props;
  return (
    <Text
      style={[
        globalStyles.primaryText,
        { color, fontSize, fontFamily },
        styles,
      ]}
    >
      {text}
    </Text>
  );
};

export default MyText;
