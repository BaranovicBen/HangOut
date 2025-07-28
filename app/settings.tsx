import React from 'react'
import { router } from 'expo-router'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native'

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
  const renderRow = (item: string, index: number, total: number) => {
    const isLast = index === total - 1
    return (
      <View key={item} style={[styles.row, !isLast && styles.rowBorder]}>
        <View style={styles.iconPlaceholder} />
        <Text style={styles.rowText}>{item}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* NavBar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push('/home')}>
            <Text style={styles.sideIcon}>🏠</Text>
        </TouchableOpacity>
            <Text style={styles.navTitle}>Settings</Text>
        <TouchableOpacity onPress={()=> router.push('/account')}>
            <Text style={styles.sideIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Sections */}
      <View style={styles.sectionsWrapper}>
        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionBox}>
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
    backgroundColor: '#fff',
    paddingTop: 60,
    alignItems: 'center',
  },
  navBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  navSide: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionsWrapper: {
    width: '90%',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 6,
  },
  sectionBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: '#000',
    borderRadius: 4,
    marginRight: 16,
  },
  rowText: {
    fontSize: 16,
  },
  sideIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default SettingsScreen