import { Tabs } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabLayout = () => {

    const insets = useSafeAreaInsets();

    return (

        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#1A1A1A',
                tabBarInactiveTintColor: '#626262',
                tabBarStyle: {
                    position: "absolute",
                    bottom: Math.max(insets.bottom, 30),
                    backgroundColor: '#CCFF00',
                    borderTopColor: '#262626',
                    borderRadius: 50,
                    marginHorizontal: 'auto',
                    left: '5%',
                    right: '5%',
                    maxWidth: 600,
                    alignSelf: 'center',
                    borderTopWidth: 0,
                    height: 70,
                },
                tabBarItemStyle: {
                    paddingVertical: 10,
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-sharp" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="exercises"
                options={{
                    title: 'Exercises',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'barbell' : 'barbell-sharp'} size={size}
                            color={color} />
                    ),
                }}
            />
            <Tabs.Screen name="exercises/[id]" options={{ href: null }} />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-sharp" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}


export default TabLayout;