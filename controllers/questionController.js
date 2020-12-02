const db = require("../models");

module.exports = {
  getQuestions: function (req, res) {
    db.Question.find({})
      .then((questions) => res.json(questions))
      .catch((error) => res.status(422).json(error));
  },
};
