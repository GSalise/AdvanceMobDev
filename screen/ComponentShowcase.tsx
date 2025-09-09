import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const PRIMARY = '#1976d2';
const SURFACE = '#fff';
const CARD = '#f5f5f5';
const ON_PRIMARY = '#fff';
const ELEVATION = 4;

export default function ComponentShowcase() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const [isRhodes, setIsRhodes] = useState(true);

    const uri1 =  'https://static.wikia.nocookie.net/mrfz/images/c/c8/Rhodes_Island.png/revision/latest?cb=20210713014317'
    const uri2 = 'https://static.wikia.nocookie.net/mrfz/images/e/eb/Babel.png/revision/latest?cb=20210421013433'
    const text1 = "Rhodes Island"
    const text2 = "Babel"

    Sound.setCategory('Playback');
    const music = new Sound('fart.m4a', Sound.MAIN_BUNDLE, (error) => {
        if(error){
            console.log('Something went wrong', error);
            return;
        }
    });


    const changeImage = () => {
        setIsRhodes(prev => !prev);
        music.play((success) => {
            if (!success) {
            console.log('Playback failed');
            }
        });
    } 

    return (
        <View style={styles.root}>
            <View style={styles.topBar}>
                    <TouchableOpacity
                    style={styles.hamburger}
                    onPress={() => navigation.openDrawer()}
                    accessibilityLabel="Open drawer menu"
                    >
                    <View style={styles.bar} />
                    <View style={styles.bar} />
                    <View style={styles.bar} />
                    </TouchableOpacity>
                <Text style={styles.topBarTitle}>Component Showcase</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <View style={styles.figure}>
                        <Image style={styles.image_one} source={{uri: isRhodes ? uri1 : uri2}}/>
                        <Text style={styles.subtitle1}>{isRhodes ? text1 : text2}</Text>
                    </View>
                        <Button
                            onPress={changeImage}
                            title="Change!"
                            color={PRIMARY}
                        />

                </View>
                <View style={styles.card}>
                    <Text style={styles.title2}>Lorem Ipsum</Text>
                    <Text style={styles.bodyText}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                    <Text style={styles.title3}>Origin</Text>
                    <Text style={styles.bodyText}>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                        {"\n\n"}
                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: CARD,
    },
      hamburger: {
        position: 'absolute',
        top: 45,
        left: 20,
        zIndex: 10,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bar: {
        width: 24,
        height: 3,
        backgroundColor: '#fff',
        marginVertical: 2,
        borderRadius: 2,
    },
    topBar: {
        height: 96,
        backgroundColor: PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: ELEVATION,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    topBarTitle: {
        marginTop: 30,
        color: ON_PRIMARY,
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    scrollContent: {
        padding: 16,
    },
    card: {
        backgroundColor: SURFACE,
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        elevation: ELEVATION,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    figure: {
        alignItems: 'center',
        marginBottom: 16,
        position: 'relative',
    },
    image_one: {
        width: 260,
        height: 260,
        borderRadius: 16,
        marginBottom: 8,
        backgroundColor: '#e0e0e0',
    },
    subtitle1: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: PRIMARY,
        backgroundColor: 'rgba(255,255,255,0.85)',
        paddingVertical: 4,
        borderRadius: 8,
        marginHorizontal: 16,
        overflow: 'hidden',
    },
    materialButton: {
        backgroundColor: PRIMARY,
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 1,
    },
    materialButtonText: {
        color: ON_PRIMARY,
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: PRIMARY,
        marginBottom: 8,
    },
    title3: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY,
        marginTop: 24,
        marginBottom: 8,
    },
    bodyText: {
        fontSize: 15,
        color: '#333',
        marginBottom: 8,
        lineHeight: 22,
    },
});