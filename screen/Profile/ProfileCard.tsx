import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import style from './Profile.styles';

type ProfileCardProps = {
  username: string;
  setUsername: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  genre: string;
  setGenre: (val: string) => void;
  usernameError: string;
  setUsernameError: (val: string) => void;
  emailError: string;
  setEmailError: (val: string) => void;
  genreError: string;
  setGenreError: (val: string) => void;
  onSave: () => void;
  validateUsername: (val: string) => boolean;
  validateEmail: (val: string) => boolean;
  validateGenre: (val: string) => boolean;
  genres: string[];
};

export default function ProfileCard({
  username,
  setUsername,
  email,
  setEmail,
  genre,
  setGenre,
  usernameError,
  setUsernameError,
  emailError,
  setEmailError,
  genreError,
  setGenreError,
  onSave,
  validateUsername,
  validateEmail,
  validateGenre,
  genres,
}: ProfileCardProps) {
  const [flipped, setFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Shake animations for each field
  const usernameShake = useRef(new Animated.Value(0)).current;
  const emailShake = useRef(new Animated.Value(0)).current;
  const genreShake = useRef(new Animated.Value(0)).current;

  const rotateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const flipCard = () => {
    Animated.timing(animatedValue, {
      toValue: flipped ? 0 : 1,
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => setFlipped(f => !f));
  };

  // Shake animation function
  const triggerShake = (shakeAnim: Animated.Value) => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Real-time validation handlers (no shake here)
  const handleUsernameChange = (val: string) => {
    setUsername(val);
    if (!validateUsername(val)) {
      setUsernameError(
        'Username must be 3–20 characters, alphanumeric or underscores.',
      );
    } else {
      setUsernameError('');
    }
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (!validateEmail(val)) {
      setEmailError('Enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleGenreChange = (val: string) => {
    setGenre(val);
    if (!validateGenre(val)) {
      setGenreError('Please select a genre.');
    } else {
      setGenreError('');
    }
  };

  // Only shake on Save
  const handleSave = () => {
    let valid = true;
    if (!validateUsername(username)) {
      setUsernameError(
        'Username must be 3–20 characters, alphanumeric or underscores.',
      );
      triggerShake(usernameShake);
      valid = false;
    }
    if (!validateEmail(email)) {
      setEmailError('Enter a valid email address.');
      triggerShake(emailShake);
      valid = false;
    }
    if (!validateGenre(genre)) {
      setGenreError('Please select a genre.');
      triggerShake(genreShake);
      valid = false;
    }
    if (valid) {
      onSave();
      flipCard();
    }
  };

  return (
    <View style={style.body}>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={flipCard}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <View style={{ width: 160, height: 200 }}>
          {/* Front Side */}
          <Animated.View
            pointerEvents={flipped ? 'none' : 'auto'}
            style={[
              style.flipCard,
              {
                transform: [{ rotateY }],
                zIndex: 2,
                position: 'absolute',
              },
            ]}
          >
            <View style={style.front}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRumgrmKo4I3jGp3fb1ueofJlrl4b-yoofMxalNxhRK9uElyw3yHUtdqr6yCdPvDErHlM&usqp=CAU',
                }}
                style={style.profileImage}
              />
              <Text style={style.bodyText}>{username}</Text>
              <Text style={style.bodyText}>{email}</Text>
              <Text style={style.bodyText}>Favorite Genre: {genre}</Text>
            </View>
          </Animated.View>
          {/* Back Side */}
          <Animated.View
            pointerEvents={flipped ? 'auto' : 'none'}
            style={[
              style.flipCard,
              {
                transform: [
                  {
                    rotateY: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['180deg', '360deg'],
                    }),
                  },
                ],
                zIndex: 1,
                position: 'absolute',
              },
            ]}
          >
            <View style={style.back}>
              <View style={style.editCircle}>
                <Text style={style.pencil}>✏️</Text>
              </View>
              {/* Username Field with Shake */}
              <Animated.View
                style={{
                  transform: [
                    {
                      translateX: usernameShake.interpolate({
                        inputRange: [-1, 1],
                        outputRange: [-8, 8],
                      }),
                    },
                  ],
                }}
              >
                <TextInput
                  style={style.input}
                  value={username}
                  onChangeText={handleUsernameChange}
                  placeholder="Username"
                  placeholderTextColor="#aaa"
                  autoCapitalize="none"
                />
                {usernameError ? (
                  <Text style={style.errorText}>{usernameError}</Text>
                ) : null}
              </Animated.View>
              {/* Email Field with Shake */}
              <Animated.View
                style={{
                  transform: [
                    {
                      translateX: emailShake.interpolate({
                        inputRange: [-1, 1],
                        outputRange: [-8, 8],
                      }),
                    },
                  ],
                }}
              >
                <TextInput
                  style={style.input}
                  value={email}
                  onChangeText={handleEmailChange}
                  placeholder="Email"
                  placeholderTextColor="#aaa"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {emailError ? (
                  <Text style={style.errorText}>{emailError}</Text>
                ) : null}
              </Animated.View>
              {/* Genre Picker with Shake */}
              <Animated.View
                style={{
                  transform: [
                    {
                      translateX: genreShake.interpolate({
                        inputRange: [-1, 1],
                        outputRange: [-8, 8],
                      }),
                    },
                  ],
                }}
              >
                <View
                  style={{
                    width: 120,
                    marginTop: 8,
                    backgroundColor: '#222',
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#1db954',
                  }}
                >
                  <Picker
                    selectedValue={genre}
                    onValueChange={(val: string) => handleGenreChange(val)}
                    style={{ color: '#fff', width: '100%' }}
                    dropdownIconColor="#1db954"
                  >
                    <Picker.Item label="Select Genre..." value="" />
                    {genres.map(g => (
                      <Picker.Item key={g} label={g} value={g} />
                    ))}
                  </Picker>
                </View>
                {genreError ? (
                  <Text style={style.errorText}>{genreError}</Text>
                ) : null}
              </Animated.View>
              <TouchableOpacity style={style.saveBtn} onPress={handleSave}>
                <Text style={style.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
