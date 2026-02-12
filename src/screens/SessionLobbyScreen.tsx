import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { AppHeader } from '../components/AppHeader';
import { Avatar } from '../components/Avatar';
import { spacing, screenPadding, borderRadius } from '../theme/spacing';
import { friends } from '../data/dummy';

interface SessionLobbyScreenProps {
  navigation: any;
}

export const SessionLobbyScreen: React.FC<SessionLobbyScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  
  const dummySessionLink = 'https://hangout.app/session/abc123';
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <AppHeader
        title="HangOut"
        leftIcon="settings"
        rightIcon="profile"
        onLeftPress={() => navigation.navigate('Settings')}
        onRightPress={() => navigation.navigate('Profile')}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Share link section */}
        <View style={[styles.shareCard, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.shareRow}>
            <Text style={[styles.shareLabel, { color: colors.text }]}>Add friends via link</Text>
            <TouchableOpacity>
              <Text style={styles.copyIcon}>📋</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.linkText, { color: colors.textSecondary }]} numberOfLines={1}>
            {dummySessionLink}
          </Text>
        </View>
        
        {/* Session details card */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>From</Text>
            <Text style={[styles.value, { color: colors.text }]}>Dec 20, 2024</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>To</Text>
            <Text style={[styles.value, { color: colors.text }]}>Dec 22, 2024</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Type</Text>
            <Text style={[styles.value, { color: colors.text }]}>Night Out</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Next morning free</Text>
            <Text style={[styles.value, { color: colors.text }]}>No</Text>
          </View>
        </View>
        
        {/* Current party section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Current party</Text>
          <View style={styles.avatarRow}>
            <Avatar emoji="👤" size={48} />
            <Avatar emoji="👩" size={48} />
            <Avatar emoji="👨" size={48} />
          </View>
        </View>
        
        {/* Add friends card */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Add Friends</Text>
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
            {friends.map((friend, index) => (
              <View key={friend.id}>
                <View style={styles.friendRow}>
                  <View style={styles.friendInfo}>
                    <Avatar emoji={friend.avatar} size={36} />
                    <Text style={[styles.friendName, { color: colors.text }]}>
                      {friend.name}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addIcon}>+</Text>
                  </TouchableOpacity>
                </View>
                {index < friends.length - 1 && (
                  <View style={[styles.divider, { backgroundColor: colors.divider }]} />
                )}
              </View>
            ))}
          </View>
        </View>
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
  shareCard: {
    borderRadius: borderRadius.xlarge,
    padding: spacing.xl,
    marginBottom: spacing.xxl,
  },
  shareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  shareLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  copyIcon: {
    fontSize: 20,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '400',
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
    minHeight: 52,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginLeft: spacing.xl,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  avatarRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '400',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#20D14D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
