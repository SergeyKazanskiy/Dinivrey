import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';


export type Props = {
    isSelected: boolean;
};

export const ChangeButton: React.FC<Props> = ({ isSelected }) => {  
    return (
        <View style={[styles.row, styles.button, isSelected && styles.selected]}>
            <Text style={styles.buttonText}>Change</Text>

            <Image source={require("../../../../../assets/images/edit-contained_black.png")}
             style={{marginTop: 3}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        height: 20,
        width: 64,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        marginTop: 4
    },
    selected: {
        borderWidth: 2,
        borderColor: '#94B23A',
        backgroundColor: '#BEFF00'
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 10,
        color: '#000',
        fontWeight: '700',
        //paddingTop: 3,
    },
});
