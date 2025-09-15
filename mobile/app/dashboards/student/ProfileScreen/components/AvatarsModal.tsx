import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ImagesPath } from '../../../../shared/constants';

export type Props = {
    onAvatar: (avatar: string) => void;
};

export const AvatarsModal: React.FC<Props> = ({ onAvatar }) => { 
    return (
        <View style={styles.section}>
            <TouchableOpacity onPress={() => onAvatar('Avatar_1')}>
                <Image style={{height: 84, width: 84}} source={{uri: `${ImagesPath}/avatars/Avatar_1.png`}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onAvatar('Avatar_2')}>
                <Image style={{height: 84, width: 84}} source={{uri: `${ImagesPath}/avatars/Avatar_2.png`}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onAvatar('Avatar_3')}>
                <Image style={{height: 84, width: 84}} source={{uri: `${ImagesPath}/avatars/Avatar_3.png`}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onAvatar('Avatar_4')}>
                <Image style={{height: 84, width: 84}} source={{uri: `${ImagesPath}/avatars/Avatar_4.png`}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onAvatar('Avatar_5')}>
                <Image style={{height: 84, width: 84}} source={{uri: `${ImagesPath}/avatars/Avatar_5.png`}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onAvatar('Avatar_6')}>
                <Image style={{height: 84, width: 84}} source={{uri: `${ImagesPath}/avatars/Avatar_5.png`}}/>
            </TouchableOpacity>        
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    section: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        padding: 4,
    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#444',
        borderBottomWidth: 2,
        padding: 12,
        marginBottom: 4
    },
    icon: {
        backgroundColor: 'red',
    },
    emptyLabel: {
        paddingTop: 80,
        color: '#ddd',
        fontSize: 16,
        alignSelf: 'center'
    },
});
