const uniquePosts = (collOld, collNew) => collNew
  .filter((itemNew) => !collOld.some((itemOld) => itemNew.title === itemOld.title));

const updateState = (parsedRss, state, url) => {
  state.urlList.push(url);
  state.error = 'noError';
  state.feeds = [parsedRss.feed, ...state.feeds];
  state.articles = [...parsedRss.items, ...state.articles];
  state.loadingStatus = 'loaded';
};

export default { uniquePosts, updateState };
