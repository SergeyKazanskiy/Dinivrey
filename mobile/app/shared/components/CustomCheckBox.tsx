import React from 'react';
import { TouchableOpacity, Text, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


type IconType = 'material-community'; 

interface ExpoCheckBoxProps {
  checked: boolean;
  onPress?: () => void;
  checkedIcon?: string;
  uncheckedIcon?: string;
  iconType?: IconType;
  checkedColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  size?: number;
  title?: string; // Новое необязательное свойство
}

export const CheckBox: React.FC<ExpoCheckBoxProps> = ({
  checked,
  onPress,
  checkedIcon = 'checkbox-outline',
  uncheckedIcon = 'checkbox-blank-outline',
  iconType = 'material-community',
  checkedColor = '#007AFF',
  containerStyle,
  textStyle,
  size = 24,
  title,
}) => {
  const IconComponent = MaterialCommunityIcons;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ flexDirection: 'row', alignItems: 'center' }, containerStyle]}
    >
      <IconComponent
        name={checked ? (checkedIcon as any) : (uncheckedIcon as any)}
        size={size}
        color={checked ? checkedColor : '#777'}
      />
      {title ? (
        <Text style={[{ marginLeft: 8, color: checked ? checkedColor : '#000' }, textStyle]}>
          {title}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

