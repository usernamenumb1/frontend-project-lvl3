import * as yup from 'yup';
import i18next from 'i18next';
import whatchState from './view.js';
// import elements from './elements.js';
import resources from './locales/index.js';
import renders from './renders.js';
import get from './requests.js';
import utils from './utils.js';
// http://lorem-rss.herokuapp.com/feed?unit=second&interval=30
// http://lorem-rss.herokuapp.com/feed?unit=second&interval=15

export default () => {
  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: true,
    resources,
  })
    .then(() => {
      const schema = yup.string().url('urlError');

      const state = whatchState({
        currentLanguage: 'ru',
        currentURL: '',
        urlList: [],
        error: null,
        loadingStatus: 'filling',
        feeds: [],
        articles: [],
        currentArticle: null,
        readedArticles: [],
      }, i18n);

      // const elements = {
      //   input: document.querySelector('#input-url'),
      //   inputLabel: document.querySelector('#input-label'),
      //   form: document.querySelector('form'),
      //   h1: document.querySelector('h1'),
      //   feeds: document.querySelector('.feeds'),
      //   posts: document.querySelector('.posts'),
      //   paragraphs: {
      //     leed: document.querySelector('p.leed'),
      //     example: document.querySelector('p#example'),
      //     feedBack: document.querySelector('p.feedback'),
      //   },
      //   submitButton: document.querySelector('form>div.row>div>button'),
      //   modal: {
      //     pane: document.querySelector('div.modal'),
      //     header: document.querySelector('h5.modal-title'),
      //     paragraph: document.querySelector('div>div.modal-body>p'),
      //     link: document.querySelector('div.modal-footer>a'),
      //     closeButton: document.querySelector('div.modal-footer>button'),
      //   },
      // };
      const form = document.querySelector('form');
      const input = document.querySelector('#input-url');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const url = formData.get('url').trim();
        schema.notOneOf(state.urlList, 'alreadyExists').validate(url)
          .then(() => get.feedData(url))
          .then((parsedRss) => utils.updateState(parsedRss, state, url))
          .then(() => get.refreshFeedData(url, state))
          .catch((err) => {
            switch (err.message) {
              case 'Network Error':
                state.error = 'networkError';
                break;
              default:
                state.error = err.message;
            }
          });
        state.loadingStatus = 'filling';
        form.reset();
        input.focus();
      });
      const posts = document.querySelector('.posts');
      posts.addEventListener('click', (e) => {
        if (e.target.type) {
          const targetId = e.target.dataset.id;
          const link = document.querySelector(`a[data-id='${targetId}']`);
          const [modalData] = state.articles.filter((post) => post.id === targetId);
          state.readedArticles.push(link);
          state.currentArticle = modalData;
        }
      });
      renders.renderAll(state, i18n);
    });
};
