import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import DrawerContent from './DrawerContent';
import HomeScreen from './Screens/HomeScreen';
import LoginPage from './Screens/Login&Register/Login';
import RegisterPage from './Screens/Login&Register/Register';
import UpdateProfile from './Screens/UpdateProfile/UpdateProfile';
import About from './Screens/About';
import Cart from './Screens/Cart';
import Contact from './Screens/Contact';
import { Products} from './Screens/Products';
import Profile from './Screens/Profile';
import PaymentOption from './Screens/PaymentOption';
import { CartProvider } from './CartContext';
import OrderSummary from './Screens/OrderSummary'; // Import OrderSummary component

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        borderLeftWidth: 7,
        width: '90%',
        height: 70,
        borderRightColor: 'green',
        borderRightWidth: 7,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '700',
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text2NumberOfLines={3}
      style={{
        borderLeftColor: 'red',
        borderLeftWidth: 7,
        width: '90%',
        height: 70,
        borderRightColor: 'red',
        borderRightWidth: 7,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '700',
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: '#0163d2',
        headerShown: false,
        headerStyle: {
          backgroundColor: '#0163d2',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ headerShown: false }} />
      <Stack.Screen name="LoginUser" component={LoginNav} />
    </Stack.Navigator>
  );
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={StackNav} />
      <Drawer.Screen name="Products" component={Products} />
      <Drawer.Screen name="Cart" component={Cart} />
      <Drawer.Screen name="Contact" component={Contact} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="PaymentOption" component={PaymentOption} />
      <Drawer.Screen name="OrderSummary" component={OrderSummary} />

    </Drawer.Navigator>
  );
};


const LoginNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="Home" component={DrawerNav} />
      <Stack.Screen name="AdminScreen" component={AdminStack} />
    </Stack.Navigator>
  );
};

const AdminStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          statusBarColor: '#0163d2',
          headerShown: true,
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: '#0163d2',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
        name="AdminScreen"
        component={AdminScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginNav}
      />
    </Stack.Navigator>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('isLoggedIn');
      const userType1 = await AsyncStorage.getItem('userType');
      console.log(data, 'at app.jsx');
      setIsLoggedIn(data);
      setUserType(userType1);
      SplashScreen.hide();
    };
    getData();
  }, []);

  return (
    <CartProvider>
      <NavigationContainer>
        {isLoggedIn && userType === 'Admin' ? (
          <AdminStack />
        ) : isLoggedIn ? (
          <DrawerNav />
        ) : (
          <LoginNav />
        )}
        <Toast config={toastConfig} />
      </NavigationContainer>
    </CartProvider>
  );
}

export default App;

