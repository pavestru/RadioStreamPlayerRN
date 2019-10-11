import React from "react";
import RX from "reactxp";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

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
        backgroundColor: "#ccd3de"
      },
      labelStyle: {
        color: "#0a4d65",
        fontSize: 20,
        fontWeight: "bold"
      },
      indicatorStyle: {
        backgroundColor: "gray",
        height: 3,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2
      }
    }
  }
);

const MainView = createAppContainer(MainNavigator);

const _styles = {
  main: RX.Styles.createViewStyle({
    flex: 1,
    backgroundColor: "#069"
  }),

  content: RX.Styles.createViewStyle({
    flexShrink: 1,
    flexGrow: 1
  }),

  logoView: RX.Styles.createViewStyle({
    backgroundColor: "#fafbfd"
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
      </StateContext.Provider>
    );
  }
}
