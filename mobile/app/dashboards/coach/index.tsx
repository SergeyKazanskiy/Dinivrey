import { View, StyleSheet, Platform } from 'react-native';
import { Tab, Text } from '@rneui/themed';
import { useState } from 'react';
import EventsScreen from './events/EventsScreen';
import GroupsScreen from './students/GroupsScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';


export default function CoachLayout() {
  const [index, setIndex] = useState(0);

  return ( 
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >

      <Tab value={index} indicatorStyle={styles.indicator} variant="primary"
        onChange={setIndex} >
        <Tab.Item style={styles.tab}>
          <Text style={styles.label}>Students</Text>
        </Tab.Item>
        <Tab.Item style={styles.tab}>
          <Text style={styles.label}>Events</Text>
        </Tab.Item>
      </Tab>

      <View style={styles.content}>
        {index === 0 && <GroupsScreen />}
        {index === 1 && <EventsScreen />}
      </View>
      
    </LinearGradient>
   
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    backgroundColor: '#fff',
  },
  indicator: { backgroundColor: '#c2ff00', height: 4 },
  tab: { backgroundColor: '#152B52' },
  label: { marginLeft: 8, color: '#ddd', fontSize: 16, padding: 6 },
  content: { flex: 1 },
});

