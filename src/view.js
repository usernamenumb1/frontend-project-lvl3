import onChange from 'on-change';

const render = (state) => {
  const errorFeedback = document.querySelector('.feedback');
  errorFeedback.textContent = state.error;
};

export default (state) => onChange(state, (path, value) => {
  console.log(path);
  console.log(value);
  render(state);
});
