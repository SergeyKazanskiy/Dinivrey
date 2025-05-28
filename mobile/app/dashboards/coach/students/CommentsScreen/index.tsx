import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Platform} from 'react-native';
import { useStore } from '../store';
import { CommentsView } from './views/CommentsView';
import { LinearGradient } from 'expo-linear-gradient';


export default function CommentsScreen() {
  const { loadComments } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadComments();
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <CommentsView/>
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
});