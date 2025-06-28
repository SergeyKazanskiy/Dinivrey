import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export type Props = {
  first_name: string;
  last_name: string;
  camp_name: string;
  onSelect: () => void;
};
  
export const CoachCell: React.FC<Props> = ({first_name, last_name, camp_name, onSelect}) => {
  return (
    <TouchableOpacity style={[styles.container, styles.section]} onPress={onSelect}>
      <Text style={[styles.text]}>
        {first_name} {last_name}
      </Text>
      <Text style={[styles.camp]}>
        {camp_name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 14,
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    marginVertical: 3
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#ddd',
    fontWeight: '400',
    fontSize: 16
  },
  camp: {
    color: '#A7CFF5',
   // fontWeight: '400',
    fontSize: 16
  }
});


