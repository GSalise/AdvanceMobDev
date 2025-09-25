import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeSwitcher = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.value); // <-- FIXED
  const themeObj = theme === 'dark' ? darkTheme : lightTheme;
  const styles = getStyles(themeObj);

  const handleToggleTheme = async () => {
    dispatch(toggleTheme());
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    await AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        {/* Hamburger Button */}
        <TouchableOpacity
          style={styles.hamburger}
          onPress={() => navigation.openDrawer()}
          accessibilityLabel="Open drawer menu"
        >
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={styles.bar} />
        </TouchableOpacity>
        <Text style={styles.header}>Theme Switcher</Text>
      </View>
      <View style={styles.centerContent}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleToggleTheme}
          accessibilityLabel="Toggle theme"
        >
          <Text style={styles.buttonText}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function getStyles(themeObj: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeObj.background,
      paddingTop: 60,
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeObj.text,
      marginBottom: 32,
    },
    button: {
      backgroundColor: themeObj.primary,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: themeObj.text,
      fontWeight: 'bold',
      fontSize: 16,
    },
    topbar: {
      marginTop: -10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 40,
      borderColor: 'white',
      marginVertical: 2,
      borderRadius: 2,
      marginBottom: 10,
      paddingHorizontal: 8,
    },
    hamburger: {
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bar: {
      width: 24,
      height: 3,
      backgroundColor: themeObj.bar,
      marginVertical: 2,
      borderRadius: 2,
    },
    header: {
      color: themeObj.text,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
      marginRight: 15,
    },
    centerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}

export default ThemeSwitcher;
