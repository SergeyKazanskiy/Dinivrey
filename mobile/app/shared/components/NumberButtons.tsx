import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button } from '../../shared/components/CustomButton';


type Props = {
  maxNumber: number;
  onPress: (value: number) => void;
  selectedNumber: number;
};

export const NumberButtons: React.FC<Props> = ({ maxNumber, onPress, selectedNumber }) => {
  const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      <View style={styles.container}>
        {numbers.map(number => (
          <Button key={number}
            title={number.toString()}
            type={selectedNumber === number ? 'solid' : 'outline'}
            buttonStyle={[
              styles.button,
              selectedNumber === number && styles.selectedButton,
            ]}
            titleStyle={styles.title}
            onPress={() => onPress(number)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    marginVertical: 10,
  },
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: '#2089dc',
  },
  title: {
    fontSize: 15,
  },
});
 
