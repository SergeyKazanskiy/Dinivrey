// src/components/ProfileCell.tsx
import React from "react";
import { Flex, Text, Select } from "@chakra-ui/react";
import { widgetStyles } from '../shared/appStyles'


interface Props {
  label: string;
  value: number;
  options: {id: number, name: string}[];
  onChange: (value: number ) => void;
  w1: string;
  w2: string;
  isRequired?: boolean;
}

export const ProfileSelect: React.FC<Props> = ({ label, value, options, onChange, w1, w2, isRequired }) => {
  return (
    <Flex alignItems='baseline'>
      <Text style={widgetStyles.text} fontWeight="medium" w={w1}>
        {label}:
      </Text>
      <Select placeholder='Select' style={widgetStyles.value} size='sm' value={value} fontWeight="medium" w={w2}
        borderColor={isRequired && value === 0 ? 'red.400' : 'gray.200'}
        onChange={(e) => onChange(Number(e.target.value))}>
          {options.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
      </Select>
    </Flex>
  );
};
