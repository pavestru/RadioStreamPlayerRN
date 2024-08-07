import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { StateContextWrapper } from "./StateContext";

import { Player } from "./Player";
import { RecentTracksList } from "./RecentTracksList";
import { Articles } from "./Articles";
import { Contact } from "./Contact";

export const PlaylistIcon = () => (
  <Icon name="playlist-music" size={24} color="#0a4d65" />
);

const tabBarOptions: MaterialTopTabNavigationOptions = {
  tabBarActiveTintColor: "#3d6e8d",
  tabBarStyle: {
    backgroundColor: "#d5dee7",
  },
  tabBarLabelStyle: {
    color: "#3d6e8d",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "none",
  },
  tabBarIndicatorStyle: {
    backgroundColor: "#99a",
    height: 4,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  tabBarShowIcon: true,
};

const Tab = createMaterialTopTabNavigator();

const MainView = () => {
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={tabBarOptions}
        sceneContainerStyle={{
          backgroundColor: "transparent",
        }}
      >
        <Tab.Screen
          name="Articles"
          component={Articles}
          options={{ tabBarLabel: t("menu.articles") }}
        />
        <Tab.Screen
          name="Contact"
          component={Contact}
          options={{ tabBarLabel: t("menu.about") }}
        />
        <Tab.Screen
          name="Recent"
          component={RecentTracksList}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: () => <PlaylistIcon />,
            title: t("menu.recent"),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const _styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#3d6e8d",
  },

  content: {
    flexShrink: 1,
    flexGrow: 1,
  },

  logoView: {
    flexGrow: 0,
    flexShrink: 0,
    flex: 0,
    backgroundColor: "#fafbfd",
  },

  logo: {
    marginLeft: "5%",
    marginBottom: 10,
    width: "90%",
    height: 80,
    marginVertical: 0,
  },
});

export function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <StateContextWrapper>
        <View style={_styles.main}>
          <View style={_styles.content}>
            <SafeAreaView style={_styles.logoView} edges={["top"]}>
              <Image
                resizeMode="contain"
                style={_styles.logo}
                source={require("./logo.png")}
              />
            </SafeAreaView>
            <MainView />
          </View>
          <Player />
        </View>
      </StateContextWrapper>
    </SafeAreaProvider>
  );
}
