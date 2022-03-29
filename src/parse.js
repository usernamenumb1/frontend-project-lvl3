import { uniqueId } from 'lodash';

const buildItem = (item) => ({
  id: uniqueId(),
  title: item.querySelector('title').textContent,
  link: item.querySelector('link').textContent,
  description: item.querySelector('description').textContent,
});

export default (stringRss) => {
  const domParser = new DOMParser();
  const parsedDom = domParser.parseFromString(stringRss, 'application/xml');
  if (parsedDom.querySelector('parsererror')) {
    const error = new Error('notRSS');
    error.message = 'notRSS';
    throw error;
  }
  return {
    feed: {
      feedTitle: parsedDom.querySelector('title').textContent,
      feedDescription: parsedDom.querySelector('description').textContent,
    },
    items: [...parsedDom.querySelectorAll('item')].map(buildItem),
  };
};
