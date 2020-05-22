import React from "react";
import RX, { View, ScrollView, Text, Link } from "reactxp";

import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { contact, radioName } from "./radio.config.json";

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

const nbsp2x = "  "; // Non-breakable space

const _styles = {
  main: RX.Styles.createScrollViewStyle({
    padding: 30,
    margin: 0,
  }),
  section: RX.Styles.createViewStyle({
    marginBottom: 20,
  }),
  text: RX.Styles.createTextStyle({
    color: "white",
    fontSize: 18,
  }),
  link: RX.Styles.createLinkStyle({
    textDecorationLine: "underline",
  }),
  heading: RX.Styles.createTextStyle({
    fontSize: 22,
    fontWeight: "500",
    color: "white",
  }),
  padding: RX.Styles.createViewStyle({
    height: 40,
  }),
};

export const Contact = () => (
  <ScrollView style={_styles.main}>
    <View style={_styles.section}>
      <Text style={_styles.heading}>{radioName}</Text>
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
        {`${nbsp2x}${contact.bankAccount}`}
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
