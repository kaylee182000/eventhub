import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import {
  CustomButton,
  CustomContainer,
  CustomOtpInput,
  CustomSection,
  CustomText,
  MyArrowIcon,
} from '../../../components';
import { appColors } from '../../../constants/appColors';
import { appFonts } from '../../../constants/appFonts';
import { globalStyles } from '../../../styles/globalStyles';

interface EnterOtpProps {
  navigation: NavigationProp<any, any>;
}

const EnterOtp = ({ navigation }: EnterOtpProps) => {
  const [time, setTime] = useState<number>(60);

  const [displayText, setDisplayText] = useState<string>('');

  const [pinCode, setPinCode] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));

      const minutes = Math.floor(time / 60);
      const seconds = time % 60;

      setDisplayText(
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
          2,
          '0',
        )}`,
      );

      if (time === 0) {
        setDisplayText('Resend');
        clearInterval(interval);
      }
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [time]);

  const onSendOtp = () => {
    if (!pinCode) return;
    navigation.navigate('ResetPassword');
  };
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
            marginVertical: 30,
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
        <CustomSection
          styles={[
            globalStyles.row,
            { justifyContent: 'center', marginVertical: 24 },
          ]}
        >
          <CustomText
            text={'Enter the Otp sent to '}
            styles={[
              {
                lineHeight: 20,
                fontSize: 15,
              },
            ]}
          />
          <CustomText
            text={'090973535'}
            styles={[
              {
                lineHeight: 20,
                fontSize: 15,
                fontFamily: appFonts.extra_bold,
              },
            ]}
          />
        </CustomSection>

        <CustomOtpInput onComplete={(val) => setPinCode(val)} />
      </CustomSection>
      <CustomSection
        styles={[globalStyles.row, { justifyContent: 'center', marginTop: 24 }]}
      >
        <CustomText text={`Resend code in `} fontSize={15} />
        <CustomButton
          onPress={() => {}}
          type="text"
          text={displayText ? displayText : '01:00'}
          textStyles={{
            color: appColors.primary,
            fontSize: 15,
            fontFamily: appFonts.bold,
          }}
        />
      </CustomSection>

      <CustomButton
        onPress={onSendOtp}
        icon={<MyArrowIcon />}
        iconFlex="right"
        text="Send OTP"
        type="primary"
        textStyles={{
          textAlign: 'center',
          fontFamily: appFonts.medium,
          fontSize: 16,
          letterSpacing: 1,
        }}
        styles={[
          globalStyles.shadow,
          { width: 271, alignSelf: 'center', marginVertical: 30 },
        ]}
      />
    </CustomContainer>
  );
};

export default EnterOtp;
