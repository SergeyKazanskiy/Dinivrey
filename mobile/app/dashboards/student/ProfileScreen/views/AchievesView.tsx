import React from 'react';
import { View, Image, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useStore } from '../../store';

import { widgetStyles, screenStyles } from '../../../../shared/styles/appStyles';
import { ProfileCell } from '../../../../shared/components/ProfileCell';


export type Props = {
    onClick: () => void;
};

export const AchievesView: React.FC<Props> = ({onClick}) => {
    const iconsPath: String = '../../../../shared/icons/';
    const { profile_achievements } = useStore();

    function getImage(imageName: string) {
        switch (imageName) {
          case 'Lider.png':
            return require('../../../../../assets/images/icons/Lider.png');
          case 'Score.png':
            return require('../../../../../assets/images/icons/Score.png');
            case 'Skill.png':
            return require('../../../../../assets/images/icons/Skill.png');
            case 'Tagger.png':
                return require('../../../../../assets/images/icons/Tagger.png');
          default:
            return require('../../../../../assets/images/icons/Tagger.png'); // Изображение по умолчанию
        }
      }

    return (
        <View style={styles.container}>
            <Text style={[screenStyles.summary, styles.summary]}>My Top 3</Text>
            <View style={[ styles.section]}>
                <FlatList data={profile_achievements} horizontal
                    keyExtractor={(item) => item.imageName}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={onClick}>
                            <Image style={styles.image} source={getImage(item.imageName)}/>
                        </TouchableOpacity>
                }/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    section: {
        height: 100,
        borderRadius: 10,
        paddingLeft: 12,
    },
    icon: {
        backgroundColor: 'red',
    },
    image: {
        //margin: 4,
        height: 80,
        width: 80,
        margin: 10,
        borderRadius: 40
    },
    summary: {
        textAlign: 'center',
        paddingTop: 26,
        paddingBottom: 10
    }
});
