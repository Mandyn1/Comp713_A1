
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Showings",
                    tabBarIcon: ({ size }) => (
                        <Ionicons
                            name="list"
                            size={size}
                            color="black"
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="scanMovie"
                options={{
                    title: "Scan QR",
                    tabBarIcon: ({ size }) => (
                        <Ionicons
                            name="qr-code"
                            size={size}
                            color="black"
                        />
                    ),
                }}
            />
        </Tabs>
    );
}