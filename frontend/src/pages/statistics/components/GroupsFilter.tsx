import { Button, HStack } from "@chakra-ui/react";
import { useStore } from '../store';


export const GroupsFilter: React.FC = () => {
  const { groupsAchieves, groupAchieve_id } = useStore();
  const { selectGroupAchieve } = useStore();

  return (
    <HStack bg='white' mx={1}>

      {groupsAchieves.map((item, inx) => {
        const label =  item.group_name + ' (' + item.achieves_count + ')'

        return (<Button key={inx} bg='unset' color='blue.500' fontWeight='middle' w='64px'
                  sx={item.group_id === groupAchieve_id ? { textDecoration: "underline" } : {}} fontSize={16}
                  onClick={() => selectGroupAchieve(item.group_id)}>

                  {label}
                </Button>)
      })}
    </HStack>
  );
};
