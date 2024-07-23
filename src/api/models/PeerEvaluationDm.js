// api/models/PeerEvaluationDm.js
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
    answer: {
      type: 'string',
      required: true
    }
  }
};
