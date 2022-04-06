// import elements from './elements.js';

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
  document.querySelector('h1').textContent = i18n.t('headers.h1');
  document.querySelector('p.leed').textContent = i18n.t('paragraphs.leed');
  document.querySelector('#input-label').textContent = i18n.t('submitForm.inputLabel');
  document.querySelector('form>div.row>div>button').textContent = i18n.t('submitForm.button.add');
  document.querySelector('p#example').textContent = i18n.t('paragraphs.example');
  document.querySelector('div.modal-footer>a').textContent = i18n.t('modal.link');
  document.querySelector('div.modal-footer>button').textContent = i18n.t('modal.closeButton');
  document.querySelector('p.feedback').textContent = state.error;
};

const renderFeedBack = (state, i18n) => {
  document.querySelector('p.feedback').classList.replace('text-success', 'text-danger');
  if (state.error !== 'noError') document.querySelector('#input-url').classList.add('is-invalid');
  else document.querySelector('#input-url').classList.remove('is-invalid');
  document.querySelector('p.feedback').textContent = i18n.t(`paragraphs.feedBack.errorMassages.${state.error}`);
};

const disableForm = () => {
  document.querySelector('#input-url').setAttribute('readonly', true);
  document.querySelector('form>div.row>div>button').setAttribute('disabled', true);
};

const renderPositiveFeedBack = (state, i18n) => {
  document.querySelector('#input-url').removeAttribute('readonly');
  document.querySelector('form>div.row>div>button').removeAttribute('disabled');
  document.querySelector('p.feedback').classList.replace('text-danger', 'text-success');
  document.querySelector('p.feedback').textContent = i18n.t(`paragraphs.feedBack.successMassages.${state.loadingStatus}`);
  // setTimeout(() => {
  //   elements.paragraphs.feedBack.textContent = null;
  //   elements.paragraphs.feedBack.classList.replace('text-success', 'text-danger');
  // }, 5000);
};

const renderPosts = (state, i18n) => {
  const postList = state.articles.map((item) => `<li id="post" class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
  <a href="${item.link}" class="fw-bold" data-id="${item.id}" target="_blank" rel="noopener noreferrer">${item.title}</a>
  <button type="button" class="btn btn-outline-primary btn-sm" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#modal">${i18n.t('button.review')}</button>
  </li>`).join('\n');
  const postCard = createCard(i18n.t('headers.postsH2'), postList);
  document.querySelector('.posts').innerHTML = null;
  document.querySelector('.posts').append(postCard);
};

const renderFeeds = (state, i18n) => {
  const feedList = state.feeds.map((item) => `<li class="list-group-item border-0 border-end-0">
  <h3 class="h6 m-0">${item.feedTitle}</h3>
  <p class="m-0 small text-black-50">${item.feedDescription}</p>
  </li>`).join('\n');
  const feedCard = createCard(i18n.t('headers.feedsH2'), feedList);
  document.querySelector('.feeds').innerHTML = null;
  document.querySelector('.feeds').append(feedCard);
};

const renderModal = (state) => {
  document.querySelector('h5.modal-title').textContent = state.currentArticle.title;
  document.querySelector('div>div.modal-body>p').textContent = state.currentArticle.description;
  document.querySelector('div.modal-footer>a').setAttribute('href', state.currentArticle.link);
};

const renderReadedArticles = (state) => {
  state.readedArticles.forEach((article) => article.classList.replace('fw-bold', 'fw-normal'));
};

export default {
  renderAll,
  renderFeedBack,
  renderPositiveFeedBack,
  renderFeeds,
  renderPosts,
  renderModal,
  renderReadedArticles,
  disableForm,
};
