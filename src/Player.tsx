import React from "react";
import RX from "reactxp";

import Video from "react-native-video";

export class Player extends RX.Component {
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
      <RX.GestureView onTap={this.handleOnTap}>
        <RX.Text>{this.state.paused ? "Play" : "Stop"}</RX.Text>
        {!this.state.paused && (
          <Video
            source={{
              uri: "http://relay.publicdomainproject.org:80/classical.mp3"
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
