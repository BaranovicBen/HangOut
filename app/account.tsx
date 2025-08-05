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

const AccountScreen = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('Maia Juriska')
  const [username, setUsername] = useState('@maiaJuri')
  const [friends, setFriends] = useState(['@johndoe1', '@johndoe2', '@johndoe3'])

  return (
    <View style={styles.container}>
      {/* NavBar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Text style={styles.sideIcon}>⚙️</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Account</Text>
        <TouchableOpacity onPress={() => router.push('/Home')}>
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

        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
            />
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={(text) => {
                if (text.startsWith('@')) setUsername(text)
              }}
              placeholder="@username"
            />
          </>
        ) : (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Username</Text>
              <Text style={styles.infoValue}>{username}</Text>
            </View>
          </>
        )}

        <TouchableOpacity
          style={styles.editRow}
          onPress={() => setIsEditing((prev) => !prev)}
        >
          <Text style={styles.editText}>{isEditing ? 'Save' : 'Edit'}</Text>
          <View style={styles.editIcon} />
        </TouchableOpacity>
      </View>

      {/* Friends List */}
      <View style={styles.friendsBox}>
        <View style={styles.friendsHeader}>
          <Text style={styles.sectionTitle}>Friends</Text>
          <View style={styles.plusIcon} />
        </View>

        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <View key={friend} style={styles.friendRow}>
              <View style={styles.friendIcon} />
              <Text style={styles.friendText}>{friend}</Text>
              <TouchableOpacity
                onPress={() =>
                  setFriends((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
              >
                <Text style={styles.remove}>✕</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.friendEmptyBox}>
            <View style={styles.friendBox} />
          </View>
        )}
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
  sideIcon: {
    fontSize: 20,
    fontWeight: 'bold',
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
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
    marginBottom: 10,
  },
  friendIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    marginRight: 12,
  },
  friendText: {
    flex: 1,
    fontSize: 16,
  },
  remove: {
    fontSize: 20,
    color: 'red',
    paddingHorizontal: 8,
  },
  friendEmptyBox: {
    alignItems: 'center',
    marginTop: 12,
  },
  friendBox: {
    width: '100%',
    height: 60,
    backgroundColor: '#000',
    borderRadius: 16,
  },
})

export default AccountScreen