import React, { useState } from 'react'
import { router } from 'expo-router'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/contexts/ThemeContext'
import { spacing, borderRadius } from '@/styles/spacing'
import { typography } from '@/styles/typography'

const AccountScreen = () => {
  const { colors } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('Maia Juriska')
  const [username, setUsername] = useState('@maiaJuri')
  const [friends, setFriends] = useState(['@johndoe1', '@johndoe2', '@johndoe3'])

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* NavBar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>My Account</Text>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="home" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Profile Image */}
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e',
        }}
        style={styles.profileImage}
      />

      {/* User Info */}
      <View style={[styles.infoBox, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>You</Text>

        {isEditing ? (
          <>
            <TextInput
              style={[styles.input, { 
                borderColor: colors.border, 
                color: colors.text,
                backgroundColor: colors.background,
              }]}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor={colors.textSecondary}
            />
            <TextInput
              style={[styles.input, { 
                borderColor: colors.border, 
                color: colors.text,
                backgroundColor: colors.background,
              }]}
              value={username}
              onChangeText={(text) => {
                if (text.startsWith('@')) setUsername(text)
              }}
              placeholder="@username"
              placeholderTextColor={colors.textSecondary}
            />
          </>
        ) : (
          <>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.text }]}>Name</Text>
              <Text style={[styles.infoValue, { color: colors.textSecondary }]}>{name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.text }]}>Username</Text>
              <Text style={[styles.infoValue, { color: colors.textSecondary }]}>{username}</Text>
            </View>
          </>
        )}

        <TouchableOpacity
          style={styles.editRow}
          onPress={() => setIsEditing((prev) => !prev)}
        >
          <Text style={[styles.editText, { color: colors.text }]}>{isEditing ? 'Save' : 'Edit'}</Text>
          <Ionicons name={isEditing ? 'checkmark' : 'create-outline'} size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Friends List */}
      <View style={[styles.friendsBox, { backgroundColor: colors.card }]}>
        <View style={styles.friendsHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Friends</Text>
          <Ionicons name="add-circle-outline" size={24} color={colors.text} />
        </View>

        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <View key={friend} style={styles.friendRow}>
              <View style={[styles.friendIcon, { backgroundColor: colors.textSecondary }]} />
              <Text style={[styles.friendText, { color: colors.text }]}>{friend}</Text>
              <TouchableOpacity
                onPress={() =>
                  setFriends((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
              >
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.friendEmptyBox}>
            <View style={[styles.friendBox, { backgroundColor: colors.textSecondary }]} />
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  navBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: spacing.md,
  },
  infoBox: {
    width: '90%',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  infoLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  infoValue: {
    fontSize: typography.sizes.md,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    alignSelf: 'flex-end',
  },
  editText: {
    fontSize: typography.sizes.md,
    marginRight: spacing.sm,
  },
  input: {
    borderWidth: 1,
    padding: spacing.sm,
    borderRadius: spacing.sm,
    marginVertical: spacing.xs,
  },
  friendsBox: {
    width: '90%',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  friendsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  friendIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.md,
  },
  friendText: {
    flex: 1,
    fontSize: typography.sizes.md,
  },
  friendEmptyBox: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  friendBox: {
    width: '100%',
    height: 60,
    borderRadius: borderRadius.lg,
  },
})

export default AccountScreen