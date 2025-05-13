import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { widgetStyles } from '../../../../../shared/styles/appStyles';
import { useStore } from '../../store';
import { ImagesPath } from '../../../../../shared/constants';


export const SportsView = () => {
    const { exams, exam } = useStore();
    const { selectExam } = useStore();

    return (
        <View style={styles.container} >
            <FlatList 
                data={exams} 
                horizontal
                keyExtractor={(item) => item}
                contentContainerStyle={styles.section}
                renderItem={({ item }) => {
                    const capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1);
                    return (
                        <TouchableOpacity onPress={() => selectExam(item)}>
                            <Image style={[styles.image, item === exam && styles.examSelected]} 
                                source={{ uri: `${ImagesPath}/icons/tests/${capitalizedItem}.png` }} 
                            />
                            <Text style={widgetStyles.sport}>{item}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:6,
        alignSelf:'center'
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 4,
        marginBottom: 16
    },
    icon: {
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginBottom: -8,
    },
    examSelected: {
        marginTop: -8,
        height: 68,
        width: 68,
    }
});
