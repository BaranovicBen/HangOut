import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { AppHeader } from '../components/AppHeader';
import { SettingsGroupCard } from '../components/SettingsGroupCard';
import { SettingsRow } from '../components/SettingsRow';
import { screenPadding, spacing } from '../theme/spacing';
import * as Calendar from 'expo-calendar';
import * as DocumentPicker from 'expo-document-picker';

interface SettingsScreenProps {
  navigation: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  
  const handleConnectAppleCalendar = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        navigation.navigate('CalendarConnect');
      }
    } catch (error) {
      console.error('Calendar permission error:', error);
    }
  };
  
  const handleImportICS = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'text/calendar',
        copyToCacheDirectory: true,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        console.log('Selected file:', result.assets[0].name);
        // Just log for UI demo purposes
      }
    } catch (error) {
      console.error('Document picker error:', error);
    }
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <AppHeader
        title="Settings"
        leftIcon="home"
        rightIcon="profile"
        onLeftPress={() => navigation.navigate('Home')}
        onRightPress={() => navigation.navigate('Profile')}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* General section */}
        <SettingsGroupCard title="General">
          <SettingsRow
            icon="👤"
            label="Account"
            onPress={() => navigation.navigate('Profile')}
          />
          <SettingsRow
            icon="🌐"
            label="Language"
            onPress={() => {}}
          />
          <SettingsRow
            icon="🔔"
            label="Sounds and Haptics"
            onPress={() => {}}
            showDivider={false}
          />
        </SettingsGroupCard>
        
        {/* Calendar section */}
        <SettingsGroupCard title="Calendar">
          <SettingsRow
            icon="🔗"
            label="Connections"
            onPress={() => {}}
          />
          <SettingsRow
            icon="⚙️"
            label="Calendar Settings"
            onPress={() => {}}
          />
          <SettingsRow
            icon="🎨"
            label="Theme"
            onPress={() => navigation.navigate('Theme')}
          />
          <SettingsRow
            icon="📅"
            label="Connect Apple Calendar"
            onPress={handleConnectAppleCalendar}
          />
          <SettingsRow
            icon="📄"
            label="Import .ics file"
            onPress={handleImportICS}
            showDivider={false}
          />
        </SettingsGroupCard>
        
        {/* Privacy section */}
        <SettingsGroupCard title="Privacy">
          <SettingsRow
            icon="📍"
            label="Location"
            onPress={() => {}}
          />
          <SettingsRow
            icon="📊"
            label="Data Collection"
            onPress={() => {}}
          />
          <SettingsRow
            icon="🔔"
            label="Notifications"
            onPress={() => {}}
            showDivider={false}
          />
        </SettingsGroupCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: screenPadding,
    paddingBottom: spacing.huge,
  },
});
