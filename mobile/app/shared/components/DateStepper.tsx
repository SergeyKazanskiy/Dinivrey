import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 


interface Props {
    title: string;
    canNext: boolean;
    onPrev: () => void;
    onNext: () => void;
}

export function DateStepper({ title, onPrev, onNext, canNext }: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPrev} style={styles.button}>
                <Ionicons name="chevron-back" size={20} color="gray" />
            </TouchableOpacity>

            <View style={{ width: 120, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>

            <TouchableOpacity onPress={onNext} style={styles.button} disabled={!canNext}>
                <Ionicons name="chevron-forward" size={20} color={canNext ? 'gray' : '#ccc'}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB', // gray.300
        backgroundColor: 'white',
    },
    button: {
        padding: 8,
    },
    title: {
        textAlign: 'center',
        fontSize: 15,
        color: '#3B82F6', // blue.500
        paddingVertical: 4,
    },
});
