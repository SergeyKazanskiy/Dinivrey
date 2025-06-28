import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { Button } from '@rneui/themed';
import { useStore } from '../../store';
import { ImagesPath } from '../../../../../shared/constants';
import { SelectedField, Option } from '../../../../../shared/components/SelectedField';


export const InfoView = () => {
    const { group, coaches, coach_inx } = useStore();
    const { updateGroup, selectCoache } = useStore();

    const coachesNames: Option[] = coaches.map(el => ({"id": el.id, "name": el.first_name + ' ' +  el.last_name }));

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(group.name);
        setDescription(group.description ? group.description : '');
    }, [group]);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Group name: </Text>
                <TextInput style={styles.value} keyboardType='name-phone-pad' maxLength={20} placeholder="Enter"
                    value={name}
                    onChangeText={setName}
                    onBlur={() => updateGroup(name, description)}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Group coach:</Text>
                <SelectedField data={coachesNames} selectedIndex={coach_inx} onSelect={selectCoache}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    section: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 4,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 8,
    },
    label: {
        width: 150,
        color: '#ccc',
        fontSize: 17,
        marginRight: 8,
        paddingVertical: 8
    },
    value: {
        color: '#444',
        fontSize: 16,
        paddingHorizontal: 12,
        //marginBottom: 4,
        width: '100%',
        borderRadius: 8,
        backgroundColor: 'rgb(180, 216, 158)',
        minHeight: 30,
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

