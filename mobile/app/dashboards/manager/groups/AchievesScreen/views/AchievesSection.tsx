import { StyleSheet, Text, View } from 'react-native';
import { widgetStyles, screenStyles } from '../../../../../shared/styles/appStyles';
import { AchievesPanel } from './AchievesPanel';
import { AchievesModal } from './AchievesModal';
import { PopoverButton } from '../../../../../shared/components/PopoverButton';
import { Achieve } from '../../model';
import { useStore } from '../../store';


export type Props = {
  title: string;
  category: string;
};

export const AchievesSection: React.FC<Props> = ({ title, category}) => {
    const { studentAchieves, baseAchieves, achievement_id } = useStore();
    const { loadBaseAchieves, selectAchieve, selectAchievement} = useStore();

    return (
        <>
            <View style={styles.section}>
                <Text style={[widgetStyles.title, styles.title]}>{title}</Text>
                
                <PopoverButton title="Add" h={120} w={330}
                    buttonStyle={{ borderWidth: 1, borderColor: 'green', backgroundColor: '#2E4A7C'}}
                    textStyle={{color: '#fff'}}
                    onClick={() => loadBaseAchieves(category)}>

                    <AchievesModal achieves={baseAchieves} onClick={selectAchieve}/>
                </PopoverButton>
            </View>
            <AchievesPanel achieves={studentAchieves} achieve_id={achievement_id} category={category}
                onClick={selectAchievement}/>
        </>
    );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {   
    paddingTop: 20,
    paddingBottom: 8
  },
});

