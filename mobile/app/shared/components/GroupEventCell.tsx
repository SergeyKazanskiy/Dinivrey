import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cellStyles } from '../styles/appStyles';


export type Props = {
  type: string;
  datetime: string;
  desc: string;
  amount: number
};
  
export const GroupEventCell: React.FC<Props> = ({type, datetime, desc, amount}) => {
  return (
    <View style={styles.container}>
      <View  style={[styles.section]}>
        {type === 'Training' && <Text style={styles.icon}>❤️</Text>}
        {type === 'Exam' && <Text style={styles.icon}>🧭</Text>}
        {type === 'Game' && <Text style={styles.icon}>🏆</Text>}
        <Text style={[styles.title]}>{type}</Text>

        <View style={{ marginLeft: 'auto' }}>
          <Text style={[cellStyles.date]}>{datetime}</Text>
        </View>
      </View>

      <View  style={[styles.section]}>
        <Text style={[styles.amount]}>{amount} ppl</Text>
        <Text style={[cellStyles.description, {marginTop: 4, paddingLeft: 4}]}>{desc}</Text>
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
    marginBottom: 4
  },
  column: {
    flexDirection: 'column',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  icon: {
    paddingLeft: 12,
    fontSize: 20,
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
    color: 'gold',
    paddingHorizontal: 16
  },
  amount: {
    fontSize: 15,
    color: '#ddd',
    paddingLeft: 8,
    paddingRight: 4,
    paddingTop: 4
  },
});

