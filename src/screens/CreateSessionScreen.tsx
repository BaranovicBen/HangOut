import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { PrimaryButton } from '../components/PrimaryButton';
import { spacing, screenPadding, borderRadius, shadows } from '../theme/spacing';

interface CreateSessionScreenProps {
  navigation: any;
}

export const CreateSessionScreen: React.FC<CreateSessionScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [sessionName, setSessionName] = useState('');
  const [fromDate] = useState('Dec 20, 2024');
  const [toDate] = useState('Dec 22, 2024');
  const [sessionType] = useState('Night Out');
  const [nextMorningFree, setNextMorningFree] = useState(false);
  const [flexibleWindow, setFlexibleWindow] = useState(true);
  const sessionCode = 'HNG-48392';
  
  const handleCreate = () => {
    navigation.navigate('SessionLobby');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backArrow, { color: colors.text }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Create Session</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Session Name Input */}
        <View style={styles.inputSection}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Session Name</Text>
          <View style={[styles.inputContainer, shadows.soft, { backgroundColor: colors.cardBackground }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="e.g., Weekend Hangout"
              placeholderTextColor={colors.textMuted}
              value={sessionName}
              onChangeText={setSessionName}
            />
          </View>
        </View>
        
        {/* Form Card */}
        <View style={[styles.card, shadows.soft, { backgroundColor: colors.cardBackground }]}>
          {/* From date */}
          <TouchableOpacity style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>From</Text>
            <Text style={[styles.value, { color: colors.textSecondary }]}>{fromDate}</Text>
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          
          {/* To date */}
          <TouchableOpacity style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>To</Text>
            <Text style={[styles.value, { color: colors.textSecondary }]}>{toDate}</Text>
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          
          {/* Duration */}
          <TouchableOpacity style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Duration</Text>
            <Text style={[styles.value, { color: colors.textSecondary }]}>3 days</Text>
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          
          {/* Type */}
          <TouchableOpacity style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Occasion</Text>
            <Text style={[styles.value, { color: colors.textSecondary }]}>{sessionType}</Text>
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          
          {/* Next morning free toggle */}
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Free morning after</Text>
            <Switch
              value={nextMorningFree}
              onValueChange={setNextMorningFree}
              trackColor={{ false: colors.divider, true: colors.accent }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          
          {/* Flexible window toggle */}
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Flexible window</Text>
            <Switch
              value={flexibleWindow}
              onValueChange={setFlexibleWindow}
              trackColor={{ false: colors.divider, true: colors.accent }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        {/* Participants Preview */}
        <View style={styles.participantsSection}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Participants</Text>
          <View style={styles.avatarsRow}>
            <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <TouchableOpacity style={[styles.addAvatar, { borderColor: colors.divider }]}>
              <Text style={[styles.addAvatarText, { color: colors.textSecondary }]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Create Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Generate Secure Session"
            onPress={handleCreate}
          />
        </View>
        
        {/* Session Code Preview */}
        <View style={styles.codeSection}>
          <Text style={[styles.codeLabel, { color: colors.textSecondary }]}>
            Your session code
          </Text>
          <View style={[styles.codePill, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.codeText, { color: colors.accent }]}>{sessionCode}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Next morning free</Text>
            <Switch
              value={nextMorningFree}
              onValueChange={setNextMorningFree}
              trackColor={{ false: colors.divider, true: colors.freeDayIndicator }}
            />
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <PrimaryButton title="Create" onPress={handleCreate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenPadding,
    paddingVertical: spacing.lg,
    height: 60,
  },
  backButton: {
    padding: spacing.sm,
  },
  backArrow: {
    fontSize: 32,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: screenPadding,
    paddingBottom: spacing.huge,
  },
  inputSection: {
    marginBottom: spacing.xxl,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    borderRadius: borderRadius.medium,
    overflow: 'hidden',
  },
  input: {
    fontSize: 16,
    fontWeight: '400',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    minHeight: 54,
  },
  card: {
    borderRadius: borderRadius.xlarge,
    overflow: 'hidden',
    marginBottom: spacing.xxl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    minHeight: 56,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
  },
  divider: {
    height: 1,
    marginLeft: spacing.xl,
  },
  participantsSection: {
    marginBottom: spacing.xxl,
  },
  avatarsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  addAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAvatarText: {
    fontSize: 24,
    fontWeight: '300',
  },
  buttonContainer: {
    marginBottom: spacing.xxl,
  },
  codeSection: {
    alignItems: 'center',
  },
  codeLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  codePill: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 20,
  },
  codeText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 2,
  },
});
