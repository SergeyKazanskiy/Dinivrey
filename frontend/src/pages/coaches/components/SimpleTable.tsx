import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";
import { DeleteMenu } from './DeleteMenu';


interface Props<T> {
  columns: { name: string, title: string, width: string }[];
  data: T[];
}

export function SimpleTable<T extends Record<string, any>>({ columns, data }: Props<T>) {
  return (
    <Table variant="simple" size='sm' mr={1} my={1}
      sx={{ "th, td": { borderRight: "1px solid", borderColor: "gray.200" }}}
    >
      <Thead>
        <Tr>
          {columns.map((col, index) => (
            <Th key={index} width={col.width} color='red.500'>{col.title}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => (
          <Tr key={item.id} _hover={{ bg: "gray.100", cursor: "pointer" }}>
            {columns.map((col, colInx) => (
              <Td key={colInx} style={{color: '#444'}} p={1}>
                  {item[col.name]}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

/*  bg={selected.id === item.id && selected.column === col.name ? 'red.100' : 'unset'}*/