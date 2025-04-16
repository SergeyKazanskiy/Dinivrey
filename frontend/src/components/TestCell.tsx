import { Flex, Text, Input } from "@chakra-ui/react";
import { widgetStyles } from '../shared/appStyles'


interface Props {
  label: string;
  value: number;
  onChange: (value: number ) => void;
  w1: string;
  w2: string;
}

const TestCell: React.FC<Props> = ({ label, value, onChange, w1, w2 }) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue, 10) || 0;
    onChange(numericValue);
  };

  return (
    <Flex alignItems='center'>
      <Text style={widgetStyles.text} fontWeight="medium" minW={w1}>
        {label}:
      </Text>
      <Input size="sm" style={widgetStyles.value} fontWeight="medium" w={w2}
        value={value} borderColor='gray.200'
        onChange={handleInputChange}
      />
    </Flex>
  );
};

export default TestCell;


//maxLength={maxLength}