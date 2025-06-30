import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Achieve } from '../../model';
import { AchieveIcon } from '../../../../../shared/components/AchieveIcon';


export type Props = {
    title: string;
    achieves: Achieve[];
    category: string;
};

export const AchievesWidget: React.FC<Props> = ({ title, achieves, category }) => {  
    const data = achieves.filter(achieve => achieve.category === category);

    return (
        <>
            <Text style={styles.title}>{title}</Text>

            <View style={[ styles.container]}>
                <FlatList data={data} horizontal
                    keyExtractor={(achieve) => achieve.image}
                    contentContainerStyle={styles.content}
                    showsHorizontalScrollIndicator={true}
                    renderItem={({ item }) =>
                        <AchieveIcon onClick={() => {}}
                            size={80}
                            image={item.image}
                            label={item.name + ' (' + item.count + ')'}
                            level={'Common'}
                        />
                    }
                />
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 120,
        borderRadius: 10,
        backgroundColor: 'rgba(45, 75, 10, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(110, 151, 6)'
    },
    content: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexGrow: 1
    },
    title: {
        color: '#ddd',
        fontSize: 16,
        fontWeight: '400',
        paddingTop: 20,
        paddingBottom: 8
    }
});
