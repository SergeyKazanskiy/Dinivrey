import React from 'react';
import { View, Image, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { useStore } from '../../store';
import { widgetStyles, screenStyles } from '../../../../shared/styles/appStyles';


export const AchievesView2 = () => {
    const iconsPath: String = '../../../../shared/icons/';
    const { profile_achievements, achievements, isOpenAchievements } = useStore();
    const { open_achievements } = useStore();

    function getImage(imageName: string) {
        switch (imageName) {
          case 'Lider.png':
            return require('../../../../../assets/images/icons/Lider.png');
          case 'Score.png':
            return require('../../../../../assets/images/icons/Score.png');
            case 'Skill.png':
                return require('../../../../../assets/images/icons/Skill.png');
            case 'Careful.png':
                return require('../../../../../assets/images/icons/Careful.png');
            case 'Tagger.png':
                return require('../../../../../assets/images/icons/Tagger.png');
          default:
            return require('../../../../../assets/images/icons/Tagger.png'); // Изображение по умолчанию
        }
      }
      
    return (
        <View style={styles.container}>
            <View style={[ styles.section]}>
                <FlatList data={achievements}
                    horizontal // Устанавливаем горизонтальное расположение
                    keyExtractor={(item) => item.imageName}
                    renderItem={({ item }) =>
                        <Image style={styles.image} source={getImage(item.imageName)}/>
                }/>
            </View>
        </View>
    );
};

/*<Image style={styles.image} source={require(iconsPath + item.imageName)} />
<TouchableOpacity style={styles.list} onPress={open_achievements}>
*/

const styles = StyleSheet.create({
    container: {
    },
    section: {
        height: 120,
        borderRadius: 10,
        paddingLeft: 12,
        backgroundColor: '#2C3131',
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
