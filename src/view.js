import onChange from 'on-change';
import renders from './renders.js';

export default (state, i18n) => onChange(state, (path, value) => {
  console.log(value);
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
      break;
    default:
      break;
  }
});
