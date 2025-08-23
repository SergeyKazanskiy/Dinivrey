import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
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
            {achieves.length === 0 && <Text style={styles.emptyLabel}>No achievements</Text>}
            {achieves.length > 0 && <ScrollView contentContainerStyle={styles.container}>
                {achieves.map((item, index) => (
                    
                    <AchieveIcon onClick={() => onClick(item.id)} key={index}
                        size={80}
                        image={item.image}
                        label={item.name}
                        level={1}
                        isAnimate={false}
                    />
                ))}
                </ScrollView>}
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
      emptyLabel: {
        paddingTop: 80,
        color: '#ddd',
        fontSize: 16,
        alignSelf: 'center'
      },
});
