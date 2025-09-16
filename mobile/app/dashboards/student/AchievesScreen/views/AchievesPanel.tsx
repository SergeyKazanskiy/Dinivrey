import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Achieve, Achievement } from '../../model';
import { AchieveIcon } from '../components/AchieveIcon';


export type Props = {
    isUnlocked: boolean;
    achieves: Achieve[] | Achievement[];
    onClick: (id: number) => void;
};

export const AchievesPanel: React.FC<Props> = ({ isUnlocked, achieves, onClick }) => {  
    return (
        <View style={styles.container}>
            {achieves.length === 0 && <Text style={styles.emptyLabel}>No achievements</Text>}
            {achieves.length > 0 &&
                <View style={styles.section}>
                    {achieves.map((item) => {
                        const level = "level" in item ? item.level : 1;

                        return (
                            <AchieveIcon key={item.id}
                                onClick={() => onClick(item.id)}
                                size={64}
                                image={item.image}
                                label={item.name}
                                level={level > 0 ? level : 1}
                                percent={isUnlocked ? 1 : 0.5}
                                //effect={item.effect}
                            />
                        );
                    })}
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    section: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 4,
        columnGap: 36,
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
