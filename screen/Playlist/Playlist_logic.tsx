import React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PLAYLIST_KEY = 'user_playlist';

export function renderRightActions(progress: any, onDelete: () => void) {
  return (
    <View
      style={{
        backgroundColor: '#ff5252',
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 12,
        marginBottom: 16,
        paddingHorizontal: 20,
        flex: 1,
      }}
    >
      <Text style={{ color: '#fff', fontWeight: 'bold' }} onPress={onDelete}>
        Delete
      </Text>
    </View>
  );
}

export async function getPlaylist() {
  const data = await AsyncStorage.getItem(PLAYLIST_KEY);
  return data ? JSON.parse(data) : [];
}

export async function savePlaylist(playlist: any[]) {
  await AsyncStorage.setItem(PLAYLIST_KEY, JSON.stringify(playlist));
}

export async function addSong(song: any) {
  const playlist = await getPlaylist();
  playlist.push(song);
  await savePlaylist(playlist);
}

export async function updateSong(id: string, updatedSong: any) {
  let playlist = await getPlaylist();
  playlist = playlist.map((song: any) => (song.id === id ? updatedSong : song));
  await savePlaylist(playlist);
}

export async function deleteSong(id: string) {
  let playlist = await getPlaylist();
  playlist = playlist.filter((song: any) => song.id !== id);
  await savePlaylist(playlist);
}
