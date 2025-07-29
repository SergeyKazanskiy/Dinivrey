import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cellStyles } from '../../../../shared/styles/appStyles';
import { Button } from '@rneui/themed';


export type Props = {
  date: string;
  time: string;
  desc: string;
  group1: string;
  group2?: string;
};
  
export const CompetitionCell: React.FC<Props> = ({date, time, desc, group1, group2}) => {
  return (
    <View style={styles.container}>
      <View  style={[styles.column, {width: '20%', borderRightWidth: 1, borderColor:'rgb(110, 151, 6)', alignItems: 'center'}]}>
        <Text style={styles.icon}>🏆</Text>
        <Text style={[cellStyles.type, {marginTop: 4}]}>Game</Text>
      </View>

      <View style={[styles.column, {width: '80%', paddingLeft: 8}]}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button
              title={group1}
              type='outline' 
              buttonStyle={styles.button}
              titleStyle={styles.title}
            />

            {group2 &&
              <Button
                title={group2}
                type='outline' 
                buttonStyle={styles.button}
                titleStyle={styles.title}
              />
            }
          </View>
          
          <Text style={{color: '#eee', fontSize: 15}}>{date}</Text>
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

