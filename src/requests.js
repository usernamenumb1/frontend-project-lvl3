import axios from 'axios';
import parseRSS from './parse.js';
import utils from './utils.js';

const proxedUrl = (url) => {
  const proxy = 'https://allorigins.hexlet.app/get?';
  const proxyUrl = new URL(proxy);
  const params = new URLSearchParams(proxyUrl);
  params.append('disableCache', true);
  params.append('url', url);
  proxyUrl.search = params;
  console.log(proxyUrl.searchParams.get('url'));
  return proxyUrl.href;
};

const feedData = (url) => axios.get(proxedUrl(url))
  .then((response) => parseRSS(response.data.contents));

const refreshFeedData = (url, state) => feedData(url)
  .then((parsedRss) => {
    const updatedArticles = utils.uniquePosts(state.articles, parsedRss.items);
    if (updatedArticles.length >= 1) state.articles = [...updatedArticles, ...state.articles];
  })
  .then(() => setTimeout(() => refreshFeedData(url, state), 5000));

export default {
  proxedUrl,
  feedData,
  refreshFeedData,
};
