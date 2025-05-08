import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
//import { widgetStyles } from '../../../../shared/styles/appStyles';
import { useStore } from '../../store';
//import { ImagesPath } from '../../../../shared/constants';


export const SportsView = () => {
   // const { lider_tests, lider_test } = useStore();
    //const { selectTest } = useStore();

    return (
        <View style={styles.container}>
            
        </View>
    );
};
/*
<FlatList 
                data={lider_tests} 
                horizontal
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                    const capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1);
                    return (
                        <TouchableOpacity onPress={() => selectTest(item)}>
                            <Image style={styles.image} 
                                source={{ uri: `${ImagesPath}/icons/tests/${capitalizedItem}.png` }} 
                            />
                            <Text style={item === lider_test ? widgetStyles.sportSelected : widgetStyles.sport}>{item}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
            */
const styles = StyleSheet.create({
    container: {
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
});
