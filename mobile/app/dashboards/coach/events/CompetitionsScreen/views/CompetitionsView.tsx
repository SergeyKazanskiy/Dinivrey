import { ListItem } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import { CompetitionCell } from '../../../../../shared/components/CompetitionCell';
import { formatDateTime } from '../../../../../shared/utils';
import { Icon } from '@rneui/themed';


export function CompetitionsView() {
  const { competitions, groups } = useStore();

  return (
    <ScrollView>
      <FlatList data={competitions} contentContainerStyle={{paddingBottom: 24}}
        renderItem={({ item }) =>
          <CompetitionCell
            date={formatDateTime(item.timestamp).date}  
            time={formatDateTime(item.timestamp).time}
            desc={item.desc}
            group1={groups.find(el => el.id === item.group1_id)!}
            onGroup={(group_id) => {}}
            group2={groups.find(el => el.id === item.group2_id)}
          />
        } style={styles.list}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  group: {
    backgroundColor: '#152B52',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'green',
    marginVertical: 3
  },
  title: { color: '#ddd', fontWeight: '500', fontSize: 16 },
  list: { borderRadius: 10 },
});