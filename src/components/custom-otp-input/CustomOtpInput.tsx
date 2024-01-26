import { View, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { appColors } from '../../constants/appColors';

interface CustomOtpInputProps {
  onComplete: (code: string) => void;
}

const CustomOtpInput = (props: CustomOtpInputProps) => {
  const { onComplete } = props;
  const length = 4;
  const [pin, setPin] = useState<string[]>(Array(length).fill(''));
  const mapRef: any = [];

  for (let index = 0; index < length; index++) {
    mapRef.push(useRef());
  }

  const inputs = [];

  for (let i = 0; i < length; i++) {
    const handleTextChange = (text: string) => {
      const newPin = [...pin];
      if (text.length === 1) {
        newPin[i] = text;
      } else {
        newPin.splice(i, 1, '');
      }

      if (i < length - 1 && text.length > 0) {
        mapRef[i + 1].current.focus();
      }
      //   else if (text.length === 0 && i > 0) {
      //     mapRef[i].current.focus();
      //   }

      setPin(newPin);
    };

    const handleKeyPress = ({ nativeEvent }: any) => {
      if (nativeEvent.key === 'Backspace' && i > 0) {
        mapRef[i - 1].current.focus();
      }
    };

    inputs.push(
      <TextInput
        key={i}
        style={[styles.inputStyle, { textAlign: 'center' }]}
        onChangeText={handleTextChange}
        value={pin[i]}
        onKeyPress={handleKeyPress}
        keyboardType="numeric"
        maxLength={1}
        onSubmitEditing={() => onComplete(pin.join(''))}
        ref={mapRef[i]}
        // autoFocus={i === 0}
      />,
    );
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {inputs}
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 60,
    width: 60,
    fontSize: 18,
    color: appColors.black,
    backgroundColor: appColors.blackOpacity,
    borderRadius: 15,
    padding: 8,
    margin: 6,
  },
});
export default CustomOtpInput;
