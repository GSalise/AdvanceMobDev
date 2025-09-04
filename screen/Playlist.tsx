import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const playlistData = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    albumArt: require('../assets/The_Weeknd_-_Blinding_Lights.png'),
  },
  {
    id: '2',
    title: 'Gitara',
    artist: 'Parokya ni Edgar',
    albumArt: require('../assets/gitara.jpg'),
  },
//   {
//     id: '3',
//     title: 'Huling El Bimbo',
//     artist: 'Rivermaya',
//     albumArt: require('../assets/el\ bimbo'),
//   },
  // Add more songs as needed
];

export default function Playlist() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Spotify Playlist</Text>
      <FlatList
        data={playlistData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.songContainer}>
            <Image source={item.albumArt} style={styles.albumArt} />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songArtist}>{item.artist}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232323',
    borderRadius: 12,
    marginBottom: 16,
    padding: 10,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 14,
  },
  songInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  songArtist: {
    color: '#b3b3b3',
    fontSize: 14,
    marginTop: 4,
  },
});