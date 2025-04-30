import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { widgetStyles, cellStyles } from '../styles/appStyles';
import { Lider } from "../../dashboards/student/model";
import { AchieveIcon } from './AchieveIcon';
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
    inx: number;
    lider: Lider;
};

const exerciseColors: string[] = ['#FFD13A', '#FF006F', '#FF5E1A', '#23FFB2', '#48F3FF']

export const LiderCell: React.FC<Props> = ({ inx, lider }) => {
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Image style={styles.image} source={require('../../../assets/images/profile/student.png')} />
                <View style={styles.info}>
                    <Text style={widgetStyles.title}>{lider.first_name}</Text>
                    <Text style={widgetStyles.title}>{lider.last_name}</Text>
                </View>
                <FlatList data={lider.achieves} horizontal
                    keyExtractor={(item) => item.image}
                    renderItem={({ item }) =>

                        <AchieveIcon onClick={() =>{}}
                            size={42}
                            image={item.image}
                            label={''}
                            level={item.level}
                            isGif={false}
                        />
                    } />
            </View>
            <View style={styles.scores}>
                <Text style={styles.inx}> - {inx} -  </Text>
                <View style={styles.average}>
                    <Text style={styles.score}>
                        {(lider.speed + lider.stamina + lider.climbing + lider.evasion + lider.hiding) / 5}
                    </Text></View>
                <View style={[styles.mark, { borderColor: exerciseColors[0] }]}>
                    <Text style={widgetStyles.sport}>{lider.speed}</Text></View>
                <View style={[styles.mark, { borderColor: exerciseColors[1] }]}>
                    <Text style={widgetStyles.sport}>{lider.stamina}</Text></View>
                <View style={[styles.mark, { borderColor: exerciseColors[2] }]}>
                    <Text style={widgetStyles.sport}>{lider.climbing}</Text></View>
                <View style={[styles.mark, { borderColor: exerciseColors[3] }]}>
                    <Text style={widgetStyles.sport}>{lider.evasion}</Text></View>
                <View style={[styles.mark, { borderColor: exerciseColors[4] }]}>
                    <Text style={widgetStyles.sport}>{lider.hiding}</Text></View>
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
        backgroundColor: 'rgba(45, 75, 10, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(110, 151, 6)',
       // marginBottom: 12,
    },
    section: {
        flex: 1,
        flexDirection: 'row',
    },
    scores: {
        paddingTop: 4,
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'flex-end',
        alignItems: 'center',
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
        
        marginHorizontal: 3,
        height: 20,
        width: 36,
        borderRadius: 5,
        borderWidth: 2
    },
    average: {
        paddingTop: 2,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'green',
        height: 24,
        width: 48,
       // backgroundColor: '#00AF86'
    },
    score: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: '400'
    },
    inx: {
        paddingTop: 8,
        paddingHorizontal: 8,
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    }
});
