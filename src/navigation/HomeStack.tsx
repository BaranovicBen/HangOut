import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { CreateSessionScreen } from '../screens/CreateSessionScreen';
import { JoinSessionScreen } from '../screens/JoinSessionScreen';
import { SessionLobbyScreen } from '../screens/SessionLobbyScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateSession" component={CreateSessionScreen} />
      <Stack.Screen name="JoinSession" component={JoinSessionScreen} />
      <Stack.Screen name="SessionLobby" component={SessionLobbyScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
