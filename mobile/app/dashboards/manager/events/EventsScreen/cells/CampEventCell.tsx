import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cellStyles } from '../../../../../shared/styles/appStyles';
import { Button } from '../../../../../shared/components/CustomButton';
import { Group } from '../../../../coach/students/model';


export type Props = {
  type: string;
  date: string;
  time1: string;
  time2: string;
  desc: string;
  group1: Group;
  onGroup:(id: number, group_number: number) => void;
  group2?: Group;
};
  
export const CampEventCell: React.FC<Props> = ({type, date, time1, time2, desc, group1, onGroup, group2}) => {
  return (
    <View style={styles.container}>
      <View  style={[styles.column, {width: '20%', borderRightWidth: 1, borderColor:'rgb(110, 151, 6)', alignItems: 'center'}]}>
        {type === 'Training' && <Text style={styles.icon}>❤️</Text>}
        {type === 'Exam' && <Text style={styles.icon}>🧭</Text>}
        {type === 'Game' && <Text style={styles.icon}>🏆</Text>}
        <Text style={[cellStyles.type, {marginTop: 4}]}>{type}</Text>
      </View>

      <View style={[styles.column, {width: '80%', paddingLeft: 8}]}>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button title={group1.name} type='outline' 
              buttonStyle={styles.button} titleStyle={styles.title}
              onPress={() => onGroup(group1.id, 1)}
            />
            {group2 && <Button title={group2.name} type='outline' 
              buttonStyle={styles.button} titleStyle={styles.title}
              onPress={() => onGroup(group2.id, 2)}
            />}
          </View>
          
          <Text style={[styles.date, {paddingRight: 4, marginTop: 4}]}>{date}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[cellStyles.description, {marginTop: 8}]}>{desc}</Text>
          <Text style={[cellStyles.date, {paddingRight: 4, marginTop: 8}]}>{time1 + '-' + time2}</Text>
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
  section: {
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
  date: {
    fontSize: 16,
    color: '#F4A460',
    fontWeight: '400'
  },
});

