import { Button, HStack } from "@chakra-ui/react";
import { useStore } from '../store';


export const ExamsFilter: React.FC = () => {
  const { test, testNames } = useStore();
  const { selectTest } = useStore();

  return (
    <HStack bg='white' mx={1}>

      {testNames.map((item, inx) => {
        const label = item.charAt(0).toUpperCase() + item.slice(1);

        return (<Button key={inx} bg='unset' color='blue.500' fontWeight='middle' w='64px'
                  sx={item === test ? { textDecoration: "underline" } : {}} fontSize={16}
                  onClick={() => selectTest(item)}>

                  {label}
                </Button>)
      })}
    </HStack>
  );
};
