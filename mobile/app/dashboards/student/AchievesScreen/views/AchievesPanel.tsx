import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Achieve } from '../../model';
import { AchieveIcon } from '../../../../shared/components/AchieveIcon';


export type Props = {
  achieves: Achieve[];
  category: string;
  onClick: (id: number) => void;
};

export const AchievesPanel: React.FC<Props> = ({ achieves, category, onClick }) => {  
    const data = achieves.filter(achieve => achieve.category === category);

    return (
        <View style={[ styles.section]}>
            <FlatList data={data} 
                horizontal
                keyExtractor={(achieve) => achieve.image}
                contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1}}
                showsHorizontalScrollIndicator={true}
                renderItem={({ item }) =>
                    <AchieveIcon onClick={() => onClick(item.id)}
                        size={80}
                        image={item.image}
                        label={item.name}
                        level={item.level}
                        effect={item.effect}
                    />
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
    }
});
