import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Button } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store';


export const ButtonsView = () => {
    const { signature, isSignature, coach_group_id } = useStore();
    const { toggleSignature, showGroupDeleteAlert } = useStore();

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <View style={[styles.row, {marginTop: 10}]}>
                    <Button title='Groups' type='solid' //disabled={!isSchedulesView}
                        buttonStyle={[styles.button, {backgroundColor: isSignature ? '#2E4A7C' : '#152B52'}]}
                        titleStyle={styles.title}
                        onPress={toggleSignature}
                    />
                    <Button title='Signature' type='solid'// disabled={isSchedulesView}
                        buttonStyle={[styles.button, {backgroundColor: !isSignature ? '#2E4A7C' : '#152B52'}]}
                        titleStyle={styles.title}
                        onPress={toggleSignature}
                    />
                </View>

                {signature && isSignature &&
                    <Image source={{ uri: signature }} resizeMode="contain" style={styles.image}/>}

                {!isSignature && coach_group_id > 0 &&
                    <Pressable onPress={showGroupDeleteAlert} style={{marginTop: 8, marginRight: 4}}>
                        <Ionicons name='trash-outline' size={22} color="rgb(180, 216, 158)" />
                    </Pressable>
                }    
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    section: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    button: {
        height: 28,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        color: 'gold'
    },
    image: {
        width: 120,
        height: 28,
        backgroundColor: '#ddd',
        marginTop: 4,
        marginRight: 8,
        borderRadius: 5,
    },
});

