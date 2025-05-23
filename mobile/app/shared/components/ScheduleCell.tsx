import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cellStyles } from '../styles/appStyles';
import { Button, CheckBox } from '@rneui/themed';


export interface ShortGroup {
  id: number;
  name: string;
}

export type Props = {
  time: string;
  desc: string;
  group1: ShortGroup;
  group2?: ShortGroup;
  checked: boolean;
  onCheck: () => void;
  onGroup:(id: number) => void;
};
  
export const ScheduleCell: React.FC<Props> = ({time, desc, group1, group2, checked, onGroup, onCheck}) => {
  return (
    <View style={styles.container}>
      <View  style={[styles.column, {width: '20%', borderRightWidth: 1, borderColor:'rgb(110, 151, 6)', alignItems: 'center'}]}>
        <Text style={styles.icon}>🏆</Text>
        <Text style={[cellStyles.type, {marginTop: 4}]}>Game</Text>
      </View>

      <View style={[styles.column, {width: '80%', paddingLeft: 8}]}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button title={group1.name} type='outline' 
              buttonStyle={styles.button} titleStyle={styles.title}
              onPress={() => onGroup(group1.id)}
            />
            {group2 && <Button title={group2.name} type='outline' 
              buttonStyle={styles.button} titleStyle={styles.title}
              onPress={() => onGroup(group2.id)}
            />}
          </View>
          
          <CheckBox checked={checked}
            onPress={onCheck}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            containerStyle={{margin:0, padding: 0, backgroundColor: 'rgba(45, 75, 10, 0.3)'}}
            checkedColor='#ddd'
          />
        </View>

        <View style={styles.header}>
          <Text style={[cellStyles.description, {marginTop: 7}]}>{desc}</Text>
          <Text style={[cellStyles.date, {marginTop: 7}]}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 10,
    paddingLeft: 0,
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 4
  },
  column: {
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    paddingTop: 1,
    fontSize: 24,
  },
  desc: {
    flexDirection: 'row',
  },
  button: {
    height: 28,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    color: 'gold'
  },
});

