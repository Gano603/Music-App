import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SongsInfo from '../components/SongsInfo'
import TrackPlayer, { Event, Track, useTrackPlayerEvents } from 'react-native-track-player';
import ContolCentre from '../components/ContolCentre';
import { playListData } from '../constants';
import SongSlider from '../components/Slider';

const { width } = Dimensions.get('window');

export default function Player() {

    const [track, setTrack] = useState<Track | undefined>(playListData[0]);

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
        if (event.type === Event.PlaybackActiveTrackChanged) {
            const playingTrack = await TrackPlayer.getTrack((event.index as any) + 1);
            setTrack(playingTrack);
            await TrackPlayer.play();

        }
    });

    const renderArtWork = ({ item }: any) => {
        return (
            <View style={styles.listArtWrapper}>
                <View style={styles.albumContainer}>
                    {item.artwork && (
                        <Image style={styles.albumArtImg} source={{ uri: item.artwork.toString() }} />
                    )}
                </View>
            </View>
        );
    };

    return (
        <View>
            <FlatList
                horizontal
                data={playListData}
                renderItem={renderArtWork}
                keyExtractor={(song) => song.id.toString()}
            />


            <SongsInfo track={track} />
            <SongSlider />
            <ContolCentre />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001d23',
    },
    listArtWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    albumContainer: {
        width: 300,
        height: 300,
    },
    albumArtImg: {
        height: '100%',
        borderRadius: 4,
    },
    text: {
        color: 'white',
        fontSize: 18,
        marginVertical: 10,
    },
})