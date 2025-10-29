import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox } from '../../../../../shared/components/CustomCheckBox'
import { useStore } from '../../store';
import { eventTypes } from '../../../../../shared/constants';


type TypeProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

const FilterCheckBox: React.FC<TypeProps> = ({ label, checked, onPress }) => (
  <TouchableOpacity style={styles.section} onPress={onPress}>
    <CheckBox
      checked={checked}
      iconType="material-community"
      checkedIcon="checkbox-outline"
      uncheckedIcon={'checkbox-blank-outline'}
      containerStyle={{margin:0, padding: 0, backgroundColor: 'rgba(45, 75, 10, 0.3)'}}
      checkedColor='#ddd'
      size={18}
    />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

export const TypesView: React.FC = () => {
  const { isGame, isTest, isTraning, setIsGame, setIsTest, setIsTraning } = useStore();

  return (
    <View style={styles.container}>
      <Text style={styles.type}>Type: </Text>
      <FilterCheckBox label={eventTypes[0]} checked={isGame} onPress={setIsGame} />
      <FilterCheckBox label={eventTypes[1]} checked={isTest} onPress={setIsTest} />
      <FilterCheckBox label={eventTypes[2]} checked={isTraning} onPress={setIsTraning} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  label: {
    fontSize: 15,
    color: 'gold', 
    marginLeft: -8,
    marginRight: 4
  },
  type:{
    fontSize: 16,
    color: '#eee', 
  },
});
