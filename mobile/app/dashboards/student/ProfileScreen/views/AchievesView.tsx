import React from 'react';
//import { StyleSheet, FlatList, TouchableOpacity, View, Alert } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useStore } from '../../store';
import { AchieveIcon } from '../../../../shared/components/AchieveIcon';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";


export type Props = {
    onClick: (id: number) => void;
    onAddClick: () => void;
};

export const AchievesView: React.FC<Props> = ({ onClick, onAddClick }) => {
    const { profile_achievements, student, last_test, notifications } = useStore();
    const { showNotificationsModal } = useStore();

    const values = [
        last_test.climbing || 0,
        last_test.stamina || 0,
        last_test.speed || 0,
        last_test.evasion || 0,
        last_test.hiding || 0,
    ];
    const average = (
        values.reduce((acc, v) => acc + v, 0) / values.length
    ).toFixed(1);

    return (
        <View style={styles.backH}>
            <View style={styles.studentIcon}>
                <Image 
                    source={require("../../../../../assets/images/kidIconExample1.png")}
                    style={{position: "absolute", width: 101, height: 101}}
                />
            </View>
            <View style={styles.mainComponentsV}>
                <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                    <Text style={styles.studentName}>{student.first_name} {student.last_name.charAt(0)}.</Text>
                    {notifications.length > 0 && <Ionicons name='mail-unread-outline' size={22} color='#D1FF4D' style={{ marginRight: 8, marginTop: -1 }}
                        onPress={showNotificationsModal}
                    />}
                </View>

                <View style={{flexDirection:'row'}}>
                    <View style={styles.studentTeam}>
                        <View style={{position: "relative", alignItems: 'center'}}>
                            <Image 
                                source={require("../../../../../assets/images/totalScoreBanner.png")}
                                style={{width: 77, height: 66, marginTop: -5}}
                            />
                            <View style={{position: "absolute", flexDirection: 'column', alignItems: 'center'}}>
                                <Text style={{color:'#fff', marginTop: 3, fontSize: 10, fontWeight: 600}}>T.S.</Text>
                                <Text style={{color:'#fff', marginTop: 4, fontSize: 24, fontWeight: 600}}>{average}</Text>
                            </View>
                        </View>
                        <View style={{position: "relative", alignItems: 'center'}}>
                            <Image 
                                source={require("../../../../../assets/images/studentTeam-Back.png")}
                                style={{width: 100, height: 13}}
                            />
                            <Text style={{position: "absolute", fontSize: 10, fontWeight: 600}}>Student Team</Text>
                        </View>
                    </View>
                    <Image
                        source={require("../../../../../assets/images/achievementTest.png")}
                        style={{width: 63, height: 52, marginTop: 10}}
                    />
                </View>
            </View>
        </View>
        // <FlatList
        //     data={[
        //         ...profile_achievements,
        //         ...(profile_achievements.length < 3 ? [{ id: 'add' }] : [])
        //     ]}
        //     horizontal
        //     keyExtractor={(item, index) => item.id.toString() + index}
        //     contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, paddingBottom: 4 }}
        //     showsHorizontalScrollIndicator={false}
        //     renderItem={({ item, index }) => {
        //         const totalItems = profile_achievements.length < 3
        //             ? profile_achievements.length + 1
        //             : profile_achievements.length;

        //         let iconSize = 80;
        //         if (totalItems === 1) {
        //             iconSize = 120;
        //         } else if (totalItems === 2) {
        //             iconSize = 100;
        //         } else if (totalItems === 3) {
        //             iconSize = index === 1 ? 100 : 80;
        //         }

        //         const isAddButton = item.id === 'add';

        //         if (isAddButton) {
        //             return (
        //                 <TouchableOpacity onPress={onAddClick} 
        //                     style={{ marginHorizontal: 8, width: iconSize, height: iconSize,
        //                         alignItems: 'center', justifyContent: 'center', paddingBottom: 24 }}
        //                 >
        //                     <View style={{ width: iconSize / 2, height: iconSize / 2,
        //                         borderRadius: iconSize / 4, backgroundColor: '#CCC',
        //                         alignItems: 'center', justifyContent: 'center' }}
        //                     >
        //                         <Ionicons name="add" size={iconSize * 0.4} color="black" />
        //                     </View>
        //                 </TouchableOpacity>
        //             );
        //         } else {
        //             return (
        //                 <AchieveIcon onClick={() => onClick(item.id)}
        //                     size={iconSize}
        //                     image={item.image}
        //                     label={item.name}
        //                     level={item.level}
        //                     effect={item.effect}
        //                     isGif={true}
        //                 />
        //             );
        //         }
        //    }}
        // />
    );
};

//<View style={[ styles.section]}>
const styles = StyleSheet.create({
    backH: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 122,
        backgroundColor: '#000',
        marginLeft: 42,
        marginRight: 18,
        borderRadius: 42
    },
    studentIcon: {
        position: 'relative', 
        alignItems: 'center',
        justifyContent: 'center',
        width: 122,
        height: 122,
        borderRadius: 61,
        backgroundColor: '#D8F207',
        borderColor: '#D9D9D9',
        borderWidth: 2,
        marginLeft: -24
    },
    mainComponentsV: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 7,
        marginTop: 6,
        marginBottom: 4
    },
    studentName: {
        fontSize: 26,
        fontWeight: 600,
        color: '#fff',
        marginBottom: 5
    },
    studentTeam: {
        flexDirection: 'column-reverse',
        alignItems: 'center',
        marginLeft: 14
    },
    container: {
        padding: 16,
    },
    section: {
        height: 100,
        borderRadius: 10,
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
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
        margin: 18,
    },
});
