import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { DinivreyHeader } from '../../shared/components/DinivreyHeader';
import EventsScreen from './events/EventsScreen';
import GroupsScreen from './students/GroupsScreen';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';


type TabRoutes = {
  Groups: undefined;
  Events: undefined;
};

const Tab = createBottomTabNavigator<TabRoutes>();


function getIconsData(routeName: string) {
  let iconName: any;
  let label = '';

  if (routeName === 'Groups') {
    iconName = 'people';
    label = 'Groups';
  } else {
    iconName = 'calendar-number-outline';
    label = 'Events';
  }

  return { iconName, label };
}

function TabNavigatorWrapper() {
  const navigation = useNavigation<BottomTabNavigationProp<TabRoutes>>();


  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#0C1B30',
            height: 70,
            borderTopWidth: 0,
          },
          tabBarIcon: ({ focused }) => {
            const { iconName, label } = getIconsData(route.name);
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={iconName} size={24} color={focused ? '#E4FF3E' : '#888888'} />
                <Text style={{ color: focused ? '#E4FF3E' : '#888888', fontSize: 14, marginTop: 3 }}>
                  {label}
                </Text>
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Groups" component={GroupsScreenWithHeader} />
        <Tab.Screen name="Events" component={EventsScreenWithHeader} />
      </Tab.Navigator>
    </LinearGradient>
  );
}


function GroupsScreenWithHeader(props: any) {
  const route = useRoute();

  return (
    <View style={{ flex: 1 }}>
      <DinivreyHeader
        isGroups={route.name === 'Groups'}
        onGroups={() => {}}
        onEvents={() => props.navigation.navigate('Events')}
      />
      <GroupsScreen {...props} />
    </View>
  );
}

function EventsScreenWithHeader(props: any) {
  const route = useRoute();

  return (
    <View style={{ flex: 1 }}>
      <DinivreyHeader
        isGroups={route.name === 'Groups'}
        onGroups={() => props.navigation.navigate('Groups')}
        onEvents={() => {}}
      />
      <EventsScreen {...props} />
    </View>
  );
}

export default function CoachLayout() {
  return <TabNavigatorWrapper />;
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
