import { Flex, Box, Container, Text } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';
import { EffectIcon } from '../../../components/EffectIcon';
import { effectNames } from '../../../shared/constants';


export function EffectsView() {
    const { effect } = useStore();
    const { setEffect } = useStore();
  
    return (
      <Container>
          <Flex justifyContent="center" mt="4px" gap="4px">
              {effectNames.map((item, index) => (
                  <Box bg={effect===item ? 'gray.200' : 'unset' }
                      borderColor='gray.400' borderWidth={1} borderRadius={8}
                      onClick={() => setEffect(item, index)}>
                      <EffectIcon key={index} selectedEffect={item} />
                  </Box>
              ))}
          </Flex>
      </Container>
    );
  };

  /*
const icons: IconEffect[] = [
  { uri: "https://example.com/icon1.gif", effects: ["scale", "rotate"], duration: 500, borderColor: "red" },
  { uri: "https://example.com/icon2.gif", effects: ["fade"], duration: 800, borderColor: "blue" },
  { uri: "https://example.com/icon3.gif", effects: ["jump", "pulse"], duration: 600, borderColor: "green" },
  { uri: "https://example.com/icon4.gif", effects: ["ripple"], duration: 700, borderColor: "purple" },
];

const IconList: React.FC = () => {
  return (
    <Flex justifyContent="center" mt="50px" gap="10px">
      {icons.map((icon, index) => (
        <AnimatedIcon key={index} id={String(index)} {...icon} />
      ))}
    </Flex>
  );
};
*/