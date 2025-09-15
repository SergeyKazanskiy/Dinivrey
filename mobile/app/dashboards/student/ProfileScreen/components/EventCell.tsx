import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from '@rneui/themed';


export type Props = {
  isSelected: boolean;
  date: string;
  time: string;
  desc: string;
};
  
export const EventCell: React.FC<Props> = ({isSelected, date, time, desc}) => {
  return (
    <View style={[styles.container, isSelected && {backgroundColor: 'rgba(64, 108, 14, 0.8)'}]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={styles.logo}>
          <Image source={require('../../../../../assets/images/icons/TabIcons/game.png')}
            style={styles.image}/>
        </View>

          
        <View style={{flex: 1, paddingLeft: 12}}>
          <Text style={styles.dinivrey}>Dinivrey</Text>

          <View style={{flexDirection: 'row',}}>
            <Text style={[styles.date, {marginRight: 10}]}>{date}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>

        <Icon name="checkbox-marked-outline"
          type="material-community"
          color={isSelected ? '#D8F207' : '#000'}
          size={isSelected ? 30 : 32}
          style={{marginRight: 8}}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 8,
    backgroundColor: 'rgba(51, 86, 11, 1)',
    marginHorizontal: 16
  },
  dinivrey: {
    fontSize: 26,
    fontWeight: 600,
    color: '#D8F207',
    paddingBottom: 6
  },
  logo: {
    width: 52,
    borderRightColor: '#69A4FC',
    borderRightWidth: 1,
  },
  image: {
    //alignSelf: 'center',
    resizeMode: 'contain',
    width: 44,
    height: 48,
  },
  date: {
    fontSize: 14,
    fontWeight: 500,
    color: '#A4FAAA',
    //marginRight: 16
  },
  time: {
    fontSize: 14,
    fontWeight: 500,
    color: '#fff',
    paddingHorizontal: 4
  }
});


