import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

  
export type Props = {
  isGroups: boolean;
  onGroups: () => void;
  onEvents: () => void;
};

export const DinivreyHeader: React.FC<Props> = ({isGroups, onGroups, onEvents}) => {
  return (
    <View style={styles.cell}>
      <TouchableOpacity onPress={onGroups} style={{paddingTop: 6}}>
        <Ionicons name='people' size={24} color={isGroups ? '#E4FF3E' : '#888888'}/>
      </TouchableOpacity>
       
      <Text style={styles.title}>DINIVREY</Text>

      <TouchableOpacity onPress={onEvents} style={{paddingTop: 6}}>
        <Ionicons name='document-text-outline' size={24} color={!isGroups ? '#E4FF3E' : '#888888'}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flexDirection:'row',
    justifyContent: 'space-around',
    backgroundColor: '#152B52',
    paddingVertical: 2
  },
  title: {
    fontWeight: '600',
    fontSize: 28,
    color: '#c2ff00',
    paddingVertical: 3
  }
});

