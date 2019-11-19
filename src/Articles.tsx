import React from "react";
import RX from "reactxp";
import * as cheerio from "cheerio";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { webRootUrl, articlesUrl } from "./radio.config.json";

export const LinkIcon = () => (
  <Icon name="open-in-new" size={15} color="white" />
);

const _styles = {
  main: RX.Styles.createScrollViewStyle({
    padding: 30,
    marginTop: 0
  }),
  listItem: RX.Styles.createViewStyle({
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  }),
  title: RX.Styles.createTextStyle({
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  }),
  text: RX.Styles.createTextStyle({
    color: "white",
    fontSize: 18
  }),
  link: RX.Styles.createLinkStyle({
    fontWeight: "bold"
  }),
  padding: RX.Styles.createViewStyle({
    height: 30
  })
};

interface Article {
  title: string;
  text: string;
  href: string;
}

interface ArticlesState {
  articles: Article[];
}

export class Articles extends React.Component<{}, ArticlesState> {
  state = {
    articles: []
  };

  async loadArticles(index: Number = 1) {
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
        title: $(item)
          .find("h2")
          .text()
          .trim(),
        text: $(item)
          .find("div")
          .text()
          .trim(),
        href: $(item)
          .find("a")
          .attr("href")
      });
    });
    return articles;
  }

  openLink(href: string) {
    RX.Linking.openUrl(`${webRootUrl}${href}`);
  }

  async componentDidMount() {
    let articles: Article[];
    // Load first two pages of articles
    articles = await this.loadArticles(1);
    this.setState(state => ({
      ...state,
      articles: [...state.articles, ...articles]
    }));
    articles = await this.loadArticles(2);
    this.setState(state => ({
      ...state,
      articles: [...state.articles, ...articles]
    }));
  }
  render() {
    return (
      <RX.ScrollView style={_styles.main}>
        {this.state.articles.map(({ title, text, href }: Article) => (
          <RX.View key={href} style={_styles.listItem}>
            <RX.View>
              <RX.Link style={_styles.link} url={`${webRootUrl}${href}`}>
                <RX.Text style={_styles.title}>{title}</RX.Text>
              </RX.Link>
              <RX.Text style={_styles.text}>
                {text}
                <RX.Link style={_styles.link} url={`${webRootUrl}${href}`}>
                  <RX.Text>{`   Čítať ďalej `}</RX.Text>
                  <LinkIcon />
                </RX.Link>
              </RX.Text>
            </RX.View>
          </RX.View>
        ))}
        <RX.View style={_styles.padding}></RX.View>
      </RX.ScrollView>
    );
  }
}
