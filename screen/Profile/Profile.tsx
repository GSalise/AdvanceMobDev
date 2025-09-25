import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import getStyles from './Profile.styles';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {
  validateEmail,
  validateUsername,
  loadProfile,
  saveProfile,
  GENRES,
  validateGenre,
} from './Profile_logic';
import ProfileCard from './ProfileCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { lightTheme, darkTheme } from '../../theme';

export default function Profile() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('johndoe@gmail.com');
  const [genre, setGenre] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [genreError, setGenreError] = useState('');

  // Get theme from Redux
  const theme = useSelector((state: RootState) => state.theme.value);
  const themeObj = theme === 'dark' ? darkTheme : lightTheme;
  const styles = getStyles(themeObj);

  useEffect(() => {
    loadProfile().then(profile => {
      setUsername(profile.username || '');
      setEmail(profile.email || '');
      setGenre(profile.genre || '');
    });
  }, []);

  const handleSave = () => {
    saveProfile({ username, email, genre });
  };

  // Use themed gradient colors, fallback to original if not present
  const gradientColors =
    theme === 'dark'
      ? [themeObj.background, themeObj.primary]
      : [themeObj.background, themeObj.primary];

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.topbar}>
        <TouchableOpacity
          style={styles.hamburger}
          onPress={() => navigation.openDrawer()}
          accessibilityLabel="Open drawer menu"
        >
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={styles.bar} />
        </TouchableOpacity>
        <Text style={styles.header}>Profile</Text>
        <View
          style={[styles.hamburger, { opacity: 0, pointerEvents: 'none' }]}
          accessibilityLabel="Open drawer menu"
        >
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={styles.bar} />
        </View>
      </View>
      <ProfileCard
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        genre={genre}
        setGenre={setGenre}
        usernameError={usernameError}
        setUsernameError={setUsernameError}
        emailError={emailError}
        setEmailError={setEmailError}
        genreError={genreError}
        setGenreError={setGenreError}
        onSave={handleSave}
        validateUsername={validateUsername}
        validateEmail={validateEmail}
        validateGenre={validateGenre}
        genres={GENRES}
        themeObj={themeObj}
      />
    </LinearGradient>
  );
}
