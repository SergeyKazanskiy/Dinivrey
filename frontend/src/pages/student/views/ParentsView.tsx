import { Text, Container, Flex, Button, ButtonGroup, useDisclosure } from "@chakra-ui/react";
import { useStore } from "../store";
import { useStore as useStudentsStore } from "../../students/store";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { ParentRecord } from '../components/ParentRecord';
import { DeletePopover } from '../../../components/DeletePopover';


export const ParentsView: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { camp_id, group_id, first_name, last_name } = useStore();
  const { parents, isProfileChanged, isParentsChanged, isAddressChanged, isGroupsChanged } = useStore();
  const { setParentName, setParentPhone, setParentEmail, updateStudent } = useStore();
  const { studentId, updateStudents, deleteStudent } = useStudentsStore();

  function handleUpdate() {
    //alert(camp_id + " " + group_id+ " " + first_name+ " " + last_name)
    if (camp_id === 0 || group_id === 0 || first_name === '' || last_name === '') {
      alert('Not all required fields are filled in');
    } else {
      updateStudent((student) => {updateStudents(student)});
    }
  }

  return (
    <Container style={screenStyles.widget} h='110px'>
      <Flex justify="space-between" align="center">
        <Text style={widgetStyles.title}>Parent contacts</Text>

        <ButtonGroup >
          <DeletePopover title='Delete student!' isDisabled={false}
            isOpen={isOpen} onOpen={onOpen} onClose={onClose} onDelete={()=>deleteStudent(studentId)}/>
          
          <Button size='sm' variant='solid' colorScheme='blue'
            isDisabled={!isProfileChanged && !isParentsChanged && !isAddressChanged && !isGroupsChanged}
            onClick={handleUpdate}>
            Update
          </Button>
        </ButtonGroup>
      </Flex>             
      
      <ParentRecord name={parents[0].name} phone={parents[0].phone} email={parents[0].email}
        setName={(val) => setParentName(val, 0)}
        setPhone={(val) => setParentPhone(val, 0)}
        setEmail={(val) => setParentEmail(val, 0)}/>
      <ParentRecord name={parents[1].name} phone={parents[1].phone} email={parents[1].email}
        setName={(val) => setParentName(val, 1)}
        setPhone={(val) => setParentPhone(val, 1)}
        setEmail={(val) => setParentEmail(val, 1)}/>
    </Container>
  );
};

