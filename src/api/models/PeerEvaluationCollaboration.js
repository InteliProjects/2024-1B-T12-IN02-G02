// api/models/PeerEvaluationCollaboration.js
module.exports = {
  attributes: {
    from_id_user: { 
      type: 'number',
      required: true
    },
    to_id_user: {
      type: 'number',
      required: true
    },
    round: {
      type: 'number',
      required: true
    },
    type: {
      type: 'string',
      required: true
    },
    answer: {
      type: 'number',
      required: true
    }
  }
};
