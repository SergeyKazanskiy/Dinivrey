import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { cellStyles, groupStyles } from '../styles/appStyles';
import { Ionicons } from '@expo/vector-icons';


export type Props = {
  first_name: string;
  last_name: string;
  checked: boolean;
  onCheck: () => void;
  comment: string;
  onUpdate: (comment: string) => void;
  onSelect: () => void;
};
  
export const AttendanceCell: React.FC<Props> =({first_name, last_name, checked, onCheck, comment, onUpdate, onSelect}) => {
  const [expanded, setExpanded] = useState(false);
  const [newComment, setComment] = useState(comment);

  return (
    <View style={[styles.container]}>
      <View style={styles.section}>
        <Ionicons name={expanded ? 'chevron-up-outline' : 'chevron-down-outline'} size={20} color={'#bbb'}
          onPress={() => {expanded ? setExpanded(false) : setExpanded(true)}}
        />
        <Text style={styles.text} onPress={onSelect}>
          {first_name} {last_name}
        </Text>
        <CheckBox
          checked={checked}
          onPress={onCheck}
          iconType="material-community"
          checkedIcon="checkbox-outline"
          uncheckedIcon={'checkbox-blank-outline'}
          containerStyle={{margin:0, padding: 0, backgroundColor: 'rgba(45, 75, 10, 0.3)'}}
          checkedColor='#ddd'
        />
      </View>

      {expanded &&
        <TextInput multiline numberOfLines={4} textAlignVertical="top"
          value={newComment}
          onChangeText={setComment}
          onBlur={() => onUpdate(newComment)}
          style={styles.textArea}
          placeholder="Enter comment"
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    marginVertical: 2
  },
  section: {
    paddingLeft: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#ddd',
    fontWeight: '400',
    fontSize: 17,
    width: '100%',
    paddingLeft: 12,
    paddingTop: 2
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: 'gold',
    marginTop: 8,
    marginBottom: 4,
  },
  textArea: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
    minHeight: 10,
    color: '#bbb'
  },
});
