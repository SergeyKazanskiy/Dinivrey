import {Flex, Text } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'


interface Props {
    label: string;
    value: number;
    w1: string;
    w2: string;
}

export const LabelText: React.FC<Props> = ({ label, value, w1, w2 }) => {
  return (
    <Flex alignItems='baseline'>
      <Text style={widgetStyles.text} fontWeight="medium" minW={w1}>
        {label}:
      </Text>
      <Text style={widgetStyles.value} fontWeight="text" minW={w2}>
        {value}%
      </Text>
    </Flex>
  );
};
