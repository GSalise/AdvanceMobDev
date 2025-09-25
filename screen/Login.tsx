import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../theme';
import type { StackNavigationProp } from '@react-navigation/stack';

const BACKGROUND = '#121212';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Main: { screen: 'Playlist' } | undefined;
  Playlist: undefined;
};

export default function Login() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { theme, toggleTheme } = useTheme();
  const themeObj = theme === 'dark' ? darkTheme : lightTheme;

  const styles = getStyles(themeObj);

  return (
    <View style={styles.root}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Spotify_Primary_Logo_RGB_Green.png')}
          style={styles.logo}
          alt="Spotify Logo"
        />
        <Image
          source={
            theme === 'dark'
              ? require('../assets/Spotify_Text_Logo.png')
              : require('../assets/Spotify_Text_Logo_Black.png')
          }
          style={styles.logoText}
          alt="Spotify Logo Text with the words Spotify"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input_text}
          placeholder="Email"
          placeholderTextColor={themeObj.placeholder}
          accessibilityLabel="Email Textbox, enter your email here to sign in to Spotify"
        />
        <TextInput
          style={styles.input_text}
          placeholder="Password"
          placeholderTextColor={themeObj.placeholder}
          accessibilityLabel="Password Textbox, enter your email here to sign in to Spotify"
        />
        <Text
          style={styles.forgotPassword}
          accessibilityLabel="Forgot Password Link, click this to retrieve your password"
        >
          Forgot Password?
        </Text>
        <TouchableOpacity
          style={styles.signInBtn}
          onPress={() => navigation.navigate('Main', { screen: 'Playlist' })}
        >
          <Text
            style={styles.signInBtnTxt}
            accessibilityLabel="Sign In Button, click this to sign in to your Spotify account"
          >
            Log In
          </Text>
        </TouchableOpacity>
        <Text
          style={styles.connectWith}
          accessibilityLabel="Connect With your facebook or google account"
        >
          Connect With
        </Text>
        <View style={styles.logoRow}>
          <Image
            source={
              theme === 'dark'
                ? require('../assets/facebook-app-round-white-icon.png')
                : require('../assets/facebook-app-round-icon.png')
            }
            style={styles.fblogo}
            accessibilityLabel="Click this to connect with your facebook account"
          />
          <Image
            source={
              theme === 'dark'
                ? require('../assets/google-white-icon.png')
                : require('../assets/google-black-icon.png')
            }
            style={styles.googlelogo}
            accessibilityLabel="Click this to connect with your google account"
          />
        </View>
        <Text style={styles.donthave}>
          Don't have an account?{' '}
          <Text
            style={{ color: '#1db954', fontWeight: 'bold', fontSize: 11 }}
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

// Move styles into a function that takes the theme
const getStyles = (theme: typeof darkTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      width: 260, // Adjust as needed
      height: 260, // Adjust as needed
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      // marginTop: -550,
      top: 50,
      // borderColor: 'red',
      // borderWidth: 2,
    },
    logo: {
      width: 140,
      height: 140,
      position: 'absolute',
      // borderColor: 'red',
      // borderWidth: 2,
    },
    logoText: {
      width: 130,
      height: 130,
      position: 'absolute',
      resizeMode: 'contain',
      bottom: -30,
      // borderColor: 'red',
      // borderWidth: 2,
    },
    inputContainer: {
      width: 310, // Adjust as needed
      height: 260, // Adjust as needed
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      // borderColor: 'red',
      // borderWidth: 2,
      bottom: 180,
    },
    input_text: {
      width: 300,
      height: 40,
      backgroundColor: theme.inputBackground,
      color: theme.inputText,
      borderRadius: 12,
      paddingHorizontal: 12,
      fontSize: 16,
      borderWidth: 2,
      marginBottom: 10,
      borderTopColor: '#2c2c2cff', // Slightly lighter top
      borderLeftColor: '#2c2c2cff', // Slightly lighter left
      borderBottomColor: '#121212', // Slightly darker bottom
      borderRightColor: '#121212', // Slightly darker right
    },
    forgotPassword: {
      color: '#1db954', // Optional: make it look like a link
      alignSelf: 'flex-end',
      marginRight: 10,
      marginTop: 4,
      fontSize: 11,
      textDecorationLine: 'underline',
      fontWeight: 'bold',
    },
    signInBtn: {
      backgroundColor: theme.primary,
      borderRadius: 24,
      paddingVertical: 12,
      paddingHorizontal: 32,
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 10,
      elevation: 2,
      width: 300,
    },
    signInBtnTxt: {
      color: theme.text,
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    connectWith: {
      color: '#1db954',
      alignSelf: 'center',
      marginTop: 10,
      fontSize: 11,
      fontWeight: 'bold',
    },
    donthave: {
      color: '#666666ff',
      alignSelf: 'center',
      marginTop: 10,
      fontSize: 11,
      fontWeight: 'bold',
    },
    logoRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
    },
    fblogo: {
      width: 25,
      height: 25,
      marginHorizontal: 8, // Add spacing
    },
    googlelogo: {
      width: 25,
      height: 25,
      marginHorizontal: 8, // Add spacing
    },
  });
