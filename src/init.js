import * as yup from 'yup';
import i18next from 'i18next';
import whatchState from './view.js';
import elements from './elements.js';
import resources from './locales/index.js';
import renders from './renders.js';

export default () => {
  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'en',
    debug: true,
    resources,
  })
    .then(() => {
      const schema = yup.string().url('urlError');

      const state = whatchState({
        currentLanguage: 'en',
        urlList: [],
        error: null,
      }, i18n);

      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(elements.submitButton);
        const formData = new FormData(e.target);
        const url = formData.get('url').trim();
        schema.notOneOf(state.urlList, 'alreadyExists').validate(url)
          .then(() => {
            state.urlList.push(url);
            state.error = 'noError';
          })
          .catch((err) => {
            state.error = err.errors;
          });
        console.log(state);
        elements.form.reset();
        elements.input.focus();
      });
      renders.renderAll(state, i18n);
    });
};
