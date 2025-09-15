import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { useStore } from '../../store';
import { Ionicons } from '@expo/vector-icons';
import { StatsIndicators } from '../../../../shared/components/StatsIndicators';
import { RadarChart } from '../../../../shared/components/RadarChart';


export type Props = {
  onExam: (metric: string) => void;
  onGame: (metric: string) => void;
  onLiders: () => void;
};

export const StatisticView = ({ onExam, onGame, onLiders }: Props) => {
  const { last_test, last_game, notifications } = useStore();
  const { showNotificationsModal } = useStore();

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <View style={styles.container2}>
          <View style={styles.box}>
            <Text style={styles.text2}>Statistics</Text>
          </View>
          {notifications.length > 0 && <Ionicons name='mail-unread-outline'size={22}
            color='#D1FF4D' style={{ marginLeft: 12, marginTop: -1 }}
            onPress={showNotificationsModal}
          />}
        </View>
        <RadarChart test={last_test} onExam={(exam)=>{}} onLiders={onLiders}/>
      </View>

      <StatsIndicators stats={[
          last_test.climbing || 0, 
          last_test.stamina || 0, 
          last_test.speed || 0, 
          last_test.evasion || 0, 
          last_test.hiding || 0
          ]}/>

      {/* <View style={styles.section}>
        <RadarChart test={last_test} onExam={onExam} onLiders={onLiders} />
        <StatsIndicators stats={[last_test.climbing, last_test.stamina, last_test.speed, last_test.evasion, last_test.hiding]}/>  
      </View> */}
      
      <View style={[styles.section, { paddingHorizontal: 16 }]}>
        <TouchableOpacity onPress={() => onGame('Caught')}>
          <Text style={styles.label}>Caught: 
            <Text style={styles.text}>{last_game.caught}</Text>
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => onGame('Freeded')}>
          <Text style={styles.label}>Freeded: 
            <Text style={styles.text}>{last_game.freeded}</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => onGame('Survived') } style={styles.col}>
        <Text style={styles.label}>Survived: 
          <Text style={styles.text}>{last_game.is_survived ? '2' : '0'}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
    paddingBottom: 12
  },
  container2: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 28
  },
  box: {
    backgroundColor: "#000",
    borderRadius: 11,
  },
  text2: {
    marginHorizontal: 20,
    marginVertical: 3,
    fontSize: 25,
    fontWeight: "600",
    color: "#fff",
  },
  col: {
    paddingTop: 16,
    flexDirection: 'column',
    alignItems:'center'
  },
  section: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  label: {
    color: '#F8E187',
    fontSize: 15,
    fontWeight: 500
  },
  text: {
    paddingLeft: 6,
    color: '#D1FF4D',
    fontSize: 18,
    fontWeight: 500
  },
});
