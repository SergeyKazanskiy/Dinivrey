import {useState} from 'react';

import { StyleSheet, Text, View, TextInput} from 'react-native';
import { useStore } from '../../store';
import { CustomDialog } from '../../../../../shared/components/CustomDialog';


export function ExamView() {
  const { exam, isAlert, testerName, examValue } = useStore();
  const { setExamValue, setIsAlert } = useStore();

  const [input, setInput] = useState<string>(String(examValue));

  const handleChange = (text: string) => {

    const cleaned = text.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");

    if (parts.length > 2) return; 
    setInput(cleaned);
  };

  return (
    <View style={styles.container} >
      <CustomDialog visible={isAlert} title={testerName}
        buttonText1='Cancel' buttonText2='Save'
        onButton1={() => setIsAlert(false)} onButton2={() => setExamValue(Number(input))}>

            <View style={styles.section} >
                <Text style={styles.dialogText} >{"Enter "+exam}: </Text>
                <TextInput
                    style={styles.dialogInput}
                    onChangeText={handleChange}
                    value={input}
                    placeholder="0.0"
                    keyboardType="decimal-pad"
                />
            </View>
      </CustomDialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  dialogText: {
    fontSize: 16,
    color: '#444',
    paddingTop: 4,
    paddingRight: 4
  },
  dialogInput: {
    height: 28,
    width: 44,
    //margin: 12,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
});
