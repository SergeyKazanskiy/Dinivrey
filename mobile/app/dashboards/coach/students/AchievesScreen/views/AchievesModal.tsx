import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Achieve } from '../../model';
import { AchieveIcon } from '../../../../../shared/components/AchieveIcon';
import { RuleLevels } from '../../../../../shared/constants';

export type Props = {
  achieves: Achieve[];
  onClick: (id: number) => void;
};

export const AchievesModal: React.FC<Props> = ({ achieves, onClick }) => {  
    return (
        <View style={styles.section}>
            <ScrollView contentContainerStyle={styles.container}>
                {achieves.map((item, index) => (
                    
                    <AchieveIcon onClick={() => onClick(item.id)} key={index}
                        size={80}
                        image={item.image}
                        label={item.name}
                        level={RuleLevels[0]}
                        isAnimate={false}
                    />
                ))}
                </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        height: 280,
        borderRadius: 10,
        padding: 4,
        backgroundColor: '#152B52',
        borderWidth: 1,
        borderColor: 'rgb(110, 151, 6)'
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        padding: 10,
      },
      box: {
        width: 100,
        height: 50,
        backgroundColor: '#eee',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 6,
      },
});
