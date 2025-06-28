import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, LayoutRectangle } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Или 'react-native-vector-icons/Ionicons'


export type Option = {
  id: number;
  name: string;
};

type SelectProps = {
  data: Option[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export const SelectedField: React.FC<SelectProps> = ({ data, selectedIndex, onSelect }) => {
  const buttonRef = useRef<View>(null);

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<LayoutRectangle | null>(null);

  const open = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({ x: x + width - 236, y: y + height + 2, width, height });
      setVisible(true);
    });
  };

  const handleSelect = (index: number) => {
    onSelect(index);
    setVisible(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.selectBox} ref={buttonRef}  onPress={open}>
        <Text style={styles.selectText}>{data[selectedIndex]?.name || 'Select...'}</Text>
        <Ionicons name="chevron-down" size={18} color="#ccc" />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => setVisible(false)}>
          {position && (
            <View style={[styles.modalContent, { top: position.y + 2, left: position.x, width: 240 }]}>
                <FlatList data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={styles.option} onPress={() => handleSelect(index)}>
                        <Text style={styles.item} >{item.name}</Text>
                    </TouchableOpacity>
                )}
                />
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectBox: {
    //width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2089dc',
    borderRadius: 8,
    marginVertical: 8,
    marginRight: 4,
  },
  selectText: {
    fontSize: 15,
    color: '#ccc',
    paddingRight: 12
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: '#152B52',
    borderWidth: 1,
    borderColor: '#2089dc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  item: {
    color: '#ccc',
    fontSize: 15,
    //paddingVertical: 2
  },
  option: {
    paddingVertical: 10,
  },
});