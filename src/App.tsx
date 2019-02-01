import React from "react";
import RX from "reactxp";

import { isIphoneX } from "./helpers";

import { Player } from "./Player";
import { RecentTracksList } from "./RecentTracksList";

import { dataUrl, radioUrl, ignoreTracksContaining } from "./radio.config.json";
import charMap from "./charMap";

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
    height: 80
  }),

  name: RX.Styles.createTextStyle({
    fontWeight: "bold",
    fontSize: 36,
    color: "red"
  })
};

interface Track {
  title: string;
  artist: string;
  time: number;
}

const fixChars = (text: string) => {
  let newText = text + "";
  for (const ch in charMap) {
    if (charMap.hasOwnProperty(ch)) {
      const re = new RegExp(ch, "g");
      newText = newText.replace(re, charMap[ch]);
    }
  }
  return newText;
};

const ignoreTracksFilter = (track: Track) => {
  for (const substring of ignoreTracksContaining) {
    if (
      track.title.toLowerCase().includes(substring.toLowerCase()) ||
      track.artist.toLowerCase().includes(substring.toLowerCase())
    ) {
      return false;
    }
  }
  return true;
};

interface State {
  recentTracks: Track[];
}

export class App extends RX.Component<{}, State> {
  state: State = {
    recentTracks: []
  };

  async componentDidMount() {
    this.getRecentTracks();
    setInterval(this.getRecentTracks, 15 * 1000);
  }

  getRecentTracks = async () => {
    try {
      const response = await fetch(dataUrl + `&_=${Date.now()}`);
      const responseJson = await response.json();
      this.setState({
        recentTracks: responseJson.data[0]
          .map((trackObj: Track) => ({
            artist: fixChars(trackObj.artist),
            title: fixChars(trackObj.title),
            time: trackObj.time
          }))
          .filter(ignoreTracksFilter)
      });
    } catch (error) {
      console.log(error);
    }
  };

  public render() {
    const { recentTracks } = this.state;
    const artist = recentTracks.length > 0 ? recentTracks[0].artist : "";
    const title = recentTracks.length > 0 ? recentTracks[0].title : "";
    return (
      <RX.View style={_styles.main}>
        <RX.View style={_styles.content}>
          <RX.Image
            resizeMode="contain"
            style={_styles.logo}
            source={require("./logo.png")}
            title="Logo"
          />
          <RecentTracksList tracks={recentTracks} />
        </RX.View>
        <Player artist={artist} title={title} url={radioUrl} />
      </RX.View>
    );
  }
}
