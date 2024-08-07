import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import { Link } from "./Link";

import { contact, radioNameLong } from "./radio.config.json";
import { usedLanguage } from "./i18n";
import { Trans } from "react-i18next";

const iconSize = 18;
const iconColor = "white";

const EmailIcon = () => (
  <Entypo name="email" size={iconSize} color={iconColor} />
);
const PhoneIcon = () => <Icon name="phone" size={iconSize} color={iconColor} />;
const WebIcon = () => <Icon name="web" size={iconSize} color={iconColor} />;
const MailIcon = () => <Icon name="email" size={iconSize} color={iconColor} />;
const HomeIcon = () => <Icon name="home" size={iconSize} color={iconColor} />;
const BankIcon = () => <Icon name="bank" size={iconSize} color={iconColor} />;
const InfoIcon = () => (
  <Icon name="information" size={iconSize} color={iconColor} />
);
const ProtectIcon = () => (<Icon name="shield-account" size={iconSize} color={iconColor} />);

const nbsp2x = "  "; // Non-breakable space

const _styles = StyleSheet.create({
  main: {
    padding: 30,
    margin: 0,
  },
  section: {
    marginBottom: 20,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  link: {
    textDecorationLine: "underline",
  },
  heading: {
    fontSize: 22,
    fontWeight: "500",
    color: "white",
  },
  padding: {
    height: 40,
  },
});

export const Contact = () => (
  <ScrollView style={_styles.main}>
    <View style={_styles.section}>
      <Text style={_styles.heading}>{radioNameLong}</Text>
    </View>
    <View style={_styles.section}>
      <Text style={_styles.text}>
        <ProtectIcon />
        {`${nbsp2x}`}
        <Link
          style={_styles.link}
          url={`https://${contact.webDomain}/${contact.privacyPolicy[usedLanguage]}`}
        >
          <Trans i18nKey="about.privacyPolicy">Privacy Policy</Trans>
        </Link>
      </Text>
    </View>
    <View style={_styles.section}>
      <Text style={_styles.text}>
        <WebIcon />
        {`${nbsp2x}`}
        <Link
          style={_styles.link}
          url={`https://${contact.webDomain}`}
        >{`${contact.webDomain}`}</Link>
      </Text>
    </View>
    <View style={_styles.section}>
      <Text style={_styles.text}>
        <PhoneIcon />
        {`${nbsp2x}`}
        <Link
          style={_styles.link}
          url={`tel:${contact.telephone[0]}`}
        >{`${contact.telephone[0]}`}</Link>
      </Text>
      <Text style={_styles.text}>
        <PhoneIcon />
        {`${nbsp2x}`}
        <Link
          style={_styles.link}
          url={`tel:${contact.telephone[1]}`}
        >{`${contact.telephone[1]}`}</Link>
      </Text>
    </View>
    <View style={_styles.section}>
      <Text style={_styles.text}>
        <EmailIcon />
        {`${nbsp2x}`}
        <Link
          style={_styles.link}
          url={`mailto:${contact.email}`}
        >{`${contact.email}`}</Link>
      </Text>
    </View>
    <View style={_styles.section}>
      <Text style={_styles.text}>
        <MailIcon />
        {`${nbsp2x}${contact.address1}`}
      </Text>
    </View>
    <View style={_styles.section}>
      <Text style={_styles.text}>
        <HomeIcon />
        {`${nbsp2x}${contact.address2}`}
      </Text>
    </View>
    <View style={_styles.section}>
      <Text style={_styles.text}>
        <BankIcon />
        {`${nbsp2x}${contact.bankInfo}`}
      </Text>
    </View>
    <View style={_styles.section}>
      <Text style={_styles.text}>
        <InfoIcon />
        {`${nbsp2x}${contact.organizationId}`}
      </Text>
    </View>
    <View style={_styles.padding}></View>
  </ScrollView>
);
