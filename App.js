import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import AppointmentFormScreen from "./src/screens/AppointmentFormScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {}, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };
  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Trang chủ") {
                  iconName = focused ? "home" : "home";
                } else if (route.name === "Hồ sơ") {
                  iconName = focused ? "user" : "user";
                }
                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen
              name="Trang chủ"
              component={HomeStack}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Hồ sơ"
              component={SettingsScreen}
              onLogout={handleLogout}
            />
          </Tab.Navigator>
        ) : (
          <LoginScreen onLogin={handleLogin} />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Trang chủ" }}
      />
      <Stack.Screen
        name="AppointmentForm"
        component={AppointmentFormScreen}
        options={{ title: "Đặt lịch hẹn" }}
      />
    </Stack.Navigator>
  );
};
