import { Tabs } from 'expo-router'
import { ThemeProvider } from '@/contexts/ThemeContext'

export default function Layout() {
  return (
    <ThemeProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      />
    </ThemeProvider>
  )
}