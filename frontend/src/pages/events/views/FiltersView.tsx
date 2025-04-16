import { Box, SimpleGrid } from "@chakra-ui/react";
import { DateFilter } from '../components/DateFilter';
import { TypesFilter } from '../components/TypesFilter';
import { CampFilter } from '../components/CampFilter';
import { GroupFilter } from '../components/GroupFilter';


export const FiltersView: React.FC = () => {

    return (
        <Box bg='gray.200' borderWidth='1px' borderColor='gray.300' px={4}>
            <SimpleGrid display='flex' flexWrap='wrap' justifyContent='flex-start' gap={6}>
                <CampFilter/>
                <DateFilter/>
                <TypesFilter/>
                <GroupFilter/>
            </SimpleGrid>
        </Box>
    )
};

