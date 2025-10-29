import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';


interface BadgeProps {
  value?: string | number | React.ReactNode;
  status?: 'success' | 'error' | 'warning' | 'primary';
  containerStyle?: ViewStyle;
  badgeStyle?: ViewStyle;
  textStyle?: TextStyle;
  size?: number;
}

export const Badge: React.FC<BadgeProps> = ({
  value,
  status = 'primary',
  containerStyle,
  badgeStyle,
  textStyle,
  size = 18,
}) => {
  const backgroundColor = {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    primary: '#2196F3',
  }[status];

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.badge,
          {
            backgroundColor,
            minWidth: size * 1.5,
            height: size,
            borderRadius: size / 2,
            paddingHorizontal: size * 0.4,
          },
          badgeStyle,
        ]}
      >
        {typeof value === 'string' || typeof value === 'number' ? (
          <Text
            style={[
              styles.text,
              { fontSize: size * 0.6 },
              textStyle,
            ]}
          >
            {value}
          </Text>
        ) : (
          value
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
});
