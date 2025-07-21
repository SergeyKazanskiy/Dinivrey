import React from 'react';
import { View, Text } from 'react-native';


type Props = {
  name: string;
  status: 'Survived' | 'Caught';
  points: number;
};

export const PlayerCell: React.FC<Props> = ({ name, status, points }) => {
  const isSurvived = status === 'Survived';

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EEE',
        marginVertical: 4,
        padding: 8,
        borderRadius: 6,
      }}
    >
      <Text style={{ flex: 1 }}>{name}</Text>
      <Text style={{ color: isSurvived ? 'green' : 'red' }}>{status}</Text>
      <Text style={{ marginLeft: 10 }}>Points: {points}</Text>
    </View>
  );
};
