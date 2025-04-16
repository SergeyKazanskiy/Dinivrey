import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import {GamesList} from './views/GamesList';
import { screenStyles, widgetStyles } from '../../../shared/styles/appStyles';


export default function GamesScreen() {
  const router = useRouter()

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Image style={styles.image} source={require('../../../../assets/images/Calendar.png')}/>
        <GamesList onClick={() => router.push('/dashboards/student/GamesScreen/GameScreen')}/>
      </View>
      <Text style={[screenStyles.summary, styles.summary]}>In most cases you win !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#1A1C21',
    padding: 16,
    paddingTop: 0,
    height: '100%'
  },
  container: {
    flex: 1,
    alignContent: 'space-between'
  },
  image: {
    width: 320,
    resizeMode: 'contain'
  },
  summary: {
    textAlign: 'center',
    paddingTop: 26,
    paddingBottom: 10
  }
});

/*
<Text style={styles.title}>Stack Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => router.push('/student/details')}
      />
      */