export type Measurement2 = {
  date: string;
  speed: number;
  stamina: number;
  climbing: number;
  evasion: number;
  hiding: number;
};

/*
import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Input, Button } from "@chakra-ui/react";
import { useStore } from "./store";

const MeasurementTable: React.FC = () => {
  const { measurements, addMeasurement, newMeasurement, setNewMeasurement } = useStore();

  const handleChange = (field: keyof Measurement, value: string) => {
    setNewMeasurement({ [field]: field === "date" ? value : parseFloat(value) });
  };

  const handleAdd = () => {
    if (newMeasurement.date) {
      addMeasurement();
    }
  };

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Speed</Th>
            <Th>Stamina</Th>
            <Th>Climbing</Th>
            <Th>Evasion</Th>
            <Th>Hiding</Th>
          </Tr>
        </Thead>
        <Tbody>
          {measurements.map((m, index) => (
            <Tr key={index}>
              <Td>{m.date}</Td>
              <Td>{m.speed}</Td>
              <Td>{m.stamina}</Td>
              <Td>{m.climbing}</Td>
              <Td>{m.evasion}</Td>
              <Td>{m.hiding}</Td>
            </Tr>
          ))}
          <Tr>
            <Td><Input value={newMeasurement.date || ""} onChange={(e) => handleChange("date", e.target.value)} placeholder="Date" /></Td>
            <Td><Input value={newMeasurement.speed || ""} onChange={(e) => handleChange("speed", e.target.value)} placeholder="Speed" /></Td>
            <Td><Input value={newMeasurement.stamina || ""} onChange={(e) => handleChange("stamina", e.target.value)} placeholder="Stamina" /></Td>
            <Td><Input value={newMeasurement.climbing || ""} onChange={(e) => handleChange("climbing", e.target.value)} placeholder="Climbing" /></Td>
            <Td><Input value={newMeasurement.evasion || ""} onChange={(e) => handleChange("evasion", e.target.value)} placeholder="Evasion" /></Td>
            <Td><Input value={newMeasurement.hiding || ""} onChange={(e) => handleChange("hiding", e.target.value)} placeholder="Hiding" /></Td>
          </Tr>
        </Tbody>
      </Table>
      <Button onClick={handleAdd} mt={2} colorScheme="blue">Add Measurement</Button>
    </Box>
  );
};

export default MeasurementTable;
*/