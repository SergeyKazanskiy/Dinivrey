import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widgetStyles } from '../../../../shared/styles/appStyles';


export const GroupField = () => {
  return (
    <TouchableOpacity style={styles.container}>
        <Text style={widgetStyles.title}>+ Select group</Text>
    </TouchableOpacity>
  )}

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5F6B47',
        borderRadius: 8,
        padding: 11,
        alignItems: 'center',
        marginBottom: 12
    },
});

