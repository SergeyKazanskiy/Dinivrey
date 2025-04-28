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
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => onClick(item.id)}>
                        <AchieveIcon size={80}
                            image={item.image}
                            label={item.name}
                            level={item.level}
                        />
                    </TouchableOpacity>
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
        backgroundColor: '#2C3131',
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
    summary: {
        textAlign: 'center',
        paddingTop: 26,
        paddingBottom: 10
    }
});
