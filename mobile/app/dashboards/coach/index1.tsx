import { View, StyleSheet, Platform, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import EventsScreen from './events/EventsScreen';
import GroupsScreen from './students/GroupsScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { DinivreyHeader } from '../../shared/components/DinivreyHeader2';

const Tab = createBottomTabNavigator();
 
function getIconsData(routeName: string) {
  let iconName: any; let label = '';

  if (routeName === 'Groups') {
    iconName = 'people';
    label = 'Groups';
  } else  {
    iconName = 'document-text-outline';
    label = 'Events';
  }
  return {iconName, label}
}

export default function CoachLayout() {
  return ( 
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      {/* <CustomHeader isGroups={false} onEvents={() => {}} onGroups={() => {}}/> */}

      <Tab.Navigator
        screenOptions={({ route }) => ({ headerShown: false, tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: '#0C1B30', height: 70, borderTopWidth: 0 },
          tabBarIcon: ({ focused }) => {
            const { iconName, label } = getIconsData(route.name);
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={iconName} size={24} color={focused ? '#E4FF3E' : '#888888'}/>
                <Text style={{ color: focused ? '#E4FF3E' : '#888888', fontSize: 14, marginTop: 3 }} >
                  {label}
                </Text>
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Groups" component={GroupsScreen}  />
        <Tab.Screen name="Events" component={EventsScreen} />
      </Tab.Navigator>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
  },
  indicator: { backgroundColor: '#c2ff00', height: 4 },
  tab: { backgroundColor: '#152B52' },
  label: { marginLeft: 8, color: '#ddd', fontSize: 16, padding: 6 },
  content: { flex: 1 },
});

