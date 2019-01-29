import React from "react";
import RX from "reactxp";

import Video from "react-native-video";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const Play = () => <Icon name="play" size={70} color="#444" />;
export const Stop = () => <Icon name="stop" size={70} color="#444" />;

const _styles = {
  button: RX.Styles.createViewStyle({
    width: 70,
    height: 70,
    margin: 15,
    backgroundColor: "darkgray",
    borderRadius: 25
  })
};

interface Props {
  title: string;
  artist: string;
  url: string;
}

interface State {
  paused: boolean;
}

export class Player extends RX.Component<Props, State> {
  state = {
    paused: true
  };

  handleOnTap = () => {
    this.setState({ paused: !this.state.paused }, () => {
      console.log(this.state);
    });
  };

  render() {
    return (
      <RX.GestureView style={_styles.button} onTap={this.handleOnTap}>
        {this.state.paused ? <Play /> : <Stop />}
        {!this.state.paused && (
          <Video
            source={{
              uri: this.props.url
            }}
            paused={this.state.paused}
            volume={this.state.volume}
            ignoreSilentSwitch="ignore"
            playInBackground
          />
        )}
      </RX.GestureView>
    );
  }
}
