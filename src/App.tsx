import React from "react";
import RX from "reactxp";
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";

import { StateContext } from "./StateContext";

import { isIphoneX } from "./helpers";

import { Player } from "./Player";
import { RecentTracksList } from "./RecentTracksList";
import { Articles } from "./Articles";

const MainNavigator = createMaterialTopTabNavigator(
  {
    Články: { screen: Articles },
    "Posledné hrané": { screen: RecentTracksList }
  },
  {
    tabBarOptions: {
      upperCaseLabel: false,
      activeTintColor: "#0a4d65",
      style: {
        backgroundColor: "rgba(200, 200, 200, 0.5)"
      },
      labelStyle: {
        color: "#0a4d65",
        fontSize: 20,
        fontWeight: "bold"
      },
      indicatorStyle: {
        backgroundColor: "#0a4d65"
      }
    }
  }
);

const MainView = createAppContainer(MainNavigator);

const _styles = {
  main: RX.Styles.createViewStyle({
    flex: 1,
    backgroundColor: "white"
  }),

  content: RX.Styles.createViewStyle({
    flexShrink: 1,
    flexGrow: 1
  }),

  logo: RX.Styles.createImageStyle({
    marginTop: isIphoneX ? 50 : 20,
    marginHorizontal: 10,
    marginBottom: 10,
    height: 80
  }),

  name: RX.Styles.createTextStyle({
    fontWeight: "bold",
    fontSize: 36,
    color: "red"
  })
};

export class App extends RX.Component {
  public render() {
    return (
      <StateContext.Provider>
        <RX.View style={_styles.main}>
          <RX.View style={_styles.content}>
            <RX.Image
              resizeMode="contain"
              style={_styles.logo}
              source={require("./logo.png")}
              title="Logo"
            />
            <MainView />
          </RX.View>
          <Player />
        </RX.View>
      </StateContext.Provider>
    );
  }
}
