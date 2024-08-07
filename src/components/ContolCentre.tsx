import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ControlCentre = () => {
  const {state} = usePlaybackState();

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlayback = async () => {
    const currentTrack = await TrackPlayer.getActiveTrack();

    if (currentTrack !== null) {
      if (state === State.Paused || state === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.button} onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>
      <Pressable style={styles.playButton} onPress={togglePlayback}>
        <Icon
          style={styles.icon}
          name={state === State.Playing ? "pause" : "play-arrow"}
          size={75}
        />
      </Pressable>
      <Pressable style={styles.button} onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </SafeAreaView>
  );
};

export default ControlCentre;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  button: {
    paddingHorizontal: 20,
  },
  playButton: {
    marginHorizontal: 24,
  },
  icon: {
    color: '#FFFFFF',
  },
});
