import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen } from '../../screens/SettingsScreen';
import { ThemeScreen } from '../../screens/ThemeScreen';
import { CalendarConnectScreen } from '../../screens/CalendarConnectScreen';
import { ProfileScreen } from '../../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Theme" component={ThemeScreen} />
      <Stack.Screen name="CalendarConnect" component={CalendarConnectScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
