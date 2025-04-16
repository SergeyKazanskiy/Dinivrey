import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widgetStyles } from '../styles/appStyles';


export type Props = {
  label: string;
  value: string;
};
  
export const PerfomenceCell: React.FC<Props> = ({label, value}) => {
  return (
    <View style={styles.container}>
        <Text style={[widgetStyles.label, styles.address]}>{label}</Text>
        <Text style={widgetStyles.input}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingLeft: 4,
    justifyContent: 'space-between'
    //width: '100%'
  },
  address: {
    
  },
});

