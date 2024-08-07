import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import { play } from 'react-native-track-player/lib/src/trackPlayer';

const deviceLanguage = getLocales()[0].languageCode;

export const usedLanguage =
  deviceLanguage === "sk" || deviceLanguage === "cs" ? "sk" : "en";

const nbsp = " "; // Non-breakable space

console.log(`Device language: ${deviceLanguage}`);

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: "v3",
    lng: usedLanguage,
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          menu: {
            articles: "Articles",
            about: "About us",
            recent: "Recent tracks",
          },
          articles: {
            loading: "Loading articles...",
            readMore: `Read${nbsp}more`,
          },
          about: {
            privacyPolicy: "Privacy Policy",
          },
          recentTracks: {
            recent: "Recent tracks",
            loading: "Loading recent tracks...",
            from: "from",
          },
          player: {
            loading: "Loading...",
            loadingNotice: "If it takes long, check your internet connection.",
          },
        },
      },
      sk: {
        translation: {
          menu: {
            articles: "Články",
            about: "O nás",
            recent: "Posledné hrané",
          },
          articles: {
            loading: "Načítavam články...",
            readMore: `Čítať${nbsp}ďalej`,
          },
          about: {
            privacyPolicy: "Ochrana osobných údajov",
          },
          recentTracks: {
            recent: "Posledné hrané",
            loading: "Načítavam zoznam posledných hraných skladieb...",
            from: "od",
          },
          player: {
            loading: "Načítavam...",
            loadingNotice:
              "Ak prebieha načítavanie dlhšie, skontrolujte pripojenie na internet.",
          },
        },
      },
    },
  });

export default i18n;