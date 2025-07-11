// src/components/UserCard.tsx
import { Flex, Text, Spacer, Switch, HStack, Container } from "@chakra-ui/react";
import { useStore } from "../store";
import ProfileCell from "../../../components/ProfileCell";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { objectToJson } from "../../../shared/utils";


interface Props {
  coach_inx: number;
  coach_id: number;
}

export const ProfileView: React.FC<Props> = ({coach_inx, coach_id}) => {
  const { coaches } = useStore();
  const { updateCoach } = useStore();

  const coach = coaches[coach_inx];
  //alert(objectToJson(coach))
  return (
    <Container style={screenStyles.widget} h='172px' w='260px'>                 
      <Text style={widgetStyles.title}  mb="2">
        Personal information
      </Text>

      <Flex direction="column" gap="0.5">
        <ProfileCell label="First name" value={coach.first_name} maxLength={20} w1='92px' w2='180px'
          onChange={(value) => updateCoach(coach_id, { first_name: String(value) })}
        />
        <ProfileCell label="Last name" value={coach.last_name} maxLength={20} w1='92px' w2='180px'
          onChange={(value) => updateCoach(coach_id, { last_name: String(value) })}
        />
        <ProfileCell label="Phone" value={coach.phone} maxLength={10} w1='62px' w2='210px'
          onChange={(value) => updateCoach(coach_id, { phone: String(value) })}
        />
        <ProfileCell label="Email" value={coach.email} maxLength={10} w1='62px' w2='210px'
          onChange={(value) => updateCoach(coach_id, { email: String(value) })}
        />
      </Flex>
    </Container>
  );
};
