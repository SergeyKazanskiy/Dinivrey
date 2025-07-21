import { useEffect } from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { screenStyles } from '../../shared/styles/appStyles';
import { useStore } from './store';
import { LinearGradient } from 'expo-linear-gradient';
import { DinivreyHeader } from '../../shared/components/DinivreyHeader';


export function DrawerHeader(props: any) {  
  const { top, bottom } = useSafeAreaInsets();
  const { student } = useStore();

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.background} >
      <DinivreyHeader title={student.first_name + ' ' + student.last_name} onExit={()=>router.replace('/')}/>
      
      <Image style={[styles.image, {padding: 16}]}
          source={require('../../../assets/images/DinivreyCompany.png')} />
          
      <ScrollView style={styles.container}>
        <DrawerItemList {...props} />
      </ScrollView>
    </LinearGradient> 
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 16
  },
  image: { 
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '72%',
    height: '30%',
    paddingHorizontal: 16
  },
})
