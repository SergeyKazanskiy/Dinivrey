import { ListItem } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import { CompetitionCell } from '../../../../../shared/components/CompetitionCell';
import { formatDateTime } from '../../../../../shared/utils';
import { Icon } from '@rneui/themed';
import { DrillCell } from '../../../../../shared/components/DrillCell';


export function DrillsView() {
  const { drills } = useStore();
  const { attachDrill, detachDrill } = useStore();

  function handleCheck(present: boolean, drill_id: number) {
    if (present) {
      detachDrill(drill_id);
    } else {
      attachDrill(drill_id);
    }
  }

  return (
    <ScrollView>
      <FlatList data={drills}
        renderItem={({ item }) =>
          <DrillCell
            name={item.name}
            time={item.time}
            level={item.level}
            checked={item.present}
            onCheck={() => handleCheck(item.present, item.id)}
          />
        } style={styles.list}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    borderRadius: 10,
    padding: 12
  },
});