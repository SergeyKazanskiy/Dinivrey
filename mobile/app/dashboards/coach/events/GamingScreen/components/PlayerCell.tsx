import React from 'react';
import { View, Text, } from 'react-native';


type Props = {
  name: string;
  isSurvived: boolean | undefined; //'Survived' | 'Caught' | undefined
  points: number;
};

export const PlayerCell: React.FC<Props> = ({ name, isSurvived, points }) => {
  const bg = isSurvived === undefined
  ? 'white' : isSurvived
  ? 'green' : 'red';

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: bg,
        marginVertical: 4,
        padding: 8,
        borderRadius: 6,
      }}
    >
      <Text style={{ flex: 1 }}>{name}</Text>
      {/* <Text style={{ color: isSurvived ? 'green' : 'red' }}>{status}</Text> */}
      <Text style={{ marginLeft: 10 }}>{points}</Text>
    </View>
  );
};
