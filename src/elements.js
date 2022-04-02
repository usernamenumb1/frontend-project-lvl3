export default {
  input: document.querySelector('#input-url'),
  inputLabel: document.querySelector('#input-label'),
  form: document.querySelector('form'),
  h1: document.querySelector('h1'),
  feeds: document.querySelector('.feeds'),
  posts: document.querySelector('.posts'),
  paragraphs: {
    leed: document.querySelector('p.leed'),
    example: document.querySelector('p#example'),
    feedBack: document.querySelector('p.feedback'),
  },
  submitButton: document.querySelector('form>div.row>div>button'),
  modal: {
    pane: document.querySelector('div.modal'),
    header: document.querySelector('h5.modal-title'),
    paragraph: document.querySelector('div>div.modal-body>p'),
    link: document.querySelector('div.modal-footer>a'),
    closeButton: document.querySelector('div.modal-footer>button'),
  },
};
