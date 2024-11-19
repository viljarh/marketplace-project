import { Tabs, router } from "expo-router";
import { Text } from "react-native";
import {
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  HomeIcon,
  PlusCircleIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { useSession } from "../ctx";
import { useEffect } from "react";
import { COLORS } from "constants/constants";

const TabLayout = () => {
  const { session, loading } = useSession();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/sign-in");
    }
  }, [loading, session, router]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (session) {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: COLORS.primary,
          tabBarStyle: {
            backgroundColor: "white",
            borderTopColor: "#e0e0e0",
            height: 75,
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        {/* Home */}
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => <HomeIcon size={24} color={color} />,
          }}
        />

        {/* Favorites */}
        <Tabs.Screen
          name="favorites"
          options={{
            tabBarLabel: "Favorites",
            tabBarIcon: ({ color }) => <HeartIcon size={24} color={color} />,
          }}
        />

        {/* Create Post */}
        <Tabs.Screen
          name="create"
          options={{
            tabBarLabel: "Create Post",
            tabBarIcon: ({ color }) => (
              <PlusCircleIcon size={26} color={color} />
            ),
          }}
        />

        {/* Messages */}
        <Tabs.Screen
          name="messages"
          options={{
            tabBarLabel: "Messages",
            tabBarIcon: ({ color }) => (
              <ChatBubbleBottomCenterTextIcon size={24} color={color} />
            ),
          }}
        />

        {/* Profile */}
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => <UserIcon size={24} color={color} />,
          }}
        />
      </Tabs>
    );
  }
  return null;
};

export default TabLayout;
