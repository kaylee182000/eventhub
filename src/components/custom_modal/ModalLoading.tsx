import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { Modal } from 'react-native';
import { appColors } from '../../constants/appColors';
import { CustomText, Space } from '..';
import { appFonts } from '../../constants/appFonts';

interface ModalLoadingProps {
  isVisible: boolean;
}

const ModalLoading = (props: ModalLoadingProps) => {
  const { isVisible } = props;
  return (
    <Modal visible={isVisible} statusBarTranslucent transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: appColors.blackHighOpacity,
        }}
      >
        <ActivityIndicator size={36} color={appColors.primary} />
        <Space height={24} />
        <CustomText
          text="Loading..."
          fontSize={18}
          fontFamily={appFonts.regular}
          color={appColors.white}
        />
      </View>
    </Modal>
  );
};

export default ModalLoading;
