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
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    height: 56,
    flexDirection: 'row',
  },
  section: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
