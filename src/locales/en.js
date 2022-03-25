export default {
  translation: {
    headers: {
      h1: 'RSS agregator',
    },
    paragraphs: {
      leed: 'Let`s start read RSS nice and easy!',
      example: 'Example: https://ru.hexlet.io/lessons.rss',
      feedBack: {
        errorMassages: {
          urlError: 'Link must be a valid URL',
          rssRequired: 'You need to provide an rss link',
          notRSS: 'The resource does not contain valid RSS',
          alreadyExists: 'RSS already exists',
          networkError: 'Network error!',
          noError: null,
        },
        successMassages: {
          added: 'RSS successfully loaded!',
        },
      },
    },
    submitForm: {
      inputLabel: 'RSS link',
      button: {
        add: 'Add',
      },
    },
  },
};
