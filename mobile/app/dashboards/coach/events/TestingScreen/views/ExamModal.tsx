import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { useStore } from '../../store';
import { CustomDialog } from '../../../../../shared/components/CustomDialog';


export function ExamModal() {
  const { exam, isModal, testerName, examValue } = useStore();
  const { closeModal, updateTest } = useStore();

  const [input, setInput] = useState<string>(String(examValue));
  
  useEffect(() => {
    setInput(String(examValue));
  }, [examValue]);


  const handleChange = (text: string) => {

    const cleaned = text.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");

    if (parts.length > 2) return; 
    setInput(cleaned);
  };

  return (
    <View style={styles.container} >
      <CustomDialog visible={isModal} title={testerName}
        buttonText1='Cancel' buttonText2='Save'
        onButton1={closeModal} onButton2={() => updateTest(Number(input))}>

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
    fontWeight: '400',
    color: '#222',
    paddingTop: 4,
    paddingRight: 4
  },
  dialogInput: {
    height: 28,
    width: 44,
    fontSize: 15,
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: '#FFFACD',
  },
});
