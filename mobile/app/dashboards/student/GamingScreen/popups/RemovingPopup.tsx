import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { Icon } from '../../../../shared/components/CustomIcon';
import { Button } from '../../../../shared/components/CustomButton';
import { useStore } from '../../store';
import { PopupWrapper } from '../../../../shared/components/PopupWrapper';
import { Student, Player } from '../../model';
import { RemoveAlert } from '../alerts/RemoveAlert';

const COLUMN_HEIGHT = 5;


export function RemovingPopup() {
  const { isRemovingPopup, playersToRemove, players, currentTeam } = useStore();
  const { hideRemovingPopup, removePlayers, confirmRemovePlayer, showRemoveAlert, hideRemoveAlert } = useStore();

  const columns: Player[][] = [];
  const teamPlayers = players.filter(el => el.team === currentTeam)

  for (let i = 0; i < teamPlayers.length; i += COLUMN_HEIGHT) {
    columns.push(teamPlayers.slice(i, i + COLUMN_HEIGHT));
  }

  const [name, setName] = useState('');
  const [playerId, setPlayerId] = useState(0);

  const handleSelect = (id: number, name: string) => {
    setPlayerId(id);

    if (playersToRemove.includes(id)) {
      confirmRemovePlayer(id);
    } else {
      setName(name);
      showRemoveAlert();
    }
  }

  const handleRemove = () => {
    confirmRemovePlayer(playerId);
    closeAlert();
  }

  const closeAlert = () => {
    hideRemoveAlert();
    setName('');
    setPlayerId(0);
  }

  return (
    <PopupWrapper visible={isRemovingPopup} title='Remove players' onClose={hideRemovingPopup}>
      <RemoveAlert name={name} onCancel={closeAlert} onRemove={handleRemove}/>

      <ScrollView horizontal contentContainerStyle={styles.rowScroll}>
        {columns.map((column, colIndex) => (
          <View key={colIndex} style={styles.column}>
            {column.map((player) => {
              const isSelected = playersToRemove.includes(player.id);
              return (
                <Pressable key={player.id}
                  style={[styles.cell, { backgroundColor: isSelected ? '#ef4444' : 'white'}]}
                  onPress={() => handleSelect(player.id, player.name)}
                >
                  <View style={styles.cellContent}>
                    <Text style={styles.playerName}>
                      {player.name} | {player.age}
                    </Text>
                    <Icon name="x-circle" color='#555'/>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonRow}>
        <Button
          title="REMOTE"
          buttonStyle={styles.removeBtn}
          onPress={() => (removePlayers(), hideRemovingPopup())}
        />
      </View>
    </PopupWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  rowScroll: {
    paddingBottom: 16,
  },
  column: {
    marginHorizontal: 8,
  },
  cell: {
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: 180,
    justifyContent: 'center',
  },
  cellContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerName: {
    color: '#222',
    flexShrink: 1,
    fontSize: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 4,
    margin: 12,
  },
  removeBtn: {
    backgroundColor: '#ef4444',
    borderRadius: 24,
    paddingHorizontal: 24,
  },
});