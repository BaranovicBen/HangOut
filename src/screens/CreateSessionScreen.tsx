import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { PrimaryButton } from '../components/PrimaryButton';
import { spacing, screenPadding, borderRadius } from '../theme/spacing';

interface CreateSessionScreenProps {
  navigation: any;
}

export const CreateSessionScreen: React.FC<CreateSessionScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [fromDate] = useState('Select date');
  const [toDate] = useState('Select date');
  const [sessionType] = useState('Night Out');
  const [nextMorningFree, setNextMorningFree] = useState(false);
  
  const handleCreate = () => {
    navigation.navigate('SessionLobby');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backArrow, { color: colors.text }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Create session</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
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
          
          {/* Type */}
          <TouchableOpacity style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Type</Text>
            <Text style={[styles.value, { color: colors.textSecondary }]}>{sessionType}</Text>
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          
          {/* Next morning free toggle */}
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
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: screenPadding,
  },
  card: {
    borderRadius: borderRadius.xlarge,
    overflow: 'hidden',
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
    fontWeight: '400',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
  },
  divider: {
    height: 1,
    marginLeft: spacing.xl,
  },
  buttonContainer: {
    marginTop: spacing.huge,
  },
});
