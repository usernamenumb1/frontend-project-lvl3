import onChange from 'on-change';
import renders from './renders.js';

export default (state, i18n) => onChange(state, (path, value) => {
  switch (path) {
    case 'error':
      renders.renderFeedBack(state, i18n);
      break;
    case 'feeds':
      renders.renderFeeds(state, i18n);
      break;
    case 'articles':
      renders.renderPosts(state, i18n);
      break;
    case 'loadingStatus':
      if (value === 'loaded') renders.renderPositiveFeedBack(state, i18n);
      if (value === 'loading') renders.disableForm();
      break;
    case 'currentArticle':
      renders.renderModal(state);
      break;
    case 'readedArticles':
      renders.renderReadedArticles(state);
      break;
    default:
      break;
  }
});
