import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen
      name="tabs"
      options ={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="booking"
      options ={{
        headerBackVisible: false,
        gestureEnabled: false,
        headerShown: false
      }} //disable back to make user confirm
    />
  </Stack>

  )
}
