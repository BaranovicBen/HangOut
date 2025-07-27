import { useFonts } from 'expo-font'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require('/Users/benjaminbaranovic/meetME/assets/fonts/Inter-Black.otf'),
    'Inter-Bold' : require('/Users/benjaminbaranovic/meetME/assets/fonts/Inter-Bold.otf'),
  })

  if (!fontsLoaded) {
    return null 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>HangOut</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Inter-Bold',
    fontSize: 42,
    color: 'black',
    textAlign: 'center',
  },
}
)