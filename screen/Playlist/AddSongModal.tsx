import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';

export default function AddSongModal({
  visible,
  onClose,
  onAddSong, // <-- add this prop
}: {
  visible: boolean;
  onClose: () => void;
  onAddSong: (song: {
    id: string;
    title: string;
    artist: string;
    albumArt: any;
  }) => void; // <-- updated prop type to include albumArt
}) {
  const [songName, setSongName] = useState('');
  const [artist, setArtist] = useState('');

  function handleAdd() {
    if (songName.trim() && artist.trim()) {
      onAddSong({
        id: Date.now().toString(), // simple unique id
        title: songName,
        artist,
        albumArt: require('../../assets/thumbnail_default.jpg'), // <-- add this line
      });
      setSongName('');
      setArtist('');
    }
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 300,
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>
            Add Song
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Song Name"
            placeholderTextColor={'#bdbdbdff'}
            value={songName}
            onChangeText={setSongName}
          />
          <TextInput
            style={styles.input}
            placeholder="Artist"
            placeholderTextColor={'#bdbdbdff'}
            value={artist}
            onChangeText={setArtist}
          />
          <View style={styles.inputBtns}>
            <TouchableOpacity
              onPress={onClose}
              style={{ marginTop: 20, alignSelf: 'flex-end' }}
            >
              <Text style={{ color: '#b91d1dff', fontWeight: 'bold' }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAdd}
              style={{ marginTop: 20, alignSelf: 'flex-end', marginLeft: 10 }}
            >
              <Text style={{ color: '#1db954', fontWeight: 'bold' }}>
                Add Song
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  inputBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
