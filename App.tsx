import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screen/Login';
import SignUp from './screen/SignUp';
import Playlist from './screen/Playlist/Playlist';
import ComponentShowcase from './screen/ComponentShowcase';
import { ThemeProvider } from './context/ThemeContext';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTheme } from './store/themeSlice';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerScreens() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="Playlist"
        component={Playlist}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen
        name="ComponentShowcase"
        component={ComponentShowcase}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen
        name="Profile"
        getComponent={() => require('./screen/Profile/Profile').default}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen
        name="ThemeSwitcher"
        getComponent={() => require('./screen/ThemeSwitcher').default}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen
        name="Camera"
        getComponent={() => require('./screen/Camera/Camera').default}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen
        name="Map"
        getComponent={() => require('./screen/Map').default}
        options={{ swipeEnabled: false }}
      />
    </Drawer.Navigator>
  );
}

const ThemeLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    AsyncStorage.getItem('theme').then(storedTheme => {
      if (storedTheme === 'light' || storedTheme === 'dark') {
        dispatch(setTheme(storedTheme));
      }
    });
  }, [dispatch]);

  return <>{children}</>;
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeLoader>
        <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Main" component={DrawerScreens} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </ThemeLoader>
    </Provider>
  );
}
