import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Alert } from 'react-native';
import { useStore } from '../../store';
import { AchieveIcon } from '../../../../shared/components/AchieveIcon';
import { Ionicons } from '@expo/vector-icons';


export type Props = {
    onClick: (id: number) => void;
    onAddClick: () => void;
};

export const AchievesView: React.FC<Props> = ({ onClick, onAddClick }) => {
    const { profile_achievements } = useStore();

    return (
        <FlatList
            data={[
                ...profile_achievements,
                ...(profile_achievements.length < 3 ? [{ id: 'add' }] : [])
            ]}
            horizontal
            keyExtractor={(item, index) => item.id.toString() + index}
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
                const totalItems = profile_achievements.length < 3
                    ? profile_achievements.length + 1
                    : profile_achievements.length;

                let iconSize = 80;
                if (totalItems === 1) {
                    iconSize = 120;
                } else if (totalItems === 2) {
                    iconSize = 100;
                } else if (totalItems === 3) {
                    iconSize = index === 1 ? 100 : 80;
                }

                const isAddButton = item.id === 'add';

                if (isAddButton) {
                    return (
                        <TouchableOpacity onPress={onAddClick} 
                            style={{ marginHorizontal: 8, width: iconSize, height: iconSize,
                                alignItems: 'center', justifyContent: 'center', paddingBottom: 24 }}
                        >
                            <View style={{ width: iconSize / 2, height: iconSize / 2,
                                borderRadius: iconSize / 4, backgroundColor: '#CCC',
                                alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Ionicons name="add" size={iconSize * 0.4} color="black" />
                            </View>
                        </TouchableOpacity>
                    );
                } else {
                    return (
                        <AchieveIcon onClick={() => onClick(item.id)}
                            size={iconSize}
                            image={item.image}
                            label={item.name}
                            level={item.level}
                            effect={item.effect}
                            isGif={true}
                        />
                    );
                }
           }}
        />
    );
};

//<View style={[ styles.section]}>
const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    section: {
        height: 100,
        borderRadius: 10,
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    icon: {
        backgroundColor: 'red',
    },
    image: {
        //margin: 4,
        height: 80,
        width: 80,
        margin: 10,
        borderRadius: 40
    },
    iconContainer: {
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 50,
        padding: 10,
        margin: 18,
    },
});
