import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Achieve, Achievement } from '../../model';
import { AchieveIcon } from '../../../../shared/components/AchieveIcon';


export type Props = {
    achieves: Achieve[] | Achievement[];
    onClick: (id: number) => void;
};

export const AchievesPanel: React.FC<Props> = ({ achieves, onClick }) => {  
    return (
        <View style={styles.container}>
            {achieves.length === 0 && <Text style={styles.emptyLabel}>No achievements</Text>}
            {achieves.length > 0 &&
                <ScrollView contentContainerStyle={styles.section}>
                    {achieves.map((item) => {
                        const level = "level" in item ? item.level : 1;

                        return (
                            <AchieveIcon key={item.id}
                                onClick={() => onClick(item.id)}
                                size={78}
                                image={item.image}
                                label={item.name}
                                level={level}
                                effect={item.effect}
                            />
                        );
                    })}
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
