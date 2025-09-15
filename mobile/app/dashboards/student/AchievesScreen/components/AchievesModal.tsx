import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Achievement } from '../../model';
import { AchieveIcon } from '../../../../shared/components/AchieveIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ChangeButton } from './ChangeButton';


export type Props = {
    profile_place: number;
    profileAchieves: Achievement[];
    achieves: Achievement[];
    onPlace: (profile_place: number) => void;
    onAchievement: (id: number) => void;
};

export const AchievesModal: React.FC<Props> = ({ profile_place, profileAchieves, achieves, onPlace, onAchievement }) => {  
    const achievement1 = profileAchieves.find(el => el.profile_place === 1);
    const achievement2 = profileAchieves.find(el => el.profile_place === 2);
    const achievement3 = profileAchieves.find(el => el.profile_place === 3);

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <TouchableOpacity onPress={() => onPlace(1)} style={{alignItems: 'center'}}>
                    {achievement1 ? <AchieveIcon onClick={() => onPlace(1)}
                            size={68}
                            image={achievement1.image}
                            label={''}
                            level={achievement1.level}
                            effect={achievement1.effect}
                        /> : <Ionicons name="add" size={32} color="white" style={{paddingVertical: 20}} />}
                    <ChangeButton isSelected={profile_place === 1}/>    
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPlace(2)} style={{alignItems: 'center'}}>
                    {achievement2 ? <AchieveIcon onClick={() => onPlace(2)}
                            size={68}
                            image={achievement2.image}
                            label={''}
                            level={achievement2.level}
                            effect={achievement2.effect}
                        /> : <Ionicons name="add" size={32} color="white" style={{paddingVertical: 20}}/>}
                    <ChangeButton isSelected={profile_place === 2}/>    
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPlace(3)}  style={{alignItems: 'center'}}>
                    {achievement3 ? <AchieveIcon onClick={() => onPlace(3)}
                            size={68}
                            image={achievement3.image}
                            label={''}
                            level={achievement3.level}
                            effect={achievement3.effect}
                        /> : <Ionicons name="add" size={32} color="white" style={{paddingVertical: 20}} />}
                    <ChangeButton isSelected={profile_place === 3}/>    
                </TouchableOpacity>
            </View>

            {achieves.length === 0 && <Text style={styles.emptyLabel}>No achievements</Text>}
            {achieves.length > 0 &&
                <ScrollView contentContainerStyle={styles.section}>
                    {achieves.map((item, index) => (

                        <AchieveIcon onClick={() => onAchievement(item.id)}
                            size={68}
                            image={item.image}
                            label={item.name}
                            level={item.level}
                            effect={item.effect}
                        />
                    ))}
                </ScrollView>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    section: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        padding: 8,
    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#444',
        borderBottomWidth: 2,
        padding: 12,
        marginBottom: 4
    },
    icon: {
        backgroundColor: 'red',
    },
    emptyLabel: {
        paddingTop: 80,
        color: '#ddd',
        fontSize: 16,
        alignSelf: 'center'
    },
});
