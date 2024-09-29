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

      <Tabs.Screen
        name="create"
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: "#3A82F6",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <PlusCircleIcon size={36} color="white" />
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                top: -10,
              }}
            />
          ),
        }}
      />

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
