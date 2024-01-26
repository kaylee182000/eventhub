import { View, Text, Image, Switch } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../../styles/globalStyles';
import {
  CustomButton,
  CustomContainer,
  CustomInput,
  CustomSection,
  CustomText,
  MyArrowIcon,
  Space,
} from '../../../components';
import { ArrowRight, Lock, Sms } from 'iconsax-react-native';
import { appColors } from '../../../constants/appColors';
import { appFonts } from '../../../constants/appFonts';
import { NavigationProp } from '@react-navigation/native';

interface LoginProps {
  navigation: NavigationProp<any, any>;
}

const Login = ({ navigation }: LoginProps) => {
  const [email, setEmail] = useState<string>('');

  const [password, setPassword] = useState<string>('');

  const [isRemember, setIsRemeber] = useState<boolean>(true);

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
    <CustomContainer isImageBackground isScroll>
      <CustomSection
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
          marginBottom: 30,
        }}
      >
        <Image
          source={require('../../../assets/img/login-logo.png')}
          style={{ width: 162, height: 114, resizeMode: 'contain' }}
        />
      </CustomSection>
      <CustomSection>
        <CustomText text="Sign in" title styles={{ marginBottom: 20 }} />
        <CustomInput
          placeholder="Email"
          value={email}
          onChange={(val) => setEmail(val)}
          prefix={<Sms size={22} color={appColors.gray} />}
          allowClear
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChange={(val) => setPassword(val)}
          prefix={<Lock size={22} color={appColors.gray} />}
          isPassword
        />
        <View style={[globalStyles.row]}>
          <View
            style={[globalStyles.row, { justifyContent: 'flex-start', gap: 8 }]}
          >
            <Switch
              value={isRemember}
              onChange={() => setIsRemeber(!isRemember)}
              thumbColor={appColors.white}
              trackColor={{ false: appColors.gray2, true: appColors.primary }}
            />
            <CustomText text="Remember me" />
          </View>
          <CustomButton
            onPress={() => navigation.navigate('EnterNumber')}
            text="Forgot Password?"
            type="text"
          />
        </View>

        <CustomButton
          onPress={() => {}}
          text="SIGN IN"
          icon={<MyArrowIcon />}
          iconFlex="right"
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
        <CustomText
          text="OR"
          fontSize={16}
          color={appColors.gray2}
          fontFamily={appFonts.medium}
          styles={{ textAlign: 'center', marginBottom: 6 }}
        />
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
        <View style={[globalStyles.row, { justifyContent: 'center', gap: 8 }]}>
          <CustomText
            text="Don't have an account?"
            styles={{ fontFamily: appFonts.regular, fontSize: 15 }}
          />
          <CustomButton
            type="link"
            text="Sign up"
            onPress={() => navigation.navigate('SignUp')}
            textStyles={{ fontFamily: appFonts.medium, fontSize: 15 }}
          />
        </View>
      </CustomSection>
    </CustomContainer>
  );
};

export default Login;
