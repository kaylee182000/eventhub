import { ArrowRight } from 'iconsax-react-native';
import React from 'react';
import { View } from 'react-native';
import { appColors } from '../../constants/appColors';

const MyArrowIcon = () => {
  return (
    <View style={{ padding: 6, backgroundColor: '#3D56F0', borderRadius: 50 }}>
      <ArrowRight size={18} color={appColors.white} />
    </View>
  );
};

export default MyArrowIcon;
