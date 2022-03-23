import * as yup from 'yup';
import whatchState from './view.js';
import elements from './elements.js';

const schema = yup.string().url();

export default () => {
  const state = whatchState({
    urlList: [],
    error: null,
  });
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(elements.submitButton);
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();
    if (state.urlList.includes(url)) {
      state.error = 'RSS already exists';
      return;
    }
    state.urlList.push(url);
    schema.validate(state.urlList[state.urlList.length - 1])
      .then(() => {
        state.error = null;
      })
      .catch(() => {
        state.error = 'Link must be a valid URL';
        state.urlList.pop();
      });
    elements.form.reset();
    elements.input.focus();
  });
};
