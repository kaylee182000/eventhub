import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../../styles/globalStyles';
import {
  CustomContainer,
  CustomInput,
  CustomSection,
  CustomText,
  Space,
} from '../../../components';
import { Lock, Sms } from 'iconsax-react-native';
import { appColors } from '../../../constants/appColors';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
      </CustomSection>
    </CustomContainer>
  );
};

export default Login;
