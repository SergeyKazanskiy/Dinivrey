import { useState, useEffect } from 'react';
import { Button, Flex, Text, Input } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useStore } from '../store';
import { widgetStyles } from '../../../shared/appStyles';


export function ExamModal() {
  const { exam, isTestUpdate, testValue } = useStore();
  const { closeTestModal, updateTest } = useStore();

  const [minutes, setMinutes] = useState('00');
  const [secs, setSecs] = useState('00');
  const [millis, setMillis] = useState('00');
  const [points, setPoints] = useState('0');

  useEffect(() => {
    if (isTestUpdate) {
      if (exam === 'speed' || exam === 'stamina' || exam === 'climbing') {
        const toMilli = Math.round((testValue % 1) * 100);
        const pureSeconds = Math.floor(testValue);
        const toMin = Math.floor(pureSeconds / 60);
        const toSec = pureSeconds % 60;
        setMinutes(toMin.toString().padStart(2, '0'));
        setSecs(toSec.toString().padStart(2, '0'));
        setMillis(toMilli.toString().padStart(2, '0'));
      } else {
        setPoints(testValue.toString());
      }
    }
  }, [isTestUpdate, testValue]);

  const pad2 = (val: string | number): string =>
    val.toString().padStart(2, '0');

  const handleBlur = (val: string, setter: (v: string) => void) => {
    let num = parseInt(val, 10);
    if (isNaN(num) || num < 0) num = 0;
    if (num > 59) num = 59;
    setter(pad2(num));
  };

  const handleBlurPoints = (val: string, setter: (v: string) => void) => {
    let num = parseInt(val, 10);
    if (isNaN(num) || num < 0) num = 0;
    if (num > 10) num = 10;
    setter(num.toString());
  };

  const handleSave = () => {
    if (exam === 'speed' || exam === 'stamina' || exam === 'climbing') {
      const min = parseInt(minutes, 10) || 0;
      const sec = parseInt(secs, 10) || 0;
      const milli = parseInt(millis, 10) || 0;
      updateTest(min * 60 + sec + milli / 100);
    } else {
      updateTest(parseInt(points, 10));
    }
    closeTestModal();
  };

  return (
    <Modal isOpen={isTestUpdate} onClose={closeTestModal} isCentered>
      <ModalOverlay />
      <ModalContent w="330px">
        <ModalHeader bg="gray.100" style={widgetStyles.alert}>Update {exam}</ModalHeader>

        <ModalBody borderWidth={1} borderColor="gray.100">
          <Flex align="center" mb={3} wrap="wrap">
            <Text mr={4}>Enter</Text>

            {(exam === 'speed' || exam === 'stamina' || exam === 'climbing') && (
              <>
                <Input width="60px" textAlign="center" bg="green.600" color="white" mr={1} maxLength={2}
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  onBlur={() => handleBlur(minutes, setMinutes)}
                />
                <Text mx={1}>:</Text>
                <Input width="60px" textAlign="center" bg="green.600" color="white" mr={1} maxLength={2}
                  value={secs}
                  onChange={(e) => setSecs(e.target.value)}
                  onBlur={() => handleBlur(secs, setSecs)}
                />
              </>
            )}
            {exam === 'stamina' && (<>
                <Text mx={1}>:</Text>
                <Input width="60px" textAlign="center" bg="green.600" color="white" maxLength={2}
                  value={millis}
                  onChange={(e) => setMillis(e.target.value)}
                  onBlur={() => handleBlur(millis, setMillis)}
                />
            </>)}
            {(exam === 'evasion' || exam === 'hiding') && (
              <Input width="60px" textAlign="center" bg="green.600" color="white" maxLength={2}
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                onBlur={() => handleBlurPoints(points, setPoints)}
              />
            )}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeTestModal} mr={3}>Cancel</Button>
          <Button onClick={handleSave} colorScheme="blue">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
