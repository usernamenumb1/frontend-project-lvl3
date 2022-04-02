export default {
  translation: {
    headers: {
      h1: 'RSS agregator',
      postsH2: 'Posts',
      feedsH2: 'Feeds',
    },
    paragraphs: {
      leed: 'Let`s start read RSS nice and easy!',
      example: 'Example: http://feeds.bbci.co.uk/news/world/rss.xml',
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
          loaded: 'RSS successfully loaded!',
        },
      },
    },
    submitForm: {
      inputLabel: 'RSS link',
      button: {
        add: 'Add',
      },
    },
    modal: {
      header: '{{header}}',
      paragraph: '{{text}}',
      link: 'Read full',
      closeButton: 'Close',
    },
    button: {
      review: 'Review',
    },
  },
};
