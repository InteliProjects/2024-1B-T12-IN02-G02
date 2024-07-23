module.exports = {

  // Defining the attributes for the EndGameCollaboration model.
  attributes: {

    // 'question' attribute to store the question text.
    // It is a string and is required, ensuring every entry has a question.
    question: {
      type: 'string',
      required: true
    },

    // 'options' attribute to store potential answers or options for the question.
    // It is a string and not required.
    options: {
      type: 'string'
    },

    // 'answer' attribute to store the correct answer or a selected answer to the question.
    // It is a string and not required.
    answer: {
      type: 'string'
    }
  },

};

