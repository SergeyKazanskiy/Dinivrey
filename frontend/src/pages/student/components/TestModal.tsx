import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import ProfileCell from "../../../components/ProfileCell";
import { useStore } from "../store";
import { widgetStyles } from "../../../shared/appStyles";


export function TestModal() {
  const { speed, stamina, climbing, evasion, hiding, isTestUpdate } = useStore();
  const {setSpeed, setStamina, setClimbing, setEvasion, setHiding, updateTest, closeTestModal } = useStore();

  return (
    <Modal isOpen={isTestUpdate} onClose={closeTestModal} isCentered>
      <ModalContent w='320px'>
        <ModalHeader  bg='gray.100' style={widgetStyles.alert}>Current test</ModalHeader>

        <ModalBody borderWidth={1} borderColor='gray.100'>
          <ProfileCell label="Speed" value={speed} maxLength={4} w1='210px' w2='60px'
            onChange={(value) => setSpeed(Number(value))}/>
          <ProfileCell label="Stamina" value={stamina} maxLength={4} w1='210px' w2='60px'
            onChange={(value) => setStamina(Number(value))}/>
          <ProfileCell label="Climbing" value={climbing} maxLength={4} w1='210px' w2='60px'
            onChange={(value) => setClimbing(Number(value))}/>
          <ProfileCell label="Evasion" value={evasion} maxLength={4} w1='210px' w2='60px'
            onChange={(value) => setEvasion(Number(value))}/>
          <ProfileCell label="Hiding" value={hiding} maxLength={4} w1='210px' w2='60px'
            onChange={(value) => setHiding(Number(value))}/>
        </ModalBody>

        <ModalFooter>
          <Button size='sm' variant='outline' colorScheme='blue' mr={2}
            onClick={() => closeTestModal()}>Cancel</Button>
          <Button size='sm' variant='solid' colorScheme='blue' px={5}
            onClick={() => {updateTest(); closeTestModal()}}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}