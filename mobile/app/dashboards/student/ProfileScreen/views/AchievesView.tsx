import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useStore } from '../../store';
import { widgetStyles, screenStyles } from '../../../../shared/styles/appStyles';
import { AchieveIcon } from '../../../../shared/components/AchieveIcon';
import { Ionicons } from '@expo/vector-icons';


export type Props = {
    onClick: (id: number) => void;
    onAddClick: () => void;
};

export const AchievesView: React.FC<Props> = ({ onClick, onAddClick }) => {
    const { profile_achievements } = useStore();

    return (
        <View style={styles.container}>
            <Text style={[screenStyles.title, styles.title]}>My Top 3</Text>
            <FlatList data={profile_achievements} 
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => onClick(item.id)}>
                        <AchieveIcon size={80}
                            image={item.image}
                            label={item.name}
                            level={item.level}
                            effect={item.effect}
                            isGif={true}
                        />
                    </TouchableOpacity>
                }
                ListFooterComponent={
                    profile_achievements.length < 3 ? (
                        <TouchableOpacity style={[styles.iconContainer, styles.addButton]}
                            onPress={onAddClick}
                        >
                            <Ionicons name="add" size={30} color="black" />
                        </TouchableOpacity>
                    ) : null
                    }
                contentContainerStyle={styles.section}
            />
        </View>
    );
};

//<View style={[ styles.section]}>
const styles = StyleSheet.create({
    container: {
    },
    section: {
        height: 100,
        borderRadius: 10,
        paddingLeft: 12,
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
    title: {
        textAlign: 'left',
        paddingTop: 26,
        paddingBottom: 10
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
    },
});
