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
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  header: {
    height: 75,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
