import elements from './elements.js';

const createCard = (colType, listContent) => {
  const cardDiv = document.createElement('div');
  const cardBodyDiv = document.createElement('div');
  const header = document.createElement('h2');
  const ul = document.createElement('ul');
  cardDiv.classList.add('card', 'border-0');
  cardBodyDiv.classList.add('card-body');
  header.classList.add('card-title', 'h4');
  header.textContent = colType;
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  ul.innerHTML = listContent;
  cardBodyDiv.append(header);
  cardDiv.append(cardBodyDiv);
  cardDiv.append(ul);
  return cardDiv;
};

const renderAll = (state, i18n) => {
  elements.h1.textContent = i18n.t('headers.h1');
  elements.paragraphs.leed.textContent = i18n.t('paragraphs.leed');
  elements.inputLabel.textContent = i18n.t('submitForm.inputLabel');
  elements.submitButton.textContent = i18n.t('submitForm.button.add');
  elements.paragraphs.example.textContent = i18n.t('paragraphs.example');
  elements.paragraphs.feedBack.textContent = state.error;
};

const renderFeedBack = (state, i18n) => {
  if (state.error !== 'noError') elements.input.classList.add('is-invalid');
  else elements.input.classList.remove('is-invalid');
  elements.paragraphs.feedBack.textContent = i18n.t(`paragraphs.feedBack.errorMassages.${state.error}`);
};

const renderPositiveFeedBack = (state, i18n) => {
  elements.paragraphs.feedBack.classList.replace('text-danger', 'text-success');
  elements.paragraphs.feedBack.textContent = i18n.t(`paragraphs.feedBack.successMassages.${state.loadingStatus}`);
  setTimeout(() => {
    elements.paragraphs.feedBack.textContent = null;
    elements.paragraphs.feedBack.classList.replace('text-success', 'text-danger');
  }, 5000);
};

const renderPosts = (state, i18n) => {
  const postList = state.articles.map((item) => `<li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
  <a href="${item.link}" class="fw-dold" data-id="${item.id}" target="_blank" rel="noopener noreferrer">${item.title}</a>
  <button type="button" class="btn btn-outline-primary btn-sm" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#modal">${i18n.t('button.review')}</button>
  </li>`).join('\n');
  const postCard = createCard(i18n.t('headers.postsH2'), postList);
  elements.posts.innerHTML = null;
  elements.posts.append(postCard);
};

const renderFeeds = (state, i18n) => {
  const feedList = state.feeds.map((item) => `<li class="list-group-item border-0 border-end-0">
  <h3 class="h6 m-0">${item.feedTitle}</h3>
  <p class="m-0 small text-black-50">${item.feedDescription}</p>
  </li>`).join('\n');
  const feedCard = createCard(i18n.t('headers.feedsH2'), feedList);
  elements.feeds.innerHTML = null;
  elements.feeds.append(feedCard);
};

export default {
  renderAll,
  renderFeedBack,
  renderPositiveFeedBack,
  renderFeeds,
  renderPosts,
};
