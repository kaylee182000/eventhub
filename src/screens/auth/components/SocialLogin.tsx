import React from 'react';
import { Image } from 'react-native';
import { CustomButton } from '../../../components';
import { appColors } from '../../../constants/appColors';
import { appFonts } from '../../../constants/appFonts';
import { globalStyles } from '../../../styles/globalStyles';

const SocialLogin = () => {
  const PrefixSvgIcon = (icon: string) => {
    if (icon === 'Facebook') {
      return (
        <Image
          source={require('../../../assets/img/facebook-icon.png')}
          width={30}
          height={30}
        />
      );
    } else {
      return (
        <Image
          source={require('../../../assets/img/google-icon.png')}
          width={30}
          height={30}
        />
      );
    }
  };
  return (
    <>
      <CustomButton
        onPress={() => {}}
        text="Login with Google"
        icon={PrefixSvgIcon('Google')}
        iconFlex="left"
        type="primary"
        textStyles={{
          textAlign: 'center',
          fontFamily: appFonts.regular,
          fontSize: 16,
          color: appColors.black,
        }}
        styles={[
          globalStyles.shadow,
          {
            width: 271,
            alignSelf: 'center',
            backgroundColor: appColors.white,
            marginBottom: 18,
          },
        ]}
      />
      <CustomButton
        onPress={() => {}}
        text="Login with Facebook"
        icon={PrefixSvgIcon('Facebook')}
        iconFlex="left"
        type="primary"
        textStyles={{
          textAlign: 'center',
          fontFamily: appFonts.regular,
          fontSize: 16,
          color: appColors.black,
        }}
        styles={[
          globalStyles.shadow,
          {
            width: 271,
            alignSelf: 'center',
            backgroundColor: appColors.white,
            marginBottom: 18,
          },
        ]}
      />
    </>
  );
};

export default SocialLogin;
