import { Text, HStack } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'


interface CellProps {
  title: string;
  value: string;
  children: React.ReactNode;
}

export function MenuCell({ title, value, children }: CellProps) {
  return (
    <HStack alignContent='start' p='2px'>
      <Text w='60px' style={widgetStyles.text}>{title}:</Text>
      <HStack borderWidth={1} borderColor='gray.200' px={2}>
        <Text w='230px' style={widgetStyles.value}>{value}</Text>
        {children}
      </HStack>
    </HStack>
  );
}
