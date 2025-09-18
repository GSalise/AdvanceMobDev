import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = 'user_profile';

const GENRES = ['Pop', 'Rock', 'Jazz', 'Classical', 'Hip-Hop'];

export async function saveProfile(profile: {
  username: string;
  email: string;
  genre: string;
}) {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export async function loadProfile() {
  const data = await AsyncStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : { username: '', email: '' };
}

export function validateUsername(value: string) {
  return /^[a-zA-Z0-9_]{3,20}$/.test(value);
}

export function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateGenre(value: string) {
  return GENRES.includes(value);
}

export { GENRES };
