// src/components/ProfileCell.tsx
import React from "react";
import { Flex, Text, Input } from "@chakra-ui/react";
import { widgetStyles } from '../shared/appStyles'


interface Props {
  label: string;
  value: string | number;
  onChange: (value: string | number ) => void;
  type?: "text" | "number";
  maxLength: number;
  w1: string;
  w2: string;
  isRequired?: boolean;
}

const ProfileCell: React.FC<Props> = ({ label, value, onChange, type = "text", maxLength, w1, w2, isRequired }) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (type === "number") {
      const numericValue = parseInt(inputValue, 10) || 0;
      onChange(numericValue);
    } else {
      if (!maxLength || inputValue.length <= maxLength) {
        onChange(inputValue);
      }
    }
  };

  return (
    <Flex alignItems='center'>
      <Text style={widgetStyles.text} fontWeight="medium" minW={w1}>
        {label}:
      </Text>
      <Input size="sm" style={widgetStyles.value} fontWeight="medium" w={w2}
        value={value} type={type}
        borderColor={isRequired && value === '' ? 'red.400' : 'gray.200'}
        onChange={handleInputChange}
      />
    </Flex>
  );
};

export default ProfileCell;

//maxLength={maxLength}