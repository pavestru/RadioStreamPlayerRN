import React from "react";
import { Text, TextStyle } from "react-native";
import * as Linking from "expo-linking";

import { webRootUrl } from "../radio.config.json";

export interface LinkProps {
  url: string;
  children: JSX.Element | JSX.Element[] | string;
  style: TextStyle;
}

function openLink(url: string) {
  Linking.openURL(url);
}

export const Link = ({ url, children, style }: LinkProps) => (
  <Text style={style} onPress={() => openLink(url)}>
    {children}
  </Text>
);
