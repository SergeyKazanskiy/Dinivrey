import React from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { screenStyles, profileStyles } from '../styles/appStyles';
import { ProfileCell } from './ProfileCell';
import { useStore } from '../../dashboards/student/store';


export function DrawerWrapper(props: any) {  
  const { top, bottom } = useSafeAreaInsets();
  const { student } = useStore();

  return (
    <ImageBackground source={require('../../../assets/images/BackMenuImage.png')} style={styles.backgroundImage}>
      
      <DrawerContentScrollView {...props}
        scrollEnabled={false} >

        {/* header */}
        <Text style={styles.header}>DINIVREY</Text>
        <View style={styles.section}>
          <Image style={styles.image} source={require('../../../assets/images/profile/student.png')}/>
          <View style={[profileStyles.background, styles.profileText]}>
              <Text style={profileStyles.title}>{student.first_name}</Text>
          </View>
        </View>

        {/* Menu */}
        <DrawerItemList {...props} />
        <DrawerItem label={'Logout'} labelStyle={{ color: 'white', fontSize: 16, fontWeight: 'bold' }} onPress={()=>router.replace('/')}/>
      </DrawerContentScrollView>

      {/* footer */}
        <View style={{paddingBottom: 20 + bottom}}>
          <Text style={[{textAlign: 'center'}, screenStyles.summary]}>Student app</Text>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 44,
    color: '#FED17F',
    paddingTop: 20,
  },
  section:{    
    height: 200,
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    //justifyContent: "center",
    //alignItems: "center",
    //alignContent: "center"
  },
  image: { 
    height:  '100%',
    resizeMode: 'contain',
    aspectRatio: 1,
    marginRight: 16,
  },
  profileCircle:{
    width:100,
    height:100,
    backgroundColor:"#12B886",
    borderRadius:100,
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center"
  },
  profileText:{
    marginTop: 16,
    paddingTop: 8,
    paddingLeft: 12,
    width: 136,
    height: 38,
    borderRadius: 12
  },
  text:{
    fontFamily:"PoppinsBold",
    marginTop:15,
    fontSize:18,
  },
  backgroundImage: {
    backgroundColor: '#444444',
    flex: 1,
    resizeMode: 'stretch', // or 'stretch'
    width: '100%'
  }
})
/*
<View style={styles.profileCircle}>
*/