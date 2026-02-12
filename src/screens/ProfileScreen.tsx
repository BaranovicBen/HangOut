import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { AppHeader } from '../components/AppHeader';
import { Avatar } from '../components/Avatar';
import { screenPadding, spacing, borderRadius } from '../theme/spacing';
import { currentUser, friends } from '../data/dummy';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <AppHeader
        title="My Account"
        leftIcon="settings"
        rightIcon="home"
        onLeftPress={() => navigation.navigate('Settings')}
        onRightPress={() => navigation.navigate('Home')}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Avatar emoji={currentUser.avatar} size={100} />
        </View>
        
        {/* You card */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>You</Text>
            <TouchableOpacity>
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Name</Text>
            <Text style={[styles.value, { color: colors.text }]}>{currentUser.name}</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Username</Text>
            <Text style={[styles.value, { color: colors.text }]}>@{currentUser.username}</Text>
          </View>
        </View>
        
        {/* Friends card */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Friends</Text>
            <TouchableOpacity>
              <Text style={styles.addFriendIcon}>+</Text>
            </TouchableOpacity>
          </View>
          
          {friends.map((friend, index) => (
            <View key={friend.id}>
              <View style={styles.friendRow}>
                <View style={styles.friendInfo}>
                  <Avatar emoji={friend.avatar} size={40} />
                  <View style={styles.friendTextContainer}>
                    <Text style={[styles.friendName, { color: colors.text }]}>
                      {friend.name}
                    </Text>
                    <Text style={[styles.friendUsername, { color: colors.textSecondary }]}>
                      @{friend.username}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Text style={styles.removeIcon}>✕</Text>
                </TouchableOpacity>
              </View>
              {index < friends.length - 1 && (
                <View style={[styles.divider, { backgroundColor: colors.divider }]} />
              )}
            </View>
          ))}
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
  avatarContainer: {
    alignItems: 'center',
    marginVertical: spacing.xxxl,
  },
  card: {
    borderRadius: borderRadius.xlarge,
    padding: spacing.xl,
    marginBottom: spacing.xxl,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  editIcon: {
    fontSize: 18,
  },
  addFriendIcon: {
    fontSize: 28,
    fontWeight: '300',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
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
    marginVertical: spacing.sm,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  friendTextContainer: {
    marginLeft: spacing.md,
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  friendUsername: {
    fontSize: 14,
    fontWeight: '400',
  },
  removeIcon: {
    fontSize: 20,
    color: '#FF3B30',
  },
});
