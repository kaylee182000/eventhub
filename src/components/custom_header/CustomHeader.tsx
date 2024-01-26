import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { appColors } from '../../constants/appColors';
import { globalStyles } from '../../styles/globalStyles';

interface CustomHeaderProps {
  onPress: () => void;
}

const CustomHeader = (props: CustomHeaderProps) => {
  const { onPress } = props;
  return (
    <View style={[globalStyles.header]}>
      <TouchableOpacity
        style={{
          height: 48,
          justifyContent: 'flex-end',
          width: 48,
        }}
        onPress={onPress}
      >
        <FontAwesome6 name="arrow-left" color={appColors.black} size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
