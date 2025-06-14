import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView, Platform, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



export default function EventsScreen() {


  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
        <ScrollView> 
            <Text>EventsScreen</Text>
        </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    paddingHorizontal: 16,
  },
  title: {   
    paddingTop: 60,
    alignSelf:'center'
  },
});