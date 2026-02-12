import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { PrimaryButton } from '../components/PrimaryButton';
import { spacing, screenPadding, borderRadius } from '../theme/spacing';

interface JoinSessionScreenProps {
  navigation: any;
}

export const JoinSessionScreen: React.FC<JoinSessionScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [sessionCode, setSessionCode] = useState('');
  
  const handleJoin = () => {
    navigation.navigate('SessionLobby');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backArrow, { color: colors.text }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Join session</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Session link or code"
            placeholderTextColor={colors.textSecondary}
            value={sessionCode}
            onChangeText={setSessionCode}
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <PrimaryButton title="Join" onPress={handleJoin} />
        </View>
      </View>
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
  content: {
    flex: 1,
    padding: screenPadding,
  },
  card: {
    borderRadius: borderRadius.xlarge,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  input: {
    fontSize: 16,
    fontWeight: '400',
    paddingVertical: spacing.md,
  },
  buttonContainer: {
    marginTop: spacing.huge,
  },
});
