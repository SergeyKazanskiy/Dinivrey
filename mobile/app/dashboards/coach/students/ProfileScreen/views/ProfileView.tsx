import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useStore } from '../../store';
import { BACKEND_APP_IMAGES_URL } from '../../../../../shared/constants';


export const ProfileView = () => {
    const { student, camp_name, group_name } = useStore();
    const photoPath = student.photo === 'Student_boy.png' || student.photo === 'Student_girl.png' ?
    BACKEND_APP_IMAGES_URL + '/photos/' + student.photo :
    BACKEND_APP_IMAGES_URL + '/photos/' + camp_name + '/students/' + group_name + '/' + student.photo

  return (
    <View style={styles.container}>
        <Image source={{ uri: `${photoPath}` }} style={styles.avatar} />

        <View style={styles.group}>
            <Text style={styles.name}>{student.first_name}</Text>
            <Text style={styles.name}>{student.last_name}</Text>
            <Text style={styles.age}>{student.gender}, {student.age} years old</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    group: {
        marginLeft: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 4,
    },
    name: {
        color: '#444',
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 4,
        paddingVertical: 4,
        paddingHorizontal: 12,
        width: 200,
        borderRadius: 10,
        backgroundColor: 'rgb(180, 216, 158)',
    },
    age: {
        //marginTop: 8,
        color: '#444',
        fontSize: 18,
        paddingVertical: 4,
        paddingHorizontal: 12,
        width: 200,
        borderRadius: 10,
        backgroundColor: 'rgb(180, 216, 158)',
    },
});

