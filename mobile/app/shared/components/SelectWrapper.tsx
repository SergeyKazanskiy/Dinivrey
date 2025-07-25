import React, { useRef, useState } from 'react';
import { Modal, TouchableOpacity, View, LayoutRectangle, StyleSheet,
    Dimensions, StyleProp, TextStyle, ViewStyle, Platform} from 'react-native';
import { Button } from '@rneui/themed';


const screenWidth = Platform.OS === 'web' ? 360 : Dimensions.get('window').width;

type SelectWrapperProps = {
  label: string;
  buttonStyle: StyleProp<ViewStyle>;
  labelStyle: StyleProp<TextStyle>;
  children: (
    close: () => void,
    position: LayoutRectangle | null
  ) => React.ReactNode;
};

export const SelectWrapper: React.FC<SelectWrapperProps> = ({ label, buttonStyle, labelStyle, children }) => {
  const buttonRef = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<LayoutRectangle | null>(null);

  const open = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({ x: 8, y: y + height + 4, width, height });
      setVisible(true);
    });
  };

  const close = () => setVisible(false);

  return (
    <View ref={buttonRef} >
        <Button title={label}
            type='outline' 
            buttonStyle={buttonStyle}
            titleStyle={labelStyle}
            onPress={open}
        />
      
      <Modal transparent visible={visible} animationType="fade" >
        <TouchableOpacity style={styles.backdrop} activeOpacity={1}
          onPress={close}
        >
          {position && (
            <View style={[styles.modalContent,
              { width: screenWidth - 16}, { top: position.y, left: position.x }]}>
              {children(close, position)}
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  modalContent: {
    position: 'absolute',
    borderRadius: 8,
    elevation: 5, // Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingVertical: 4,
  },
});
