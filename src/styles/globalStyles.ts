import { StyleSheet } from 'react-native';
import { appColors } from '../constants/appColors';
import { appFonts } from '../constants/appFonts';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  primaryText: {
    color: appColors.text,
    fontSize: 14,
    fontFamily: appFonts.regular,
  },
});
