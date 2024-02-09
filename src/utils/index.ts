import Toast, { ToastType } from 'react-native-toast-message';

export const showToast = (message: string, type: ToastType) => {
  return Toast.show({
    type: type,
    autoHide: true,
    visibilityTime: 3000,
    swipeable: true,
    position: 'top',
    text1: 'Event Hub',
    text2: message,
    text1Style: { fontSize: 18 },
    text2Style: { fontSize: 14 },
  });
};
