import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { widgetStyles, screenStyles } from '../styles/appStyles';
import { Metric } from '../../dashboards/student/model';


interface Props {
    metrics: Metric[];
    onClick: (name: string) => void;
}

export function TableView({ metrics, onClick }: Props) {
  return (
    <View style={styles.metricsTable}>
        <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Metric</Text>
            <Text style={styles.tableCol}>Score</Text>
            <Text style={styles.tableCol}>Unit</Text>
        </View>

        <FlatList data={metrics}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => 
                <TouchableOpacity style={styles.tableRow}
                    onPress={() => onClick(item.name)} >

                    <Text style={styles.tableCol}>{item.name}</Text>
                    <Text style={styles.tableCol}>{item.score}</Text>
                    <Text style={styles.tableCol}>{item.unit}</Text>
                </TouchableOpacity>
            } style={styles.list} />
    </View>
  );
};

const styles = StyleSheet.create({
    metricsTable: {
        marginVertical: 16,
        backgroundColor: '#263238',
        borderRadius: 8,
        padding: 8,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#37474F',
    },
    tableCol: {
        color: '#FFFFFF',
        flex: 1,
        textAlign: 'center',
    },
    list: {
  
    },
});
