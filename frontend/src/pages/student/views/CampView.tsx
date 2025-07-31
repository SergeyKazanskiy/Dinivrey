import { Container, Text, Select } from "@chakra-ui/react";
import { useStore as useStudentsStore } from "../../students/store";
import { useStore } from "../store";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'


export const CampView: React.FC = () => {
  const { camps } = useStudentsStore();
  const { selectCamp } = useStudentsStore(); //???

  const { camp_id } = useStore();
  const { setCamp, setGroup, setGroupExtra, checkGroups } = useStore();

  function handleChangeCamp(value: number) {
    if (value !== camp_id) {
      setCamp(value);
      setGroup(0);
      setGroupExtra(0);
      //selectCamp(value);
      checkGroups();
    } 
  }

  return (
    <Container style={screenStyles.widget} h='56px' w='140px'>
      <Text style={widgetStyles.text} fontWeight="medium" pl={1}>Camp</Text>

      <Select style={widgetStyles.value} size='sm' value={camp_id} w='110px' borderColor='gray.200'
        onChange={(e) => handleChangeCamp(Number(e.target.value))}>
          {camps.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
      </Select>         
    </Container>
  );
};
