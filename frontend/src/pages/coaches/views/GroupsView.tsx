import { Container } from "@chakra-ui/react";
import { useStore } from '../store';
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { TableView } from '../components/TableView';
import { GroupsPopover } from '../components/GroupsPopover';
import { objectToJson } from "../../../shared/utils";


interface Props {
  coach_id: number;
}

export const GroupsView: React.FC<Props> = ({ coach_id }) => {
  const { coachGroups, coach_group_id, camp_id } = useStore();
  const { selectCoachGroup, addCoachGroup, removeCoachGroup } = useStore();
  //alert(objectToJson(coachGroups))
  const groups = coachGroups.filter(el => el.coache_id === coach_id);

  const columns = [
      {name: 'name', title: 'Group', width: '20%'},
      {name: 'desc', title: 'Description', width: '80%'},
    ];
   
    return (
      <Container style={screenStyles.widget} h='172px' w='380px'>
        <TableView columns={columns} data={groups} selected={{id: coach_group_id, column: 'coach'}}
          onClick={selectCoachGroup} onDelete={removeCoachGroup}>
            
          <GroupsPopover camp_id={camp_id} onSelect={(group_id)=>addCoachGroup(coach_id, group_id)}/>
        </TableView>
      </Container>
    )
  };