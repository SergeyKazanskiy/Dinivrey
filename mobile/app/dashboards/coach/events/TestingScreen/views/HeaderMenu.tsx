import { StyleSheet, Text, View, Modal, TouchableOpacity, TouchableWithoutFeedback, Platform} from 'react-native';


interface Props {
  isOpen: boolean;
  items: string[];
  onItem: (item: string) => void;
  onClose: () => void;
  containerStyle: object;
  textStyle: object;
};
  
export const HeaderMenu: React.FC<Props> = ({
  isOpen, items, onItem, onClose, containerStyle, textStyle}) => {
  return (
    <Modal transparent visible={isOpen} animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
          <View style={[styles.backdrop, styles.wrapper, Platform.OS === 'web' && styles.webWrapper]}>

            <View style={[styles.menuContainer, containerStyle]}>
              {items.map((item, index) => (

                <TouchableOpacity key={index} style={[styles.menuItem]}
                  onPress={() => { onItem(item); onClose();}} >
                  <Text style={[styles.menuText, textStyle]}>{item}</Text>
                </TouchableOpacity>
              ))}
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
  menuContainer: {
    backgroundColor: 'white',
    margin: 8,
    padding: 8,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  menuItem: {
    padding: 12,
  },
  menuText: {
    fontSize: 16
  },
});