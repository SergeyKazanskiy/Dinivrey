// src/components/ProfileCell.tsx
import React from "react";
import { Flex, Text, Select } from "@chakra-ui/react";
import { widgetStyles } from '../shared/appStyles'

interface Props {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string ) => void;
  w1: string;
  w2: string;
}

export const EnumSelect: React.FC<Props> = ({ label, value, options, onChange, w1, w2 }) => {
  return (
    <Flex alignItems='baseline'>
      <Text style={widgetStyles.text} fontWeight="medium" w={w1}>
        {label}:
      </Text>
      <Select placeholder='Select' style={widgetStyles.value} size='sm' defaultValue={value}
        fontWeight="medium" borderColor='gray.200' w={w2}
        onChange={(e) => onChange(e.target.value)}>
          {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
      </Select>
    </Flex>
  );
};
