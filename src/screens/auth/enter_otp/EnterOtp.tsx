import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { authApi } from '../../../apis/auth.api';
import {
  CustomButton,
  CustomContainer,
  CustomOtpInput,
  CustomSection,
  CustomText,
  ModalLoading,
  MyArrowIcon,
} from '../../../components';
import { appColors } from '../../../constants/appColors';
import { appFonts } from '../../../constants/appFonts';
import { setIsAuthorized, setUserData } from '../../../store/auth/authReducer';
import { globalStyles } from '../../../styles/globalStyles';
import { showToast } from '../../../utils';

interface EnterOtpProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any>;
}

const EnterOtp = ({ navigation, route }: EnterOtpProps) => {
  const dispatch = useDispatch();

  const [time, setTime] = useState<number>(120);

  const [displayText, setDisplayText] = useState<string>('');

  const [serverPinCode, setServerPinCode] = useState<string>(
    route.params?.code.toString(),
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const onSendOtp = async () => {
    if (time === 0) {
      showToast(
        'The code has expired. Please resend code and try again.',
        'info',
      );
      return;
    } else {
      if (pinCode !== serverPinCode) {
        showToast(
          'The OTP you have entered is incorrect. Please try again.',
          'error',
        );
        return;
      }
      setIsLoading(true);
      try {
        const res = await authApi.Register({
          email: route.params?.email,
          password: route.params?.password,
          username: route.params?.username,
        });
        if (res.data) {
          const { username, email, photoUrl } = res.data.user;
          dispatch(setIsAuthorized(true));
          dispatch(setUserData({ username, email, photoUrl }));
          showToast('Your account has been created', 'success');
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        showToast('Try again later', 'error');
      }
    }
  };

  const handleResendVerificationCode = async () => {
    setIsLoading(true);
    try {
      const res = await authApi.SendVerificationCode({
        email: route.params?.email,
      });

      if (res.data) {
        setServerPinCode(res.data.code.toString());
        setIsLoading(false);
        setTime(120);
      }
    } catch (error) {
      setIsLoading(false);
      showToast('Try again later', 'error');
    }
  };

  return (
    <>
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
          <CustomSection
            styles={[
              globalStyles.row,
              {
                justifyContent: 'center',
                marginVertical: 24,
                flexDirection: 'column',
                gap: 12,
              },
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
              text={route.params?.email}
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
          styles={[
            globalStyles.row,
            { justifyContent: 'center', marginTop: 24 },
          ]}
        >
          <CustomText text={`Resend code in `} fontSize={15} />
          <CustomButton
            onPress={handleResendVerificationCode}
            type="text"
            text={displayText ? displayText : '02:00'}
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
      {isLoading && <ModalLoading isVisible={isLoading} />}
    </>
  );
};

export default EnterOtp;
