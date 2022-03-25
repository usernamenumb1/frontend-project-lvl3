import elements from './elements.js';

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

export default { renderAll, renderFeedBack };
