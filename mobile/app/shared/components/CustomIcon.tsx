import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type IconType = 'material-community'; // можно расширить для других библиотек

interface ExpoIconProps {
  name: string; // имя иконки
  type?: IconType; // по умолчанию 'material-community'
  size?: number; // размер иконки
  color?: string; // цвет иконки
  style?: StyleProp<TextStyle>; // стиль обертки
  disabled?: boolean; // если true, иконка не реагирует на нажатие
  onPress?: () => void; // функция при нажатии
}

export const Icon: React.FC<ExpoIconProps> = ({
  name,
  type = 'material-community',
  size = 24,
  color = 'black',
  style,
  disabled = false,
  onPress,
}) => {
  const IconComponent = () => {
    switch (type) {
      case 'material-community':
      default:
        return <MaterialCommunityIcons name={name as any} size={size} color={color} style={style} />;
    }
  };

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <IconComponent />
      </TouchableOpacity>
    );
  }

  return <IconComponent />;
};

