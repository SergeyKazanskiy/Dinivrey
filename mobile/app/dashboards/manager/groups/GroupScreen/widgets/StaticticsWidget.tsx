import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Metric } from '../../model';
import { LineChart } from '../../../../../shared/components/LineChart';


export type Props = {
    metrics: Metric[];
    metricName: string;
    dates: string[];
};

export const StaticticsWidget: React.FC<Props> = ({ metrics, metricName, dates }) => {  
  
    function getValues() {
        const filtred = metrics.filter(el => el.name === metricName);
        const values = filtred.map(el => el.score);
        return values
    }

    return (
        <>
            <Text style={styles.title}>{metricName}</Text>

            <LineChart w={326} h={160}
                labels={dates}
                values={getValues()}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 120,
        borderRadius: 10,
        backgroundColor: 'rgba(45, 75, 10, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(110, 151, 6)'
    },
    content: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexGrow: 1
    },
    title: {
        color: 'gold',
        fontSize: 16,
        fontWeight: '400',
        paddingTop: 20,
        paddingBottom: 8
    }
});
