import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addTracks, setUpPlayer } from '../musicPlayerService';
import Player from './screens/Player';

export default function App() {

  const [isPlayerReady,setIsPlayerReady] = useState<boolean>(false);

  async function setup() {
    let isSetup = await setUpPlayer();

    if(isSetup){
      await addTracks();
    }

    setIsPlayerReady(isSetup);
  }

  useEffect(()=> {
    setup();
  },[])

  if (!isPlayerReady){
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    )
  }

  return (
    <View>
      <Text>App</Text>
      <Player />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
})