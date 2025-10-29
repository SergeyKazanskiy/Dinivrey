import React from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle,
  ImageStyle,
} from 'react-native';

interface AvatarProps {
  size?: number;
  source?: { uri: string } | null;
  rounded?: boolean;
  containerStyle?: ViewStyle;
  onPress?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 40,
  source,
  rounded = false,
  containerStyle,
  onPress,
}) => {
  const radius = rounded ? size / 2 : 8;

  const imageStyle: ImageStyle = {
    width: size,
    height: size,
    borderRadius: radius,
  };

  const Wrapper = onPress ? TouchableOpacity : View;
  const WrapperProps = onPress ? { onPress, activeOpacity: 0.7 } : {};

  return (
    <Wrapper style={[styles.container, containerStyle]} {...WrapperProps}>
      {source?.uri ? (
        <Image
          source={source}
          style={[styles.image, imageStyle]}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            { width: size, height: size, borderRadius: radius },
          ]}
        />
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    backgroundColor: '#ccc',
  },
  placeholder: {
    backgroundColor: '#555',
  },
});
