import React from "react";
import RX from "reactxp";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { StateContextWrapper } from "./StateContext";

import { isIphoneX } from "./helpers";

import { Player } from "./Player";
import { RecentTracksList } from "./RecentTracksList";
import { Articles } from "./Articles";

const tabBarOptions = {
  activeTintColor: "#3d6e8d",
  style: {
    backgroundColor: "#d5dee7",
  },
  labelStyle: {
    color: "#3d6e8d",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "none",
  },
  indicatorStyle: {
    backgroundColor: "#99a",
    height: 4,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
};

const Tab = createMaterialTopTabNavigator();

const MainView = () => (
  <NavigationContainer>
    <Tab.Navigator
      tabBarOptions={tabBarOptions}
      sceneContainerStyle={{
        backgroundColor: "transparent",
      }}
    >
      <Tab.Screen name="Články" component={Articles} />
      <Tab.Screen name="Posledné hrané" component={RecentTracksList} />
    </Tab.Navigator>
  </NavigationContainer>
);

const _styles = {
  main: RX.Styles.createViewStyle({
    flex: 1,
    backgroundColor: "#3d6e8d",
  }),

  content: RX.Styles.createViewStyle({
    flexShrink: 1,
    flexGrow: 1,
  }),

  logoView: RX.Styles.createViewStyle({
    backgroundColor: "#fafbfd",
  }),

  logo: RX.Styles.createImageStyle({
    marginTop: isIphoneX ? 50 : 0,
    marginHorizontal: 20,
    marginBottom: 10,
    height: 80,
  }),
};

export class App extends RX.Component {
  public render() {
    return (
      <StateContextWrapper>
        <RX.View style={_styles.main}>
          <RX.View style={_styles.content}>
            <RX.View style={_styles.logoView}>
              <RX.Image
                resizeMode="contain"
                style={_styles.logo}
                source={require("./logo.png")}
                title="Logo"
              />
            </RX.View>
            <MainView />
          </RX.View>
          <Player />
        </RX.View>
      </StateContextWrapper>
    );
  }
}
