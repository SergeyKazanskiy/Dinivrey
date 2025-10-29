import React, { useRef, useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, LayoutRectangle, Text } from 'react-native';


interface Props {
  title: string;
  children: React.ReactNode;
  buttonStyle?: object;
  textStyle?: object;
  h?: number;
  w?: number;
  onClick?: () => void;
}

export const PopoverButton: React.FC<Props> = ({
    title, children, buttonStyle, textStyle, h = 150, w = 300, onClick
}) => {
  const buttonRef = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<LayoutRectangle | null>(null);

  const open = () => {
    onClick?.();

    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({ x: x - w + 72, y: y + height, width, height });
      setVisible(true);
    });
  };

  const close = () => setVisible(false);

  return (
    <>
      <TouchableOpacity ref={buttonRef} onPress={open} style={[styles.button, buttonStyle]}>
        <Text style={[{alignSelf: 'center'}, textStyle]}>{visible ? 'Close' : title}</Text>
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade" onRequestClose={close}>
        <TouchableOpacity style={styles.backdrop} onPress={close} activeOpacity={1} />
        {position && (
          <View style={[ styles.popover, { top: position.y + 2, left: position.x, height: h, width: w }]}>
            {children}
          </View>
        )}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 8,
    height: 32,
    marginTop: 12,
    width: 72
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  popover: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 999,
  },
});
