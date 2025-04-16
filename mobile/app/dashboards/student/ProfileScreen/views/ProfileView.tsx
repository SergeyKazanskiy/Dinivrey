import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Checkbox from 'expo-checkbox';
import { checkboxStyles } from '../../../../shared/styles/appStyles';

import { useStore } from '../../store';
import { ProfileCell } from '../../../../shared/components/ProfileCell';


export const ProfileView = () => {
  const { student } = useStore();

  return (
    <View style={styles.section}>
      <Image style={styles.image} source={require('../../../../../assets/images/profile/student.png')}/>

      <View style={styles.info}>
        <View style={styles.firstRow}>
            <ProfileCell title={student.first_name}/>
            <Checkbox style={styles.active}
              color={student.active ? checkboxStyles.isChecked.color : checkboxStyles.noChecked.color}
              value={student.active} />
        </View>
        <ProfileCell title={student.last_name}/>
        <ProfileCell title={student.gender + ', ' + student.age  + ' years old'}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    height: 120,
    flex: 1,
    flexDirection: 'row',
  },
  image: { 
    height:  '103%',
    resizeMode: 'contain',
    aspectRatio: 1,
    marginRight: 16,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  firstRow: {
    flexDirection: 'row',
    width: '84%',
  },
  active: {    
    alignSelf: 'flex-start', 
    marginHorizontal: 16
  }
});