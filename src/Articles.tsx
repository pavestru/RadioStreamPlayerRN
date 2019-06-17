import React from "react";
import RX from "reactxp";
import * as cheerio from "cheerio";
import { articlesUrl } from "./radio.config.json";

const _styles = {
  main: RX.Styles.createViewStyle({
    padding: 20,
    marginTop: 10
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
  async componentDidMount() {
    const res = await fetch(articlesUrl);
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
    this.setState(state => ({
      ...state,
      articles: [...state.articles, ...articles]
    }));
  }
  render() {
    return (
      <RX.View style={_styles.main}>
        {this.state.articles.map(({ title, text, href }: Article) => (
          <RX.View key={href} style={_styles.listItem}>
            <RX.View>
              <RX.Text style={_styles.title}>{title}</RX.Text>
              <RX.Text style={_styles.text}>{text}</RX.Text>
            </RX.View>
          </RX.View>
        ))}
      </RX.View>
    );
  }
}
