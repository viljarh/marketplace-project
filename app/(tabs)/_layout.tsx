import { Tabs, router } from "expo-router";
import { Text } from "react-native";
import {
  DocumentIcon,
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
            borderTopColor: COLORS.accent,
            borderTopWidth: 1,
            height: 75,
            justifyContent: "center",
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
          name="my-posts"
          options={{
            tabBarLabel: "My Posts",
            tabBarIcon: ({ color }) => <DocumentIcon size={24} color={color} />,
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
