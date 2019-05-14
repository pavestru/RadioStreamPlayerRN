import * as React from "react";

import { dataUrl, ignoreTracksContaining } from "./radio.config.json";
import charMap from "./charMap";

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

const { Consumer, Provider } = React.createContext<State | undefined>(
  undefined
);

class StateContextProvider extends React.Component<{}, State> {
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

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export const StateContext = { Consumer, Provider: StateContextProvider };
