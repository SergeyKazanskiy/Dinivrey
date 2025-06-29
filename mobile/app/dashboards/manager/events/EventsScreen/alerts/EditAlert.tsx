import { View, Modal, TouchableWithoutFeedback, StyleSheet, Platform } from 'react-native';
import { Text } from '@rneui/themed';


interface Props {
  isOpen: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const EditAlert: React.FC<Props> = ({ isOpen, onEdit, onDelete, onClose }) => {
  return (
      <Modal transparent visible={isOpen} animationType="fade" onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={[styles.backdrop, styles.wrapper, Platform.OS === 'web' && styles.webWrapper]}>


            <View style={[ styles.popover, { top: 56, right: 16 }]}>
              <Text style={styles.menuText} onPress={onEdit}>Update event</Text>
              <Text style={styles.menuText} onPress={onDelete}>Delete event</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'flex-end', // прижатие к правому краю wrapper-а
  },
  webWrapper: {
    maxWidth: 360,
    alignSelf: 'flex-start', // чтобы wrapper не растягивался на весь экран
    width: '100%',
  },
  popover: {
    position: 'absolute',
    backgroundColor: '#152B52',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    zIndex: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuText: {
    color: '#ddd',
    fontSize: 17,
    padding: 8,
  }
});
