// src/components/ProfileCell.tsx
import React from "react";
import { Select } from "@chakra-ui/react";
import { widgetStyles } from '../shared/appStyles'


interface Props {
  value: string;
  options: string[];
  onChange: (value: string ) => void;
  w1: string;
}

export const SimpleSelect: React.FC<Props> = ({ value, options, onChange, w1 }) => {
  return (
      <Select placeholder='Select' style={widgetStyles.value} size='sm' value={value}
        fontWeight="medium" borderColor='gray.200' w={w1}
        onChange={(e) => onChange(e.target.value)}>
          {options.map((option, inx) => (
            <option key={inx} value={option}>{option}</option>
          ))}
      </Select>
  );
};
