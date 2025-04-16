// src/components/UserCard.tsx
import { Flex, Text, Spacer, Switch, HStack, Container } from "@chakra-ui/react";
import { useStore } from "../store";
import ProfileCell from "../../../components/ProfileCell";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'


export const ProfileView: React.FC = () => {
  const { coacheInfo } = useStore();
  const {setCoacheInfo, saveCoacheInfo } = useStore();

  return (
    <Container style={screenStyles.widget} h='172px' w='300px'>                 
      <Text style={widgetStyles.title}  mb="2">
        Personal information
      </Text>

      <Flex direction="column" gap="0.5">
        <ProfileCell label="First name" value={coacheInfo.firstName} maxLength={20} w1='92px' w2='180px'
          onChange={(value) => setCoacheInfo({ firstName: String(value) })}
        />
        <ProfileCell label="Last name" value={coacheInfo.lastName} maxLength={20} w1='92px' w2='180px'
          onChange={(value) => setCoacheInfo({ lastName: String(value) })}
        />
        <ProfileCell label="Phone" value={coacheInfo.phone} maxLength={10} w1='62px' w2='210px'
          onChange={(value) => setCoacheInfo({ phone: String(value) })}
        />
        <ProfileCell label="Email" value={coacheInfo.email} maxLength={10} w1='62px' w2='210px'
          onChange={(value) => setCoacheInfo({ email: String(value) })}
        />
      </Flex>
    </Container>
  );
};
