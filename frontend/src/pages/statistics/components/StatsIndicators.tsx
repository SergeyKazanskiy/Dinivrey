import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';


type Stat = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  stats: [number, number, number, number, number];
};

const labels = ['Climbing', 'Stamina', 'Speed', 'Evading', 'Hiding'];
const colors = ['#f59e0b', '#e81cbf', '#fef08a', '#4ade80', '#38bdf8'];

export const StatsIndicators: React.FC<Props> = ({ stats }) => {
  const items: Stat[] = stats.map((value, index) => ({
    label: labels[index],
    value,
    color: colors[index],
  }));

  return (
    <Box p={4}>
      {items.map((item, index) => {
        const fillPercent = Math.max(Math.min(item.value / 6, 1), 0) * 100;

        return (
          <Flex key={index} position="relative" align="center" mb={2}>
            {/* Circle */}
            <Flex position="absolute" w="36px" h="36px"
              borderRadius="full" borderWidth="4px" borderColor={item.color} bg="black"
              justify="center" align="center" zIndex={1}
            >
              <Text color="white" fontSize="sm">
                {item.value.toFixed(1)}
              </Text>
            </Flex>

            {/* Gradient bar */}
            <Box ml="18px" w="88px" h="36px" bg="black" position="relative" overflow="hidden" borderRadius="md">
              <Box position="absolute" top={0} left={0}
                h="100%" w={`${fillPercent}%`} bgGradient={`linear(to-r, ${item.color}, black)`}
              />
            </Box>

            {/* Label */}
            <Text ml={2} bg="black" color="gray.200" fontSize="sm" px={2} py={1} borderRadius="md">
              {item.label}
            </Text>
          </Flex>
        );
      })}
    </Box>
  );
};
