import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../../styles/globalStyles';
import { CustomContainer, CustomInput, Space } from '../../../components';
import { Lock, Sms } from 'iconsax-react-native';
import { appColors } from '../../../constants/appColors';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <CustomContainer isImageBackground>
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
    </CustomContainer>
  );
};

export default Login;
