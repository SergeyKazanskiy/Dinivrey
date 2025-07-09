import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";


interface Props<T> {
  columns: { name: string, title: string, width: string }[];
  data: T[];
  selected: { id: number, column: string };
  children: React.ReactNode;
  onClick: (row: number ) => void;
}

export function TableView<T extends Record<string, any>>(
  { columns, data, selected, children, onClick }: Props<T>) {
  return (
    <Table variant="simple" size='sm' m={2}
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
              <Td key={colInx} style={{color: '#444'}}
                onClick={() => onClick(item.id)}>

                <Flex justifyContent='space-between'>
                  {item[col.name]}
                  {selected.id === item.id && selected.column === col.name && children}
                </Flex>
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

/*  bg={selected.id === item.id && selected.column === col.name ? 'red.100' : 'unset'}*/