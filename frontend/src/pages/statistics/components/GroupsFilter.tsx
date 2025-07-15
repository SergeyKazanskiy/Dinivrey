import { Button, HStack } from "@chakra-ui/react";
import { useStore } from '../store';


export const GroupsFilter: React.FC = () => {
  const { groupsAchieves, groupAchieve_id } = useStore();
  const { selectGroupAchieve } = useStore();

  return (
    <HStack bg='white' mx={1} pt={1}>

      {groupsAchieves.map((item, inx) => {
        const label = item.achieves_count === 0 ?
          item.group_name : item.group_name + ' (' + item.achieves_count + ')'

        return (<Button key={inx} fontWeight={500} w='100px' fontSize={14} 
                  colorScheme="blue" h='28px'
                  variant={item.group_id === groupAchieve_id ? 'solid' : 'outline'}
                  isDisabled={item.achieves_count === 0}
                  onClick={() => selectGroupAchieve(item.group_id)}>

                  {label}
                </Button>)
      })}
    </HStack>
  );
};
