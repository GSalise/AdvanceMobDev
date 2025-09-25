import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import AddSongModal from './AddSongModal';
import { renderRightActions } from './Playlist_logic';
import getStyles from './Playlist.styles'; // <-- import the function, not object
import { getPlaylist, addSong, updateSong, deleteSong } from './Playlist_logic';
import { useTheme } from '../../context/ThemeContext';
import { lightTheme, darkTheme } from '../../theme';

export default function Playlist() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [playlistData, setPlaylistData] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [undoStack, setUndoStack] = useState<any[][]>([]);
  const [redoStack, setRedoStack] = useState<any[][]>([]);
  const { theme } = useTheme();
  const themeObj = theme === 'dark' ? darkTheme : lightTheme;

  const styles = getStyles(themeObj); // <-- get styles with theme

  useEffect(() => {
    loadPlaylist();
  }, []);

  async function loadPlaylist() {
    const data = await getPlaylist();
    setPlaylistData(data);
  }

  async function handleAddSong(song: {
    id: string;
    title: string;
    artist: string;
    albumArt: any; // <-- add this
  }) {
    setUndoStack(prev => [...prev, playlistData]);
    setRedoStack([]); // clear redo on new action
    await addSong(song);
    await loadPlaylist();
    setModalVisible(false);
  }

  async function handleDeleteSong(id: string) {
    setUndoStack(prev => [...prev, playlistData]);
    setRedoStack([]);
    await deleteSong(id);
    await loadPlaylist();
  }

  function handleUndo() {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setUndoStack(stack => stack.slice(0, -1));
    setRedoStack(stack => [...stack, playlistData]);
    setPlaylistData(prev);
    // savePlaylist(prev); // persist
  }

  function handleRedo() {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack(stack => stack.slice(0, -1));
    setUndoStack(stack => [...stack, playlistData]);
    setPlaylistData(next);
    // savePlaylist(next); // persist
  }

  // Example dropdown actions
  const dropdownActions = [
    {
      label: 'Add Song',
      onPress: () => {
        setModalVisible(true);
        setDropdownOpen(false);
      },
    },
    {
      label: 'Redo Actions',
      onPress: () => {
        handleRedo();
        setDropdownOpen(false);
      },
    },
    {
      label: 'Undo Actions',
      onPress: () => {
        handleUndo();
        setDropdownOpen(false);
      },
    },
  ];

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
        <Text style={styles.header}>My Spotify Playlist</Text>
      </View>

      <FlatList
        data={playlistData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={progress =>
              renderRightActions(progress, () => handleDeleteSong(item.id))
            }
            rightThreshold={60}
            friction={2}
          >
            <TouchableOpacity style={styles.songContainer}>
              <Image
                source={require('../../assets/thumbnail_default.jpg')}
                style={styles.albumArt}
              />
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{item.title}</Text>
                <Text style={styles.songArtist}>{item.artist}</Text>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Dropdown FAB */}
      <View style={styles.dropdownContainer}>
        {dropdownOpen && (
          <View style={styles.dropdownMenu}>
            {dropdownActions.map((action, idx) => (
              <TouchableOpacity
                key={action.label}
                style={[styles.dropdownItem, { bottom: 70 + idx * 50 }]}
                onPress={action.onPress}
              >
                <Text style={styles.dropdownLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity
          style={styles.addSong}
          onPress={() => setDropdownOpen(open => !open)}
        >
          <Text style={styles.add}>{dropdownOpen ? '×' : '+'}</Text>
        </TouchableOpacity>
      </View>

      {/* AddSongModal */}
      <AddSongModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddSong={handleAddSong}
      />
    </View>
  );
}
