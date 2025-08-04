import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';
import styles from '@/styles/sessionStartStyles';

const SessionStart = () => {
  const [friends, setFriends] = useState([
    '@Janni33',
    '@pinkIEwinkie',
    '@alleexx1',
    '@janeDoe1',
    '@janeDoe2',
    '@janeDoe3',
    '@janeDoe4',
    '@janeDoe5',
    '@johnDoe1',
    '@johnDoe2',
    '@johnDoe3',
    '@johnDoe4',
    '@johnDoe5',
  ]);
  const [party, setParty] = useState<string[]>([]);
  const [nextMorningFree, setNextMorningFree] = useState(false);
  const [type, setType] = useState('Night Out','Lunch');

  const toggleFriend = (friend: string) => {
    if (party.includes(friend)) {
      setParty(party.filter((p) => p !== friend));
    } else {
      setParty([...party, friend]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView  contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
        {/* NavBar */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.push('/Home')}>
            <Text style={styles.sideIcon}>🏠</Text>
          </TouchableOpacity>
          <Text style={styles.navTitle}>HangOut</Text>
          <TouchableOpacity onPress={() => router.push('/account')}>
            <Text style={styles.sideIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Link Share Area */}
        <View style={styles.linkRow}>
          <TouchableOpacity><Text style={styles.iconLeft}>◼</Text></TouchableOpacity>
          <Text style={styles.linkText}>Add friends via link</Text>
          <TouchableOpacity><Text style={styles.iconRight}>◼</Text></TouchableOpacity>
        </View>
        <Text style={styles.sessionLink}>http://hangout/session#123452352</Text>

        {/* Filter Box */}
        <View style={styles.filterBox}>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>From</Text>
            <TextInput style={styles.dateInput} placeholder="1.7.2025" />
          </View>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>To</Text>
            <TextInput style={styles.dateInput} placeholder="31.8.2025" />
          </View>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Type</Text>
            <Text style={styles.filterValue}>{type}</Text>
          </View>
          {type === 'Night Out' && (
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Next morning free</Text>
              <Switch value={nextMorningFree} onValueChange={setNextMorningFree} />
            </View>
          )}
        </View>

        {/* Current Party */}
        <Text style={styles.sectionTitle}>Current party</Text>
        <View style={styles.partyBubble}>
          <Text style={styles.bubbleText}>
            👤{party.map(() => ' 👤').join('')}
          </Text>
        </View>

        {/* Add Friends */}
        <View style={styles.friendsBox}>
          <Text style={styles.sectionTitle}>Add Friends</Text>
          <View style={styles.friendsList}>
            {friends.map((friend) => (
              <TouchableOpacity
                key={friend}
                onPress={() => toggleFriend(friend)}
                style={styles.friendItem}
              >
                <Text style={styles.friendText}>👤 {friend}</Text>
                <Text style={styles.addRemove}>
                  {party.includes(friend) ? '❌' : '➕'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push("/sessionEnd")}
      >
        <Text style={styles.buttonText}>GO!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SessionStart;