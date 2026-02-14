import React from 'react'
import { router } from 'expo-router'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/contexts/ThemeContext'
import { spacing, borderRadius } from '@/styles/spacing'
import { typography } from '@/styles/typography'

const sections = [
  {
    title: 'General',
    data: ['Account', 'Language', 'Sounds & Haptics'],
  },
  {
    title: 'Calendar',
    data: ['Connections', 'Settings', 'Theme'],
  },
  {
    title: 'Privacy',
    data: ['Location', 'Data Collection', 'Notifications'],
  },
]

const SettingsScreen = () => {
  const { colors } = useTheme()
  
  const renderRow = (item: string, index: number, total: number) => {
    const isLast = index === total - 1
    return (
      <View key={item} style={[styles.row, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
        <View style={[styles.iconPlaceholder, { backgroundColor: colors.textSecondary }]} />
        <Text style={[styles.rowText, { color: colors.text }]}>{item}</Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* NavBar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="home" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.navTitle, { color: colors.text }]}>Settings</Text>
        <TouchableOpacity onPress={() => router.push('/account')}>
          <Ionicons name="person" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Sections */}  
      <View style={styles.sectionsWrapper}>
        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
            <View style={[styles.sectionBox, { backgroundColor: colors.card }]}>
              {section.data.map((item, index) =>
                renderRow(item, index, section.data.length)
              )}
            </View>
          </View>
        ))}
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
  navTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  sectionsWrapper: {
    width: '90%',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.sm,
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
  },
  sectionBox: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: spacing.md,
  },
  rowText: {
    fontSize: typography.sizes.md,
  },
})

export default SettingsScreen