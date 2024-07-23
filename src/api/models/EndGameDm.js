module.exports = {

  // Attributes define the structure of the database table.
  attributes: {

    // 'question' attribute to store the question posed to the user.
    // This is a string and is required, ensuring that every record includes a question.
    question: {
      type: 'string',
      required: true
    },

    // 'options' attribute to store potential choices associated with the question.
    // Stored as a string, it is not required.
    options: {
      type: 'string'
    },

    // 'answer' attribute to store the response selected or given by the user.
    // It is a string and not required.
    answer: {
      type: 'string'
    }
  },

};
