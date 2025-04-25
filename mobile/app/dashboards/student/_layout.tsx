import React from 'react';
import { DraverMenu } from './DraverMenu';

import { Drawer } from 'expo-router/drawer';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { DrawerHeader } from './DrawerHeader';
import { menuStyles, screenStyles } from '../../shared/styles/appStyles';



export default function StudentLayout() {
  return (
    <DraverMenu/>
  );
}
