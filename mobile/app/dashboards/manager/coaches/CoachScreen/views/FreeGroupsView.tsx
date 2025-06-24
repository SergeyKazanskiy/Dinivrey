import { StyleSheet, FlatList, Platform, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useStore } from '../../store';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper } from '../../../../../shared/components/ScreenWrapper';
import { cellStyles } from '../../../../../shared/styles/appStyles';


export function FreeGroupsView() {
    const { isFreeGroups, freeGroups } = useStore();
    const { addGroup, closeFreeGroups } = useStore();

    return (
        <ScreenWrapper visible={isFreeGroups} title='Select group' onClose={closeFreeGroups}>
            <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
                <ScrollView>
                    <FlatList data={freeGroups}
                        renderItem={({ item }) =>
                            <TouchableOpacity key={item.id} style={styles.group}
                                onPress={() => addGroup(item.id)}>
                    
                                <Text style={styles.title}>{item.camp_name}, {item.name}</Text>
                                <Text style={cellStyles.description}>{item.desc}</Text>
                            </TouchableOpacity>
                        } style={styles.list}
                    />
                </ScrollView>   
            </LinearGradient>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    height: '100%',
  },
  group: {
    backgroundColor: '#152B52',
    borderWidth: 1,
    borderColor: 'green',
    marginVertical: 3,
    padding: 10,
    borderRadius: 4
  },
  title: {
    color: '#ddd',
    fontWeight: '500',
    fontSize: 16,
    paddingBottom: 8
  },
  list: {
    padding: 16
  }
});