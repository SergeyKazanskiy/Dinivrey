import { HStack, CloseButton } from "@chakra-ui/react";
import { useStore } from '../store';
import { ProfileSelect } from '../../../components/ProfileSelect';


export const GroupFilter: React.FC = () => {
    const { groups, group_id } = useStore();
    const { selectGroup } = useStore();

    return (
        <HStack mt='4px' bg='white' borderWidth={1} borderColor='gray.300' px={3} h='35px'>
            <ProfileSelect label="Group" value={group_id} options={groups} w1='52px' w2='140px'
                onChange={(value) => selectGroup(value)}/>

            <CloseButton size='sm' color='gray.500'
                onClick={() => selectGroup(0)}/>
        </HStack>    
    )
};
