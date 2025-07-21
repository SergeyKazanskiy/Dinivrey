import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { CheckBox } from '@rneui/themed';


type Player = {
  id: number;
  name: string;
};

type Props = {
  players: Player[];
  onConfirm: (untaggedIds: number[]) => void;
};

export const UntaggedEvadersSelect: React.FC<Props> = ({ players, onConfirm }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const allTagged = selectedIds.length === 0;

  return (
    <View
      style={{
        backgroundColor: '#0D0D1C',
        padding: 16,
        borderRadius: 12,
      }}
    >
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
        Select Untagged Evaders
      </Text>

      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CheckBox
            title={item.name}
            checked={selectedIds.includes(item.id)}
            onPress={() => toggleSelection(item.id)}
            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            textStyle={{ color: 'white' }}
          />
        )}
      />

      {allTagged && (
        <View
          style={{
            backgroundColor: '#A85F1C',
            borderRadius: 10,
            padding: 12,
            marginTop: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#FFD700', fontWeight: '600' }}>
            ⚠️ All Evaders tagged! Chasers will receive 3 bonus points.
          </Text>
        </View>
      )}

      <Pressable
        onPress={() => onConfirm(selectedIds)}
        style={{
          backgroundColor: 'white',
          paddingVertical: 12,
          borderRadius: 10,
          marginTop: 20,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#0D0D1C', fontWeight: 'bold' }}>Confirm Untagged Players</Text>
      </Pressable>
    </View>
  );
};
