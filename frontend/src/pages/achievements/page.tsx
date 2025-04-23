import { useEffect } from 'react';
import { Text, HStack, VStack, Button, CloseButton, useDisclosure } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useStore } from "./store";
import { screenStyles, widgetStyles } from '../../shared/appStyles'

import { AchievesView } from './views/AchievesView'
import { AchieveView } from './views/AchieveView';
import { RulesView } from './views/RulesView';
import { GifsView } from './views/GifsView';
import { EffectsView } from './views/EffectsView';
import { ReportView } from './views/ReportView';
import { DeletePopover } from '../../components/DeletePopover';


export const AchievementsPage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isEditorOpened, isReportShown, achieveId } = useStore();
    const { deleteAchieve, saveAchieve, closeAchieveView, showReportView, loadAchieves } = useStore();
    const title = isReportShown ? 'Achievement report' : 'Achievement editor';
    const w1 = isEditorOpened ? '680px' : '1140px';

    useEffect(() => {
        loadAchieves();
    }, [loadAchieves]);

    return (
        <HStack align='start' spacing={4} p={3}>
            <AchievesView/>

            {isEditorOpened && (<VStack style={screenStyles.widget} pr='2px'>
                <HStack mt={1}>
                    <RepeatIcon onClick={showReportView} />
                    <Text  mr={8} style={widgetStyles.title} mt={1}>{title}</Text>
                    <DeletePopover title='Delete achievement!' isDisabled={false}
                        isOpen={isOpen} onOpen={onOpen} onClose={onClose} onDelete={()=>deleteAchieve(achieveId)}/>
                    <Button colorScheme='blue' size='sm' onClick={saveAchieve}>Save</Button>
                    <CloseButton size='sm' onClick={closeAchieveView}/>
                </HStack>
                
                {!isReportShown && (<HStack align='start' spacing={0}>
                    <VStack h='746px' w='360px'>                
                        <AchieveView/>
                        <RulesView/>
                        <EffectsView/>
                    </VStack>
                    <GifsView/>
                </HStack>)} 
                {isReportShown && (<ReportView/>)}          
            </VStack>)}
        </HStack>
    )
};
