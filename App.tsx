import * as React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screen/Login';
import SignUp from './screen/SignUp';
import Playlist from './screen/Playlist';

const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: Login,
      options: { headerShown: false },
    },
    SignUp: {
      screen: SignUp,
      options: { headerShown: false },
    },
    Playlist: {
      screen: Playlist,
      options: { headerShown: false },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}