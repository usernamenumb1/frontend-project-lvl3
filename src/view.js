import onChange from 'on-change';
import elements from './elements';

const render = (state) => {
  const errorFeedback = document.querySelector('.feedback');
  if (state.error) elements.input.classList.add('is-invalid');
  else elements.input.classList.remove('is-invalid');
  errorFeedback.textContent = state.error;
};

export default (state) => onChange(state, (path, value) => {
  console.log(path);
  console.log(value);
  render(state);
});
