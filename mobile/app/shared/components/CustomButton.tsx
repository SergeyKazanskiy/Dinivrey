import React, { ReactNode } from 'react';
import { TouchableOpacity, View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';


interface ExpoButtonProps {
  children?: ReactNode; 
  icon?: React.ReactNode;
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  type?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ExpoButtonProps> = ({
  children,
  icon,
  title,
  onPress,
  disabled = false,
  type = 'solid',
  size = 'md',
  color = '#007AFF',
  buttonStyle,
  containerStyle,
  titleStyle,
}) => {
  const sizes = {
    sm: { paddingVertical: 6, paddingHorizontal: 12 },
    md: { paddingVertical: 10, paddingHorizontal: 16 },
    lg: { paddingVertical: 14, paddingHorizontal: 20 },
  };

  const backgroundColor = type === 'solid' ? (disabled ? '#ccc' : color) : 'transparent';
  const borderColor = type === 'outline' ? color : 'transparent';
  const opacity = disabled ? 0.6 : 1;

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          {
            backgroundColor,
            borderColor,
            borderWidth: type === 'outline' ? 1 : 0,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            opacity,
            ...sizes[size],
          },
          buttonStyle,
        ]}
      >
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          {icon && <View style={{marginRight: 6}}>{icon}</View>}
            {children ? (
            children
            ) : (
            <Text style={[{ color: type === 'outline' ? color : '#fff', fontSize: 16 }, titleStyle]}>
                {title}
            </Text>
            )}
        </View>    
      </TouchableOpacity>
    </View>
  );
};


