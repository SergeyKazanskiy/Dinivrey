import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widgetStyles } from '../../../../shared/styles/appStyles';
import { useStore } from '../../store';


export const SportsView = () => {
    const { open_achievements } = useStore();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={open_achievements}>
                <Image style={styles.image} source={require('../../../../../assets/images/exercise/Endurance.png')}/>
                <Text style={widgetStyles.sport}>Endurance</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={open_achievements}>
                <Image style={styles.image} source={require('../../../../../assets/images/exercise/Climbing.png')}/>
                <Text style={widgetStyles.sport}>Climbing</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={open_achievements}>
                <Image style={styles.image} source={require('../../../../../assets/images/exercise/Speed.png')}/>
                <Text style={widgetStyles.sport}>Speed</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={open_achievements}>
                <Image style={styles.image} source={require('../../../../../assets/images/exercise/Hiding.png')}/>
                <Text style={widgetStyles.sport}>Hiding</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={open_achievements}>
                <Image style={styles.image} source={require('../../../../../assets/images/exercise/Evading.png')}/>
                <Text style={widgetStyles.sport}>Evading</Text>
            </TouchableOpacity>
        </View>
    );
};

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
