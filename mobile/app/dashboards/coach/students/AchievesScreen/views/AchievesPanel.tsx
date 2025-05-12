import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Achieve } from '../../model';
import { AchieveIcon } from '../../../../../shared/components/AchieveIcon';


export type Props = {
  achieves: Achieve[];
  achieve_id: number;
  category: string;
  onClick: (id: number) => void;
};

export const AchievesPanel: React.FC<Props> = ({ achieves, achieve_id, category, onClick }) => {  
    const data = achieves.filter(achieve => achieve.category === category);

    return (
        <View style={[ styles.section]}>
            <FlatList data={data} 
                horizontal
                keyExtractor={(achieve) => achieve.image}
                contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1}}
                showsHorizontalScrollIndicator={true}
                renderItem={({ item }) =>
                    <View style={ item.id === achieve_id && styles.selected }>
                        <AchieveIcon onClick={() => onClick(item.id)}
                            size={80}
                            image={item.image}
                            label={item.name}
                            level={item.level}
                            effect={item.effect}
                        />
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    section: {
        height: 120,
        borderRadius: 10,
        paddingLeft: 12,
        backgroundColor: 'rgba(45, 75, 10, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(110, 151, 6)'
    },
    icon: {
        backgroundColor: 'red',
    },
    selected: {
        backgroundColor: 'rgb(110, 151, 6)',
    }
});
