// src/components/UserCard.tsx
import { Flex, Text, Image, useDisclosure, HStack, Container, VStack } from "@chakra-ui/react";
import { useStore } from "../store";
import { ProfileCell } from "../components/ProfileCell";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { DeletePopover } from '../../../components/DeletePopover';
import { objectToJson } from "../../../shared/utils";


interface Props {
  coach_id: number;
}

export const ProfileView: React.FC<Props> = ({coach_id}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { coaches, coachId } = useStore();
  const { updateCoach, deleteCoach, selectCoach } = useStore();

  const coach = coaches.find(el => el.id === coach_id)!;

  return (
    <Container style={screenStyles.widget} h='174px' w='360px' onClick={()=>selectCoach(coach_id)}>
      <HStack justifyContent='space-between'>
        <Text style={widgetStyles.title} mt="2" mb="1" cursor='pointer'>
          Personal information
        </Text>
        {coach_id === coachId &&<DeletePopover title='Delete coach!' isDisabled={false}
          isOpen={isOpen} onOpen={onOpen} onClose={onClose} onDelete={()=>deleteCoach(coach_id)}/>}
      </HStack>               
      
      <HStack align='start' mb='2px'>
        <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' boxSize='90px' mr={1} mt={1} borderRadius='25px'/>
        
        <Flex direction="column" gap="0.5">
          <ProfileCell label="First name" value={coach.first_name} maxLength={20} w1='84px' w2='140px'
            onChange={(value) => updateCoach(coach_id, { first_name: String(value) })}
          />
          <ProfileCell label="Last name" value={coach.last_name} maxLength={20} w1='84px' w2='140px'
            onChange={(value) => updateCoach(coach_id, { last_name: String(value) })}
          />
          <ProfileCell label="Phone" value={coach.phone} maxLength={10} w1='84px' w2='140px'
            onChange={(value) => updateCoach(coach_id, { phone: String(value) })}
          />
        </Flex>
      </HStack>

      <ProfileCell label="Email" value={coach.email} maxLength={10} w1='56px' w2='270px'
        onChange={(value) => updateCoach(coach_id, { email: String(value) })}
      />
    </Container>
  );
};
