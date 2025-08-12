import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { Button } from '@rneui/themed';
import { useStore } from '../../store';
import { ImagesPath } from '../../../../../shared/constants';


export const ProfileView = () => {
    const { coach, camp_name } = useStore();
    const { updateCoach } = useStore();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setFirstName(coach.first_name);
        setLastName(coach.last_name);
        setPhone(coach.phone);
        setEmail(coach.email);
    }, [coach]);
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Image source={{ uri: `${ImagesPath + '/photos/' + camp_name + '/coaches/' + coach.photo}` }} style={styles.avatar} />

                <View style={styles.group}>
                    <Text style={styles.label}>First name</Text>
                    <TextInput style={styles.value} keyboardType='name-phone-pad' maxLength={20} placeholder="Enter"
                        value={firstName}
                        onChangeText={(text) => setFirstName(text.trim())}
                        onBlur={() => updateCoach({first_name: firstName})}
                    />
                    <Text style={styles.label}>Last name</Text>
                    <TextInput style={styles.value} keyboardType='name-phone-pad' maxLength={20} placeholder="Enter"
                        value={lastName}
                        onChangeText={(text) => setLastName(text.trim())}
                        onBlur={() => updateCoach({last_name: lastName})}
                    />
                </View>
            </View>
            <View style={{marginTop: 4}}>
                <View style={styles.section}>
                    <Text style={[styles.label, {width: 64}]}>Phone: </Text>
                    <TextInput style={styles.value} keyboardType='name-phone-pad' maxLength={20} placeholder="Enter"
                        value={phone}
                        onChangeText={setPhone}
                        onBlur={() => updateCoach({phone: phone})}
                    />
                </View>
                <View style={styles.section}>
                    <Text style={[styles.label, {width: 64}]}>Email: </Text>
                    <TextInput style={styles.value} keyboardType='name-phone-pad' maxLength={30} placeholder="Enter"
                        value={email}
                        onChangeText={setEmail}
                        onBlur={() => updateCoach({email: email})}
                    />
                </View>
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
        minHeight: 30,
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

