import { Image } from 'react-native';
import React, { useState } from 'react';
import {
  CustomButton,
  CustomContainer,
  CustomInput,
  CustomSection,
  CustomText,
  MyArrowIcon,
  Space,
} from '../../../components';
import { NavigationProp } from '@react-navigation/native';
import { appColors } from '../../../constants/appColors';
import { Call } from 'iconsax-react-native';
import { appFonts } from '../../../constants/appFonts';
import { globalStyles } from '../../../styles/globalStyles';

interface EnterNumberProps {
  navigation: NavigationProp<any, any>;
}

const EnterNumber = ({ navigation }: EnterNumberProps) => {
  const [number, setNumber] = useState<string>('');

  return (
    <CustomContainer
      isImageBackground
      isScroll
      showHeader
      onPressNavigate={() => navigation.goBack()}
    >
      <CustomSection
        styles={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
          },
        ]}
      >
        <Image
          source={require('../../../assets/img/otp-logo.png')}
          style={{ width: 250, height: 250, resizeMode: 'contain' }}
        />
      </CustomSection>
      <CustomSection
        styles={[{ justifyContent: 'center', alignItems: 'center' }]}
      >
        <CustomText
          text="Otp Verification"
          title
          styles={[{ marginTop: 24, letterSpacing: 1 }]}
        />
        <CustomText
          text={`We will send you one-time password\n to your mobile number`}
          styles={[
            {
              marginTop: 24,
              lineHeight: 24,
              fontSize: 15,
              textAlign: 'center',
            },
          ]}
        />
      </CustomSection>
      <CustomSection
        styles={[
          { justifyContent: 'center', alignItems: 'center', marginTop: 24 },
        ]}
      >
        <CustomText
          text={`Enter your phone number`}
          color={appColors.gray}
          fontSize={15}
        />
        <Space height={20} />
        <CustomInput
          placeholder="Phone number"
          value={number}
          onChange={(val) => setNumber(val)}
          prefix={<Call size={22} color={appColors.gray} />}
          allowClear
          keyboardType="phone-pad"
          customStyles={{ width: '65%' }}
        />
      </CustomSection>

      <CustomButton
        onPress={() => navigation.navigate('EnterOtp')}
        icon={<MyArrowIcon />}
        iconFlex="right"
        text="Get OTP"
        type="primary"
        textStyles={{
          textAlign: 'center',
          fontFamily: appFonts.medium,
          fontSize: 16,
          letterSpacing: 1,
        }}
        styles={[
          globalStyles.shadow,
          { width: 271, alignSelf: 'center', marginVertical: 24 },
        ]}
      />
    </CustomContainer>
  );
};

export default EnterNumber;
