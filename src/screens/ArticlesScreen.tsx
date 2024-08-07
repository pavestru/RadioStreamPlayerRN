import React from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import * as cheerio from "cheerio";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { withTranslation, Trans } from "react-i18next";

import { Link } from "../components/Link";

import { webRootUrl, articlesUrl } from "../radio.config.json";

export const LinkIcon = () => (
  <Icon name="open-in-new" size={15} color="white" />
);

const nbsp = " "; // Non-breakable space

const _styles = StyleSheet.create({
  main: {
    padding: 30,
    marginTop: 0,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    lineHeight: 24,
  },
  text: {
    color: "white",
    fontSize: 18,
    lineHeight: 24,
  },
  link: {
    fontWeight: "bold",
    lineHeight: 24,
    fontSize: 20,
  },
  padding: {
    height: 40,
  },
});

interface Article {
  title: string;
  text: string;
  href: string;
}

interface ArticlesState {
  articles: Article[];
}

type TFunction = (key: string) => string;

class ArticlesComponent extends React.Component<{t: TFunction}, ArticlesState> {
  state = {
    articles: [],
  };

  async loadArticles(index = 1) {
    if (index <= 0) {
      return [];
    }
    const res = await fetch(`${webRootUrl}${articlesUrl}/?page=${index}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    const items = $(".news-list-item");
    const articles: Article[] = [];
    items.each((_index, item) => {
      articles.push({
        title: $(item).find("h2").text().trim(),
        text: $(item).find("div").text().trim(),
        href: $(item).find("a").attr("href") || "",
      });
    });
    return articles;
  }

  async componentDidMount() {
    let articles: Article[];
    // Load first two pages of articles
    articles = await this.loadArticles(1);
    this.setState((state) => ({
      ...state,
      articles: [...state.articles, ...articles],
    }));
    articles = await this.loadArticles(2);
    this.setState((state) => ({
      ...state,
      articles: [...state.articles, ...articles],
    }));
  }

  render() {
    return (
      <ScrollView style={_styles.main}>
        {this.state.articles.length === 0 ? (
          <Text style={_styles.text}>
            <Trans i18nKey="articles.loading">
              Loading articles...
            </Trans>
          </Text>
        ) : (
          this.state.articles.map(({ title, text, href }: Article) => (
            <View key={href} style={_styles.listItem}>
              <View>
                <Link style={_styles.link} url={`${webRootUrl}${href}`}>
                  <Text style={_styles.title}>{title}</Text>
                </Link>
                <Text style={_styles.text}>{text}</Text>
                <Link style={_styles.link} url={`${webRootUrl}${href}`}>
                  <LinkIcon />
                  <Text style={_styles.text}>
                    {" "}
                    <Trans i18nKey="articles.readMore">{`Read${nbsp}more`}</Trans>
                  </Text>
                </Link>
              </View>
            </View>
          ))
        )}
        <View style={_styles.padding}></View>
      </ScrollView>
    );
  }
}

export const ArticlesScreen = withTranslation()(ArticlesComponent);