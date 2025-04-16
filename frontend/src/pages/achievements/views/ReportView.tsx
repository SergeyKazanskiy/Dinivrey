import { Flex, Box, Container, Text, VStack, HStack } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';
import { EffectIcon } from '../../../components/EffectIcon';


export function ReportView() {
    const { report } = useStore();
    const { getAchieveReport } = useStore();
  
    return (
      <VStack h='736px' w='440px' align='start' mb={4} p={4}>
        <HStack>
          <Text as='b' fontSize={17} color='blue.500'>Earned By:</Text>
          <Text fontSize={17} color='#F29F56'>{`${report.earned} users.`}</Text>
        </HStack>
        <HStack>  
          <Text as='b' fontSize={17} color='blue.500'>Percentage Earned:</Text>
          <Text fontSize={17} color='#F29F56'>{`${report.percentage} %.`}</Text>
        </HStack>
        <HStack>  
          <Text as='b' fontSize={17} color='blue.500'>Last Earned By:</Text>
          <Text fontSize={17} color='#F29F56'>{`${report.firstName} ${report.lastName} (Date: ${report.date}).`}</Text>
        </HStack>
      </VStack>
    );
  };
