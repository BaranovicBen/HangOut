import React, { useState } from 'react'
import { router } from 'expo-router'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native'

const AccountScreen = () => {
  const [name, setName] = useState('Maia Juriska')
  const [username, setUsername] = useState('@maiaJuri')

  const [friends, setFriends] = useState([
    '@johndoe1',
    '@johndoe2',
    '@johndoe3',
    '@johndoe4',
  ])

  const handleEdit = () => {
    setName('Jane Doe')
    setUsername('@janeDoe')
  }

  return (
    <View style={styles.container}>
      {/* NavBar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push('/settings')}>
            <Text style={styles.sideIcon}>⚙️</Text>
        </TouchableOpacity>
            <Text style={styles.title}>My Account</Text>
        <TouchableOpacity onPress={() => router.push('/home')}>
            <Text style={styles.sideIcon}>🏠</Text>
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
      <View style={styles.infoBox}>
        <Text style={styles.sectionTitle}>You</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Username</Text>
          <Text style={styles.infoValue}>{username}</Text>
        </View>
        <TouchableOpacity style={styles.editRow} onPress={handleEdit}>
          <Text style={styles.editText}>Edit</Text>
          <View style={styles.editIcon} />
        </TouchableOpacity>
      </View>

      {/* Friends List */}
      <View style={styles.friendsBox}>
        <View style={styles.friendsHeader}>
          <Text style={styles.sectionTitle}>Friends</Text>
          <View style={styles.plusIcon} />
        </View>
        {friends.map((friend) => (
          <View key={friend} style={styles.friendRow}>
            <View style={styles.avatar} />
            <Text style={styles.friendText}>{friend}</Text>
            <Text style={styles.removeIcon}>✕</Text>
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
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#f0f0f0',
    width: '90%',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  editText: {
    fontSize: 16,
    marginRight: 8,
  },
  editIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#000',
  },
  friendsBox: {
    backgroundColor: '#f0f0f0',
    width: '90%',
    borderRadius: 20,
    padding: 16,
  },
  friendsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  plusIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#000',
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#000',
    marginRight: 12,
  },
  friendText: {
    flex: 1,
    fontSize: 16,
  },
  removeIcon: {
    fontSize: 20,
    color: '#000',
    paddingHorizontal: 8,
  },
  sideIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default AccountScreen