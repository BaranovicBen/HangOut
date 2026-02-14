import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '@/styles/colors'
import { typography } from '@/styles/typography'

type ProfileAvatarProps = {
  text?: string
  size?: number
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ 
  text = 'ME', 
  size = 40 
}) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.text, { fontSize: size * 0.4 }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: typography.weights.bold,
  },
})

export default ProfileAvatar
