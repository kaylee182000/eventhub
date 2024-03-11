import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { rootState } from '../../store';
import { CustomButton, CustomText } from '..';
import { appFonts } from '../../constants/appFonts';
import { appColors } from '../../constants/appColors';
import {
  Archive,
  Calendar,
  Crown,
  Logout,
  Message2,
  MessageQuestion,
  Setting2,
  Sms,
  User,
} from 'iconsax-react-native';

const size = 24;
const color = appColors.blackHighOpacity;

const menuLists = [
  {
    key: 'MyProfile',
    title: 'My Profile',
    icon: <User size={size} color={color} />,
  },
  {
    key: 'Message',
    title: 'Message',
    icon: <Message2 size={size} color={color} />,
  },
  {
    key: 'Calendar',
    title: 'Calendar',
    icon: <Calendar size={size} color={color} />,
  },
  {
    key: 'Bookmark',
    title: 'Bookmark',
    icon: <Archive size={size} color={color} />,
  },
  {
    key: 'ContactUs',
    title: 'Contact Us',
    icon: <Sms size={size} color={color} />,
  },
  {
    key: 'Settings',
    title: 'Settings',
    icon: <Setting2 size={size} color={color} />,
  },
  {
    key: 'HelpAndFAQs',
    title: 'Help & FAQs',
    icon: <MessageQuestion size={size} color={color} />,
  },
  {
    key: 'SignOut',
    title: 'Sign Out',
    icon: <Logout size={size} color={color} />,
  },
];

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { navigation } = props;

  const auth = useSelector((state: rootState) => state.auth);

  const renderProfileImage = () => {
    if (auth.userData.photoUrl) {
      return (
        <Image
          source={{ uri: auth.userData.photoUrl }}
          style={[styles.avatarContainer]}
        />
      );
    }
    return (
      <View
        style={[
          styles.avatarContainer,
          {
            backgroundColor: appColors.primary,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <CustomText
          text={auth.userData.username[0]}
          color={appColors.white}
          fontSize={24}
          fontFamily={appFonts.bold}
        />
      </View>
    );
  };

  const hanlePressProfileImage = () => {
    navigation.navigate('Profile');
    navigation.closeDrawer();
  };

  const renderMenuList = () => {
    return menuLists.map((el, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => handlePressMenuItem(el.key)}
        >
          <View style={[styles.menuItemContainer]}>
            {el.icon}
            <CustomText text={el.title} fontSize={18} />
          </View>
        </TouchableOpacity>
      );
    });
  };

  const handlePressMenuItem = (menu: string) => {};

  return (
    <View style={[styles.drawerContainer]}>
      <View style={[styles.profileContainer]}>
        <TouchableOpacity onPress={hanlePressProfileImage}>
          {renderProfileImage()}
        </TouchableOpacity>
        <CustomText
          text={auth.userData.username}
          fontSize={24}
          fontFamily={appFonts.bold}
        />
      </View>
      <ScrollView style={[styles.listMenuContainer]}>
        {renderMenuList()}
      </ScrollView>
      <CustomButton
        type="primary"
        styles={{ backgroundColor: appColors.skyOpacity, width: 150 }}
        text="Upgrade Pro"
        textStyles={{
          color: appColors.sky,
          fontSize: 16,
          fontFamily: appFonts.medium,
        }}
        icon={<Crown color={appColors.sky} variant="Bold" />}
        iconFlex="left"
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingVertical: StatusBar.currentHeight,
    paddingHorizontal: 20,
    gap: 16,
  },
  profileContainer: {
    marginTop: 12,
    gap: 16,
  },
  listMenuContainer: {
    flex: 1,
    marginTop: 36,
    paddingHorizontal: 8,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  menuItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
});

export default CustomDrawer;
