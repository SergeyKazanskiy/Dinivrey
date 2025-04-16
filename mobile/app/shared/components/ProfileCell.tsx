import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { profileStyles } from '../styles/appStyles';


export type Props = {
  title: string;
};
  
export const ProfileCell: React.FC<Props> = ({title}) => {
  return (
    <View style={[profileStyles.background, styles.container]}>
        <Text style={profileStyles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingLeft: 12,
    width: '100%',
    borderRadius: 10
  },
});

