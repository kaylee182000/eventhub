import { View } from 'react-native';
import React from 'react';

interface SpaceProps {
  width?: number;
  height?: number;
}

const Space = (props: SpaceProps) => {
  const { width, height } = props;
  return <View style={{ width, height }} />;
};

export default Space;
