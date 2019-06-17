import React from "react";
import RX from "reactxp";

import Video from "react-native-video";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { StateContext } from "./StateContext";

import { radioUrl } from "./radio.config.json";

export const Play = () => <Icon name="play" size={64} color="#0a4d65" />;
export const Stop = () => <Icon name="stop" size={64} color="#0a4d65" />;

const _styles = {
  player: RX.Styles.createViewStyle({
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 100,
    backgroundColor: "#ccd3de",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexDirection: "row",
    paddingRight: 15
  }),
  button: RX.Styles.createViewStyle({
    width: 70,
    height: 70,
    margin: 15,
    padding: 3,
    backgroundColor: "#adbabf",
    borderRadius: 25
  }),
  info: RX.Styles.createViewStyle({
    flexShrink: 1,
    flexGrow: 1
  }),
  title: RX.Styles.createTextStyle({
    color: "#0a4d65",
    fontWeight: "bold",
    lineHeight: 24,
    textAlignVertical: "center",
    fontSize: 18,
    marginTop: 24
  }),
  artist: RX.Styles.createTextStyle({
    lineHeight: 24,
    fontSize: 18,
    color: "#0a4d65"
  })
};

interface State {
  paused: boolean;
}

export class Player extends RX.Component<{}, State> {
  state = {
    paused: true
  };

  handleOnTap = () => {
    this.setState({ paused: !this.state.paused });
  };

  render() {
    return (
      <StateContext.Consumer>
        {state => {
          const artist =
            state!.recentTracks.length > 0 ? state!.recentTracks[0].artist : "";
          const title =
            state!.recentTracks.length > 0 ? state!.recentTracks[0].title : "";
          return (
            <RX.View style={_styles.player}>
              <RX.GestureView style={_styles.button} onTap={this.handleOnTap}>
                {this.state.paused ? <Play /> : <Stop />}
                {!this.state.paused && (
                  <Video
                    source={{
                      uri: radioUrl
                    }}
                    paused={this.state.paused}
                    volume={this.state.volume}
                    ignoreSilentSwitch="ignore"
                    playInBackground
                  />
                )}
              </RX.GestureView>
              <RX.View style={_styles.info}>
                <RX.Text numberOfLines={1} style={_styles.title}>
                  {title}
                </RX.Text>
                <RX.Text numberOfLines={1} style={_styles.artist}>
                  {artist}
                </RX.Text>
              </RX.View>
            </RX.View>
          );
        }}
      </StateContext.Consumer>
    );
  }
}
