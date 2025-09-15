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
                <Ionicons name="chevron-back" size={20} color="#ddd" />
            </TouchableOpacity>

            <View style={{ width: 80, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>

            <TouchableOpacity onPress={onNext} style={styles.button} disabled={!canNext}>
                <Ionicons name="chevron-forward" size={20} color={canNext ? '#ddd' : 'gray'}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        padding: 8,
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gold', // blue.500
       // paddingVertical: 4,
    },
});
