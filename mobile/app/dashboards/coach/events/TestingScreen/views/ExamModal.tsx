import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from '../../../../../shared/components/CustomAlert';


export function ExamModal() {
  const { exam, isModal, testerName, examValue } = useStore();
  const { closeModal, updateTest } = useStore();

  const [minutes, setMinutes] = useState("00");
  const [secs, setSecs] = useState("00");

  useEffect(() => {
    if (isModal) {
      const toMin = Math.floor(examValue / 60);
      const toSec = examValue % 60;
      setMinutes(toMin.toString().padStart(2, "0"));
      setSecs(toSec.toString().padStart(2, "0"));
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

  const handleSave = () => {
    const min = parseInt(minutes, 10) || 0;
    const sec = parseInt(secs, 10) || 0;
    updateTest(min * 60 + sec);
    closeModal();
  };

  return (
    <CustomAlert visible={isModal} 
      title={testerName}
      buttonText='Save'
      handleYes={handleSave}
      onClose={closeModal}>

          <View style={styles.inputRow}>
            <Text style={[styles.colon, {marginRight: 20}]}>Enter {exam}</Text>
            {(exam === 'speed' || exam === 'stamina' || exam === 'climbing') &&
            <TextInput style={styles.input} keyboardType="numeric" maxLength={2} placeholder="00"
              value={minutes}
              onChangeText={setMinutes}
              onBlur={() => handleBlur(minutes, setMinutes)}
            />}
            <Text style={styles.colon}>:</Text>
            <TextInput style={styles.input} keyboardType="numeric" maxLength={2} placeholder="00"
              value={secs}
              onChangeText={setSecs}
              onBlur={() => handleBlur(secs, setSecs)}
            />
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
    marginHorizontal: 8,
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
