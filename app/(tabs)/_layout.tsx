import { Tabs } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import {
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  HomeIcon,
  PlusCircleIcon,
  UserIcon,
} from "react-native-heroicons/outline";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "#e0e0e0",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <HomeIcon size={24} color={color} />,
        }}
      />
      {/* Favorites Tab */}
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color }) => <HeartIcon size={24} color={color} />,
          tabBarItemStyle: {
            marginRight: 40,
          },
        }}
      />

      {/* Create Tab */}
      <Tabs.Screen
        name="create"
        options={{
          tabBarLabel: "", // Empty label to prevent text below
          tabBarIcon: ({ color }) => (
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: "#f4f4f4", // Customize your background color here
                borderRadius: 30, // Make it circular
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 5, // Android shadow
              }}
            >
              <PlusCircleIcon size={36} color={color} />
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                top: -10, // Adjust the vertical positioning of the button
              }}
            />
          ),
        }}
      />

      {/* Messages Tab */}
      <Tabs.Screen
        name="messages"
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ color }) => (
            <ChatBubbleBottomCenterTextIcon size={24} color={color} />
          ),
          tabBarItemStyle: {
            marginLeft: 40,
          },
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => <UserIcon size={24} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
