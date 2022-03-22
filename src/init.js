import * as yup from 'yup';
import whatchState from './view.js';

const schema = yup.string().url();

export default () => {
  const elements = {
    input: document.querySelector('#input-url'),
    form: document.querySelector('form'),
  };
  const state = whatchState({
    urlList: [],
    error: null,
  });
  elements.input.addEventListener('change', (e) => {
    const urlInArray = state.urlList.lastIndexOf(e.target.value) >= 0;
    if (urlInArray) state.error = 'Link already here';
    else state.urlList.push(e.target.value);
  });
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    schema.validate(state.urlList[state.urlList.length - 1])
      .then(() => {
        state.error = null;
      })
      .catch(() => {
        state.error = 'Link must be a valid URL';
        state.urlList.pop();
      });
    console.log(state);
    elements.form.reset();
    elements.input.focus();
  });
};
