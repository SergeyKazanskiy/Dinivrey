import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { widgetStyles } from '../../../../shared/styles/appStyles';
import { useStore } from '../../store';
import { ImagesPath, RuleTests } from '../../../../shared/constants';
import { TestFields } from '../../model';


export const SportsView = () => {
    //const { lider_tests, lider_test } = useStore();
    const { selectTest } = useStore();

    return (
        <View style={styles.container}>
            <FlatList 
                contentContainerStyle={{
                    flexGrow: 1,             // растягивает контейнер до доступной ширины
                    justifyContent: 'center', // центрирует по горизонтали
                    alignItems: 'center',     // выравнивает по вертикали (если нужно)
                }}
                data={RuleTests} 
                horizontal
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => {
                    const capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1);
                    return (
                        <TouchableOpacity onPress={() => selectTest(TestFields[index])}>
                            <Image style={styles.image}
                                source={{ uri: `${ImagesPath}/icons/tests/${capitalizedItem}.png` }} 
                            />
                            {/* <Text style={item === lider_test ? widgetStyles.sportSelected : widgetStyles.sport}>{item}</Text> */}
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 4,
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
        backgroundColor: '#fff',
        overflow: "hidden",
        transform: [{ scale: 1.2 }]
    },
});
