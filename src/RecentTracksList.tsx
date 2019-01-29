import React from "react";
import RX from "reactxp";

const formatTime = time => {
  const jsTime = new Date(time * 1000);
  return jsTime.toLocaleTimeString();
};

interface Track {
  title: string;
  artist: string;
  time?: string;
}

interface Props {
  tracks: Track[];
}

export const RecentTracksList = ({ tracks }: Props) => (
  <RX.View>
    <h3>Posledné hrané:</h3>
    {tracks.map(({ artist, title, time }) => (
      <RX.View key={time}>
        <RX.View>{title}</RX.View>
        <RX.View>{artist}</RX.View>
        <RX.View>od {formatTime(time)}</RX.View>
      </RX.View>
    ))}
  </RX.View>
);
