import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Redirect, router } from 'expo-router'
import CalendarView from '@/components/CalendarView'
import styles from '@/styles/homeStyles'


const Home = () => {
  const [buttonActive, setButtonActive] = useState(false)

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Text style={styles.sideIcon}>⚙️</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>HangOut</Text>
        <TouchableOpacity onPress={() => router.push('/account')}>
          <Text style={styles.sideIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Info Text */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          You have nothing planned on these days
        </Text>
      </View>

      {/* Calendar */}
      <CalendarView />

      {/* Button */}
      <TouchableOpacity
        style={[
          styles.button,
          buttonActive ? styles.buttonActive : styles.buttonInactive,
        ]}
        onPress={() => {setButtonActive(!buttonActive); router.push("/sessionStart");}}
      >
        <Text style={styles.buttonText}>Find time...</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home