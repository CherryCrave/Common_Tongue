import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";


export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#FFF5E4" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
