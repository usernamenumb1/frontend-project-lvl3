import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import whatchState from './view.js';
import elements from './elements.js';
import resources from './locales/index.js';
import renders from './renders.js';
import parseRSS from './parse.js';

// const parsedRSS = (stringRss) => {
//   const domParser = new DOMParser();
//   const parsedDom = domParser.parseFromString(stringRss, 'application/xml');
//   // return parsedDom.querySelector('title');
//   return parsedDom;
// };

const getProxyUrl = (url) => {
  const proxy = 'https://allorigins.hexlet.app/get?';
  const proxyUrl = new URL(proxy);
  const params = new URLSearchParams(proxyUrl);
  params.append('disableCache', true);
  params.append('url', url);
  proxyUrl.search = params;
  return proxyUrl.href;
};

export default () => {
  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'en',
    debug: true,
    resources,
  })
    .then(() => {
      const schema = yup.string().url('urlError');

      const state = whatchState({
        currentLanguage: 'en',
        urlList: [],
        error: null,
        loadingStatus: 'filling',
        feeds: [],
        articles: [],
      }, i18n);

      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const url = formData.get('url').trim();
        schema.notOneOf(state.urlList, 'alreadyExists').validate(url)
          .then(() => {
            state.urlList.push(url);
            state.error = 'noError';
          })
          .then(() => {
            const proxyUrl = getProxyUrl(url);
            axios.get(proxyUrl).then((response) => parseRSS(response.data.contents))
              .then((parsedRss) => {
                state.feeds = [parsedRss.feed, ...state.feeds];
                state.articles = [...parsedRss.items, ...state.articles];
                state.loadingStatus = 'loaded';
              })
              .catch((err) => {
                switch (err.message) {
                  case 'Network Error':
                    state.error = 'networkError';
                    break;
                  default:
                    state.error = err.message;
                }
              });
          })
          .catch((err) => {
            state.error = err.errors;
          });
        console.log(state);
        elements.form.reset();
        elements.input.focus();
      });
      renders.renderAll(state, i18n);
    });
};
