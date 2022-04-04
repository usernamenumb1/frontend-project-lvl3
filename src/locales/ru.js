export default {
  translation: {
    headers: {
      h1: 'RSS агрегатор',
      postsH2: 'Посты',
      feedsH2: 'Фиды',
    },
    paragraphs: {
      leed: 'Начните читать RSS сегодня! Это легко, это красиво.',
      example: 'Пример: https://ru.hexlet.io/lessons.rss',
      feedBack: {
        errorMassages: {
          urlError: 'Ссылка должна быть валидным URL',
          rssRequired: 'You need to provide an rss link',
          notRSS: 'Ресурс не содержит валидный RSS',
          alreadyExists: 'RSS уже существует',
          networkError: 'Ошибка сети',
          noError: null,
        },
        successMassages: {
          loaded: 'RSS успешно загружен',
        },
      },
    },
    submitForm: {
      inputLabel: 'Ссылка RSS',
      button: {
        add: 'Добавить',
      },
    },
    modal: {
      header: '{{header}}',
      paragraph: '{{text}}',
      link: 'Читать полностью',
      closeButton: 'Закрыть',
    },
    button: {
      review: 'Просмотр',
    },
  },
};
