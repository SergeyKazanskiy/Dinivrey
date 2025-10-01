import { useEffect } from 'react';
import { HStack, Container } from "@chakra-ui/react";
import { useStore } from "../store";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { ProfileSelect } from "../../../components/ProfileSelect";


export const GroupsView: React.FC = () => {
  const { groups, extra_groups } = useStore();
  const { group_id, group_extra_id } = useStore();
  const { setGroup, setGroupExtra, checkGroups } = useStore();

  useEffect(() => {
    checkGroups();
  }, [group_id, group_extra_id]);

  return (
    <Container style={screenStyles.widget} h='48px'>                
      <HStack justifyContent='space-around' pt='8px'>
        <ProfileSelect label="Group" value={group_id} options={groups} w1='50px' w2='130px' isRequired
          onChange={(value) => setGroup(value)}/>
        <ProfileSelect label="Extra group" value={group_extra_id} options={extra_groups} w1='90px' w2='130px'
          onChange={(value) => setGroupExtra(value)}/>
      </HStack>
    </Container>
  );
};
