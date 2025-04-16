import { useStore } from "../store";
import { TableView } from '../../../components/TableView';
import { ActionButton } from '../../../components/ActionButton';
import { DateMenu } from '../components/DateMenu';
import { TimeMenu } from '../components/TimeMenu';
import { TypesMenu } from '../components/TypesMenu';
import { DescMenu } from '../components/DescMenu';
import { GroupsMenu } from '../components/GroupsMenu';
import { isPast, isToday, isFuture} from '../../../shared/utils';


export const EventsView: React.FC = () => {
  const { formatedEvents, column, event_id, year, month } = useStore();
  const { openAddModal, openUpdateModal, openDeleteModal, selectCell } = useStore();

  const columns = [
    {name: 'date', title: 'Date', width: '13%'},
    {name: 'time', title: 'Time', width: '12%'},
    {name: 'type', title: 'Type', width: '14%'},
    {name: 'desc', title: 'Description', width: '34%'},
    {name: 'group1', title: 'Group', width: '13%'},
    {name: 'group2', title: 'Extra', width: '13%'},
  ];
  
  const { timestamp, type, desc, group1_id, group2_id, groups } = useStore();
  const { updateTimestamp, updateType, updateDesc, updateGroup1, updateGroup2 } = useStore();
  const past = timestamp === 0 ? false : isPast(timestamp);

  return (
    <>
      <TableView columns={columns} data={formatedEvents} selected={{id: event_id, column}}
        onClick={selectCell} onUpdate={openUpdateModal} onDelete={openDeleteModal}>

        {column === 'date' && !past && <DateMenu timestamp={timestamp} setDate={updateTimestamp}/>}
        {column === 'time' && !past && <TimeMenu timestamp={timestamp} setTime={updateTimestamp}/>}

        {column === 'type' && !past && <TypesMenu type={type} setType={updateType}/>}
        {column === 'desc' && <DescMenu desc={desc} setDesc={updateDesc}/>}
        
        {column === 'group1' && !past && <GroupsMenu groupId={group1_id} groups={groups} setGroup={updateGroup1}/>}
        {column === 'group2' && !past && <GroupsMenu groupId={group2_id} groups={groups} setGroup={updateGroup2}/>}
      </TableView>

      <ActionButton type="add"
        available={true}
        onClick={openAddModal}/> 
    </>
  )
};