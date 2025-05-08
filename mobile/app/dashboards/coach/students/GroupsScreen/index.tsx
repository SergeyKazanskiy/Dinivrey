import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { Badge, ListItem } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { useStore } from '../store';
import { StudentList } from './views/StudentList';
import { Icon } from '@rneui/themed';


export default function GroupsScreen() {
  const { groups, students, group_id } = useStore();
  const { loadGroups, selectGroup } = useStore();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadGroups(1);
    }, [])
  );

  return (
    <ScrollView style={styles.wrapper}> 
      {groups.map((group, index) => 
          <ListItem.Accordion key={index}
            containerStyle={styles.group}
            isExpanded={group.id === group_id}
            onPress={() => selectGroup(group.id)}
            icon={{}}
            content={
              <>
                <Icon name={group.id === group_id ? 'chevron-down' : 'chevron-right'}
                  type="material-community" color="white" style={{ marginRight: 10 }} />
                <ListItem.Content>
                  <ListItem.Title style={styles.title}>{group.name}</ListItem.Title>
                  <ListItem.Subtitle style={styles.subtitle}>{group.description}</ListItem.Subtitle>
                </ListItem.Content>
                <Badge value={students.length} status="primary" />
              </>
            }
          >
            <StudentList/>
          </ListItem.Accordion>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    padding: 16,
  },
  group: { backgroundColor: '4b5320', borderWidth: 1, borderColor: 'green' },
  title: { color: 'white', fontWeight: 'bold' },
  subtitle: { color: '#A7CFF5' },
});