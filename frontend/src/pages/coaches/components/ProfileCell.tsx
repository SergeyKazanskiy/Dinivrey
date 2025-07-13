// src/components/ProfileCell.tsx
import { useState, useEffect, useCallback } from "react";
import { Flex, Text, Input } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'


interface Props {
  label: string;
  value: string;
  onChange: (value: string ) => void;
  maxLength: number;
  w1: string;
  w2: string;
  isRequired?: boolean;
}

export const ProfileCell: React.FC<Props> = ({ label, value, onChange,  maxLength, w1, w2, isRequired }) => {
  const [val, setVal] = useState('');

  useEffect(() => {
    setVal(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
      if (!maxLength || inputValue.length <= maxLength) {
        setVal(inputValue);
      }
  };

  function handleBlur() {
     if (value !== val) {
       onChange(val);
     }
  }

  return (
    <Flex alignItems='center'>
      <Text style={widgetStyles.text} fontWeight="medium" minW={w1}>
        {label}:
      </Text>
      <Input size="sm" style={widgetStyles.value} fontWeight="medium" w={w2}
        value={val}
        type='text'
        borderColor={isRequired && value === '' ? 'red.400' : 'gray.200'}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
    </Flex>
  );
};

