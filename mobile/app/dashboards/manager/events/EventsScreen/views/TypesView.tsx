import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { useStore } from '../../store';
import { eventTypes } from '../../../../../shared/constants';


type TypeProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

const FilterCheckBox: React.FC<TypeProps> = ({ label, checked, onPress }) => (
  <View style={styles.section}>
    <CheckBox
      containerStyle={{padding: 0, margin: 0}}
      checked={checked}
      onPress={onPress}
      size={18}
    />
    <Text style={styles.label}>{label}</Text>
  </View>
);

export const TypesView: React.FC = () => {
  const { isGame, isTest, isTraning, setIsGame, setIsTest, setIsTraning } = useStore();

  return (
    <View style={styles.container}>
      <FilterCheckBox label={eventTypes[0]} checked={isGame} onPress={setIsGame} />
      <FilterCheckBox label={eventTypes[1]} checked={isTest} onPress={setIsTest} />
      <FilterCheckBox label={eventTypes[2]} checked={isTraning} onPress={setIsTraning} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB', // gray.300
    paddingHorizontal: 12,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  label: {
    fontSize: 15,
    color: '#3B82F6', // blue.500
    paddingRight: 12,
  },
});
