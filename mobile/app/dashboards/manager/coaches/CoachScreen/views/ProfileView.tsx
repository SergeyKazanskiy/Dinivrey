import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { useStore } from '../../store';
import { ImagesPath } from '../../../../../shared/constants';


export const ProfileView = () => {
    const { coach } = useStore();
    const { toggleSignature } = useStore();

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Image source={{ uri: `${ImagesPath}/photos/Student_boy.png` }} style={styles.avatar} />

                <View style={styles.group}>
                    <Text style={styles.label}>First name</Text>
                    <Text style={styles.value}>{coach.first_name}</Text>
                    <Text style={styles.label}>Last name</Text>
                    <Text style={styles.value}>{coach.last_name}</Text>
                </View>
            </View>
            <View style={{marginTop: 4}}>
                <View style={styles.section}>
                    <Text style={[styles.label, {width: 64}]}>Phone: </Text>
                    <Text style={styles.value}>{coach.phone}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={[styles.label, {width: 64}]}>Email: </Text>
                    <Text style={styles.value}>{coach.email}</Text>
                </View>
                {/* <View style={styles.section}>
                    <Text style={[styles.label]}>Signature: </Text>
                    <Image source={{ uri: '/^data:image\/png;base64,/'+coach.signature }}
                        resizeMode="contain"
                        style={{ width: 120, height: 32, backgroundColor: '#ddd', marginRight: 8 }}
                    />
                    <Button title='Edit signature' type='outline' 
                        buttonStyle={styles.button} titleStyle={styles.title}
                        onPress={() => showSignature(!isSignature)}
                    />
                </View> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    section: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 4,
        width: '100%',
    },
    group: {
        flex: 1,
        marginLeft: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 4,
    },
    label: {
        color: '#ccc',
        fontSize: 15,
        marginRight: 8,
    },
    value: {
        color: '#444',
        fontSize: 18,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginBottom: 4,
        width: '100%',
        borderRadius: 8,
        backgroundColor: 'rgb(180, 216, 158)',
    },
    button: {
        height: 28,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        color: 'gold'
    },
});

