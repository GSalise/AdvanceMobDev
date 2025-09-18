import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screen/Login';
import SignUp from './screen/SignUp';
import Playlist from './screen/Playlist/Playlist';
import ComponentShowcase from './screen/ComponentShowcase';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerScreens() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen 
        name="Playlist" 
        component={Playlist}
        options={{swipeEnabled: false}} />
      <Drawer.Screen 
        name="ComponentShowcase" 
        component={ComponentShowcase}
        options={{swipeEnabled: false}} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Main" component={DrawerScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}