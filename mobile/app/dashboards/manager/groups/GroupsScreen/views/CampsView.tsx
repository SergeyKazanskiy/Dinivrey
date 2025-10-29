import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Button } from '../../../../../shared/components/CustomButton';
import { useStore } from '../../store';


export function CampsView() {
  const { camp_id, camps } = useStore();
  const { selectCamp } = useStore();
  //alert(camp_id)
  return (
    <View style={styles.container}>
      <FlatList data={camps} horizontal
        
        keyExtractor={(item) => '№' + item}
        renderItem={({ item, index }) => 
          <Button key={item.id.toString()}
              size='sm'
              title={item.name}
              type={item.id === camp_id ? 'solid' : 'outline'}
              buttonStyle={[styles.item, item.id === camp_id && {backgroundColor: '#152B52'}]}
              titleStyle={styles.text}
              onPress={() => selectCamp(item.id, index)}
          />
        }/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 2
  },
  item: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 6,
    marginRight: 8
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: 'gold', // blue.500
    paddingHorizontal: 8,
    paddingVertical: 4
  },
});
