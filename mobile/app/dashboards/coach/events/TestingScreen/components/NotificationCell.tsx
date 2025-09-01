import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Achieve } from '../../model';
import { Icon } from '@rneui/themed';


export type Props = {
  first_name: string;
  second_name: string;
  added: number;
  updated: number;
  achievements: Achieve[];
  error_message?: string;
};
  
export const NotificationCell: React.FC<Props> =
  ({first_name, second_name, added, updated, achievements, error_message}) => {

  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.section} onPress={() => setExpanded(!expanded)}>
          <View style={styles.row}>
            <Icon name={expanded ? 'chevron-down' : 'chevron-right'}
              type="material-community" color="white" style={{ marginLeft: 4 }}/>

            <Text style={styles.name}>{first_name + ' ' + second_name}</Text>
          </View>

          <Icon name={error_message ? "close-box-outline" : 'checkbox-marked-outline'} style={{marginRight: 6}}
            type="material-community" size={20} color={error_message ? 'red' : 'green'}/>
        </TouchableOpacity>

        {!expanded && 
          <View style={styles.row}>
            <Text style={styles.title}>Achievements</Text>
            <Text style={styles.label}>added:</Text>
            <Text style={styles.value}>{added}</Text>
            <Text style={styles.label}>updated:</Text>
            <Text style={styles.value}>{updated}</Text>
          </View>
        }

        {expanded && <>
          {achievements.map((item) => (
            <View style={{marginBottom: 6}}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.isNew ? 'Added' : 'Updated'}</Text>
                <Text style={styles.achieve}>{item.name + ' (' + item.level + ') '}</Text>
              </View>
              <Text style={styles.desc}>{item.rule}</Text>
            </View>
          ))}
        </> }

        {expanded && error_message &&
          <View style={styles.section}>
            <Text style={styles.error}>{error_message}</Text>
          </View>
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
    borderRadius: 8,
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    paddingVertical: 6,
    marginTop: 6,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 16,
    color: '#AFEEEE',//AFEEEE
    paddingHorizontal: 4,
    paddingTop: 2,
    paddingBottom: 8,
    fontWeight: '400'
  },
  title: {
    fontSize: 15,
    color: '#eee',
    paddingHorizontal: 12,
  },
  achieve: {
    fontSize: 15,
    color: 'gold',
  },
  label: {
    fontSize: 15,
    color: '#eee',
  },
  value: {
    fontSize: 15,
    //fontWeight: '400', F29F56
    color: '#DEB887',
    paddingLeft: 4,
    marginRight: 8
  },
  desc: {
    fontSize: 12,
    color: '#A7CFF5',
    paddingLeft: 12,
    paddingVertical: 4
  },
  error: {
    fontSize: 14,
    color: 'red',
    paddingHorizontal: 10,
    paddingVertical: 4
  },
});


