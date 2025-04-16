import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { widgetStyles, cellStyles } from '../styles/appStyles';
import { Student } from "../../dashboards/student/LidersScreen/model";
//import { getAchievementImage, getExerciseImage } from '../hooks/useGetImage';

export function getAchievementImage(imageName: string) {
    switch (imageName) {
        case 'Careful':
            return require('../../../assets/images/icons/Careful.png');
        case 'Hardy':
            return require('../../../assets/images/icons/Hardy.png');
        case 'Lider':
            return require('../../../assets/images/icons/Lider.png');
        case 'Score':
            return require('../../../assets/images/icons/Score.png');
        case 'Skill':
            return require('../../../assets/images/icons/Skill.png');
        default:
            return require('../../../assets/images/icons/Tagger.png'); 
    }
}

export function getExerciseImage(imageName: string) {
    switch (imageName) {
        case 'Climbing':
            return require('../../../assets/images/exercise/Climbing.png');
        case 'Stamina':
            return require('../../../assets/images/exercise/Endurance.png');
        case 'Evading':
            return require('../../../assets/images/exercise/Evading.png');
        case 'Hiding':
            return require('../../../assets/images/exercise/Hiding.png');
        case 'Speed':
            return require('../../../assets/images/exercise/Speed.png');
        default:
            return require('../../../assets/images/exercise/Evading.png'); 
    }
}

export type Props = {
    student: Student;
};

const exerciseColors: string[] = ['#FF006F', '#FF5E1A', '#FFD13A', '#48F3FF', '#23FFB2']

export const LiderCell: React.FC<Props> = ({ student }) => {
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Image style={styles.image} source={require('../../../assets/images/profile/student.png')} />
                <View style={styles.info}>
                    <Text style={widgetStyles.title}>{student.firstName}</Text>
                    <Text style={widgetStyles.title}>{student.lastName}</Text>
                </View>
                <FlatList data={student.achievements} horizontal
                    keyExtractor={(item) => item.imageName}
                    renderItem={({ item }) =>
                        <Image style={styles.icon} source={getAchievementImage(item.imageName)} />
                    } />
            </View>
            <View style={styles.section}>
                <FlatList data={student.statistic} horizontal
                        renderItem={({ item, index }) =>
                            <View style={styles.statistic}>
                                <Image style={styles.ach} source={getExerciseImage(item.exercise)} />
                                <View style={[styles.mark, { borderColor: exerciseColors[index] }]}>
                                    <Text style={widgetStyles.sport}>{item.mark}</Text>
                                </View>
                            </View>
                        } />
                <View style={styles.average}>
                    <Text style={styles.score}>{student.average}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        borderRadius: 10,
        padding: 4,
        backgroundColor: '#212A31',
        marginBottom: 12,
    },
    section: {
        flex: 1,
        flexDirection: 'row',
    },
    image: {
        height: 52,
        width: 52,
        borderRadius: 26,
        margin: 4,
        marginRight: 4
    },
    icon: {
        height: 44,
        width: 44,
        borderRadius: 22,
        margin: 4,
    },
    ach: {
        height: 36,
        width: 36,
        borderRadius: 18,
        marginHorizontal: 4,
    },
    info: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 4,
        minWidth: 100,
    },
    achievs: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 2,
    },
    statistics: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 2,
    },
    statistic: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    mark: {
        marginTop: -2,
        marginLeft: 3,
        height: 20,
        width: 36,
        borderRadius: 5,
        borderWidth: 2
    },
    average: {
        marginTop: 12,
        paddingTop: 4,
        borderRadius: 12,
        height: 30,
        width: 76,
        backgroundColor: '#00AF86'
    },
    score: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
