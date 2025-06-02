import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { widgetStyles, screenStyles } from '../styles/appStyles';
import { Metric } from '../../dashboards/student/model';


interface Props {
    metricName: string;
    metrics: Metric[];
    onClick: (name: string) => void;
}

export function MetricTable({ metricName, metrics, onClick }: Props) {
  return (
    <View style={styles.metricsTable}>
        <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Metric</Text>
            <Text style={styles.tableCol}>Score</Text>
            <Text style={styles.tableCol}>Time</Text>
            <Text style={styles.tableCol}>Unit</Text>
        </View>

        <FlatList data={metrics}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => 
                <TouchableOpacity style={item.name === metricName ? styles.selectedRow : styles.tableRow}
                    onPress={() => onClick(item.name)} >

                    <Text style={styles.tableCol1}>{item.name}</Text>
                    <Text style={styles.tableCol2}>{item.score}</Text>
                    <Text style={styles.tableCol3}>{item.time}</Text>
                    <Text style={styles.tableCol3}>{item.unit}</Text>
                </TouchableOpacity>
            } style={styles.list} />
    </View>
  );
};

const styles = StyleSheet.create({
    metricsTable: {
        marginVertical: 4,
        backgroundColor: 'rgba(54, 72, 32, 0.3)',
        borderRadius: 8,
        padding: 8,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(110, 151, 6)',
    },
    selectedRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(110, 151, 6)',
        backgroundColor: 'green'
    },
    tableCol: {
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: '500',
        flex: 1,
        textAlign: 'center',
    },
    tableCol1: {
        fontSize: 15,
        color: '#EEEEEE', //#D1FF4D
        flex: 1,
        textAlign: 'left',
        paddingLeft: 14,
    },
    tableCol2: {
        fontSize: 15,
        color: 'gold',
        fontWeight: 500,
        flex: 1,
        textAlign: 'center',
    },
    tableCol3: {
        fontSize: 15,
        color: '#A7CFF5',
        flex: 1,
        textAlign: 'center',
    },
    list: {
  
    },
});
