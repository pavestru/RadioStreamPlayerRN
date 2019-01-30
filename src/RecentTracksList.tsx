import React from "react";
import RX from "reactxp";

const formatTime = (time: number) => {
  const jsTime = new Date(time * 1000);
  return jsTime.toLocaleTimeString();
};

interface Track {
  title: string;
  artist: string;
  time: number;
}

interface Props {
  tracks: Track[];
}

export const RecentTracksList = ({ tracks }: Props) => (
  <RX.View>
    <RX.Text>Posledné hrané:</RX.Text>
    {tracks.map(({ artist, title, time }) => (
      <RX.View key={time}>
        <RX.View>
          <RX.Text>{title}</RX.Text>
        </RX.View>
        <RX.View>
          <RX.Text>{artist}</RX.Text>
        </RX.View>
        <RX.View>
          <RX.Text>od {formatTime(time)}</RX.Text>
        </RX.View>
      </RX.View>
    ))}
  </RX.View>
);
