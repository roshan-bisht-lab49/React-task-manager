import { Stack } from "expo-router";

export default function AppEntry() {
    return (
        <Stack screenOptions={{
            headerBackTitleVisible: true,
            headerTintColor: 'white',
            headerLargeTitle: true,
            headerStyle: {
                backgroundColor: "rgba(27, 33, 36, 1)"
            }
        }}>
            <Stack.Screen name="dashboard" options={{ headerShown: false, headerTitle: "Dashboard" }} />
            <Stack.Screen name="deal-details" options={{ headerShown: true, headerTitle: "Details" }} />
            <Stack.Screen name="deal-confirmation" options={{ headerShown: false, headerTitle: "", headerBackButtonMenuEnabled: false }} />
        </Stack>
    )
}