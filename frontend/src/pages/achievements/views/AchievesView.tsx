import { Text, Box } from "@chakra-ui/react";
import { useStore } from "../store";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { AchievesPanel } from '../components/AchievesPanel'
import { AchieveCategories } from '../../../shared/constants';


export const AchievesView: React.FC = () => {
    const { achieves, isEditorOpened, achieveId } = useStore();
    const { selectAchieve, selectAdd } = useStore();

    const w1 = isEditorOpened ? '680px' : '1140px';

    return (
      <Box style={screenStyles.widget} h='790px' w={w1}  pt='4px'>                
        <Text style={widgetStyles.title} align='center'>Achievements</Text>

        <AchievesPanel title="Test achievements" achieves={achieves} category='Test' achieveId={achieveId}
            onClick={selectAchieve} onAddClick={()=>selectAdd(AchieveCategories[0])}/>
        <AchievesPanel title="Game achievements" achieves={achieves} category='Game' achieveId={achieveId}
            onClick={selectAchieve} onAddClick={()=>selectAdd(AchieveCategories[1])}/>
        <AchievesPanel title="Participate achievements" achieves={achieves} category='Participate' achieveId={achieveId}
            onClick={selectAchieve} onAddClick={()=>selectAdd(AchieveCategories[2])}/>
        <AchievesPanel title="Additional rewards" achieves={achieves} category='Additional' achieveId={achieveId}
            onClick={selectAchieve} onAddClick={()=>selectAdd(AchieveCategories[3])}/>
      </Box>
    )
};
