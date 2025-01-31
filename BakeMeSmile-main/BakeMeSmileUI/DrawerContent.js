import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerList = [
  {icon: 'home-outline', label: 'Home', navigateTo: 'Home'},
  {icon: 'account-multiple', label: 'Profile', navigateTo: 'Profile'},
  {icon: 'shopping', label: 'Products', navigateTo: 'Products'},
  {icon: 'cart', label: 'Cart', navigateTo: 'Cart'},
  {icon: 'phone', label: 'Contact', navigateTo: 'Contact'},
  {icon: 'information', label: 'About', navigateTo: 'About'},
];

const DrawerLayout = ({icon, label, navigateTo}) => {
  const navigation = useNavigation();
  
  return (
    <DrawerItem
      icon={({color, size}) => <Icon name={icon} color='#ffde59' size={25} />}
      label={label}
      onPress={() => {
        navigation.navigate(navigateTo);
      }}
    />
  );
};

const DrawerItems = () => {
  return DrawerList.map((el, i) => {
    return (
      <DrawerLayout
        key={i}
        icon={el.icon}
        label={el.label}
        navigateTo={el.navigateTo}
      />
    );
  });
};

function DrawerContent(props) {
  const navigation = useNavigation();

  function signOut() {
    AsyncStorage.setItem('isLoggedIn', '');
    AsyncStorage.setItem('token', '');
    navigation.navigate("LoginUser");
  }

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.userInfoSection}>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <Avatar.Image
                  source={{
                    uri: 'https://pm1.aminoapps.com/7821/709b1b94e5384a9bcc87c7207fb4d521d54d4492r1-1080-1349v2_hq.jpg',
                  }}
                  size={60}
                  style={{marginTop: 5}}
                />
                <View style={{marginLeft: 10, flexDirection: 'column'}}>
                  <Title style={styles.title}>Nikol</Title>
                  <Text style={styles.caption} numberOfLines={1}>
                    Stacey69nicole@gmail.com
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.drawerSection}>
            <DrawerItems />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          onPress={() => signOut()}
          icon={({color, size}) => (
            <Icon name="exit-to-app" color='#ffde59' size={25} />
          )}
          label="Logout"
        />
      </View>
    </View>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    width: '100%',
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
  },
});
