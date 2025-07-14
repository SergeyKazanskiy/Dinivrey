import { HStack, Text } from "@chakra-ui/react";
import { useStore } from '../store';


export const HeaderView: React.FC = () => {
    const { isStatictics } = useStore();
    const { selectStatistics, selectAchievements } = useStore();

    return (
        <HStack bg='gray.200' borderWidth={1} borderColor='gray.300' py={2} pl={4} w='100%' justifyContent='flex-start'>
            <Text as={isStatictics ? 'u' : 'abbr'} color='gray.600' fontSize={17} ml={3}
                cursor='pointer' mr={2} onClick={() => selectStatistics()}>

                Exams
            </Text>
            <Text as={!isStatictics ? 'u' : 'abbr'} color='gray.600' fontSize={17} 
                cursor='pointer' mr={2} onClick={() => selectAchievements()}>

                Achievements
            </Text>
        </HStack>
    )
};
