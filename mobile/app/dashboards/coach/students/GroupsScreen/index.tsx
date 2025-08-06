import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { ListItem } from '@rneui/themed';
import { useAuthState } from '../../../../shared/http/state';
import { useStore } from '../store';
import { StudentList } from './views/StudentList';
import { Icon } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';


export default function GroupsScreen() {
  const { groups, students, group_id } = useStore();
  const { loadGroups, selectGroup } = useStore();

  const { userId } = useAuthState();

  useFocusEffect(
    useCallback(() => {
      loadGroups(userId);
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <ScrollView> 
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
                    <ListItem.Title style={styles.title}>{group.camp_name}, {group.name}</ListItem.Title>
                    <ListItem.Subtitle style={styles.subtitle}>{group.description}</ListItem.Subtitle>
                  </ListItem.Content>
                  {/* <Badge value={students.length} status="primary" /> */}
                </>
              }
            >
              <StudentList/>
            </ListItem.Accordion>
        )}
      </ScrollView>
    </LinearGradient>
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
  group: {
    backgroundColor: '#152B52',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'green',
    paddingVertical: 12,
    marginVertical: 3
  },
  title: { color: '#ddd', fontWeight: '500' },
  subtitle: { color: '#A7CFF5' },
});