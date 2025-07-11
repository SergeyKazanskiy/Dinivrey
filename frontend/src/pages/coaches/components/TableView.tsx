import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";
import { DeleteMenu } from './DeleteMenu';


interface Props<T> {
  columns: { name: string, title: string, width: string }[];
  data: T[];
  selected: { id: number, column: string };
  children?: React.ReactNode;
  onClick: (row: number ) => void;
  onDelete?: (id: number) => void;
}

export function TableView<T extends Record<string, any>>(
  { columns, data, selected, children, onClick, onDelete }: Props<T>) {
  return (
    <>
    <Table variant="simple" size='sm' mr={1} my={1}
      sx={{ "th, td": { borderRight: "1px solid", borderColor: "gray.200" }}}
    >
      <Thead>
        <Tr>
          {onDelete && <Th></Th>}
          {columns.map((col, index) => (
            <Th key={index} width={col.width} color='red.500'>{col.title}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => (
          <Tr key={item.id} _hover={{ bg: "gray.100", cursor: "pointer" }}>
            <Td bg='gray.100' p={0}>
              {selected.id === item.id && onDelete && <DeleteMenu onDelete={() => onDelete(item.id)}/>}
            </Td>  
            {columns.map((col, colInx) => (
              <Td key={colInx} style={{color: '#444'}}  p={1}
                onClick={() => onClick(item.id)}>

                <Flex justifyContent='space-between'>
                  {item[col.name]}
                  {selected.id === item.id && selected.column === col.name}
                </Flex>
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>

    {children}
    </>
  );
}

/*  bg={selected.id === item.id && selected.column === col.name ? 'red.100' : 'unset'}*/