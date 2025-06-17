import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from '../../../../../shared/components/CustomAlert';


export function ExamModal() {
  const { exam, isModal, testerName, examValue } = useStore();
  const { closeModal, updateTest } = useStore();

  const [minutes, setMinutes] = useState("00");
  const [secs, setSecs] = useState("00");
  const [millis, setMillis] = useState("00");

  const [points, setPoints] = useState('0');

  useEffect(() => {
    if (isModal) {
      if (exam === 'speed' || exam === 'stamina' || exam === 'climbing') {
        const toMilli = Math.round((examValue % 1) * 100);
        const pureSeconds = Math.floor(examValue);

        const toMin = Math.floor(pureSeconds / 60);
        const toSec = pureSeconds % 60;
        setMinutes(toMin.toString().padStart(2, "0"));
        setSecs(toSec.toString().padStart(2, "0"));
        setMillis(toMilli.toString().padStart(2, "0"));
      } else {
        setPoints(examValue.toString());
      }
    }
  }, [isModal, examValue]);


  const pad2 = (val: string | number): string =>
    val.toString().padStart(2, '0');

  const handleBlur = (val: string, setter: (v: string) => void) => {
    let num = parseInt(val, 10);
    if (isNaN(num) || num < 0) num = 0;
    if (num > 59) num = 59;
    setter(pad2(num));
  };

  const handleBlurPoints = (val: string, setter: (v: string) => void) => {
    let num = parseInt(val, 10);
    if (isNaN(num) || num < 0) num = 0;
    if (num > 10) num = 10;
    setter(num.toString());
  };

  const handleSave = () => {
    if (exam === 'speed' || exam === 'stamina' || exam === 'climbing') {
      const min = parseInt(minutes, 10) || 0;
      const sec = parseInt(secs, 10) || 0;
      const milli = parseInt(millis, 10) || 0;
      updateTest(min * 60 + sec + milli / 100);
    } else {
        updateTest(parseInt(points, 10));
      }
    closeModal();
  };

  return (
    <CustomAlert visible={isModal} 
      title={testerName}
      buttonText='Save'
      handleYes={handleSave}
      onClose={closeModal}>

          <View style={styles.inputRow}>
            <Text style={[styles.colon, {marginRight: 16}]}>Enter {exam}</Text>

            {(exam === 'speed' || exam === 'stamina' || exam === 'climbing') && <>
            <TextInput style={styles.input} keyboardType="numeric" maxLength={2} placeholder="00"
              value={minutes}
              onChangeText={setMinutes}
              onBlur={() => handleBlur(minutes, setMinutes)}
            />
            <Text style={styles.colon}>:</Text>
            <TextInput style={styles.input} keyboardType="numeric" maxLength={2} placeholder="00"
              value={secs}
              onChangeText={setSecs}
              onBlur={() => handleBlur(secs, setSecs)}
            /></>}

            {exam === 'stamina' && <>
            <Text style={styles.colon}>:</Text>
            <TextInput style={styles.input} keyboardType="numeric" maxLength={2} placeholder="00"
              value={millis}
              onChangeText={setMillis}
              onBlur={() => handleBlur(millis, setMillis)}
            /></>}

            {(exam === 'evasion' || exam === 'hiding' ) && 
            <TextInput style={styles.input} keyboardType="numeric" maxLength={2} placeholder="00"
              value={points}
              onChangeText={setPoints}
              onBlur={() => handleBlurPoints(points, setPoints)}
            />}
          </View>
    </CustomAlert>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colon: {
    fontSize: 18,
    color: '#ccc',
    marginHorizontal: 4,
  },
  input: {
    width: 60,
    height: 30,
    backgroundColor: '#2E4A7C',
    textAlign: 'center',
    color: '#eee',
    fontSize: 18,
  },
});
