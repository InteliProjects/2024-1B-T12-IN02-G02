// api/controllers/PreGameDmController.js

const decisionMakingProfiles = {
  Directive: {
    briefDescription: 'Directive style decision making describes people who prefer structure and are motivated by the results their decisions will bring them.If you are a directive style decision maker, you likely make decisions quickly and have a \'decide and move forward\' mentality. You don\'t like dwelling in possibility and prefer to take action. To help you make decisions quickly, you tend to rely on case studies and rules to tell you how to move forward. You think that \'reinventing the wheel\' is a waste of time and that applies to your personal decisions as well.',
    strengths: [
      'One of your dominant strengths is your communication skills.',
      'You convey confidence, purpose and a sense of concreteness in your decisions that others admire',
      'support and trust for the choices you make'
    ],
    weaknesses: [
      'Directive style decision-makers tend to struggle with receiving advice',
      'Struggle responding to differing opinions',
      'Struggle creating a plan in new or uncertain situations'
    ]
  },
  Conceptual: {
    briefDescription: 'Conceptual style decision making describes people who enjoy the ambiguity of open-ended options and are motivated to make an impact on the world. If you are a conceptual style decision maker, you likely day-dream often and quickly come up with creative ideas when needed. You see how most things connect and affect each other. You desire to come up with holistic solutions. Your comfort in ambiguity helps you to think bigger, and feel more hopeful that your ideas will work out, than people with other decision-making styles.',
    strengths: [
      'Recognizing underlying problems and coming up with creative, integrated options to pursue.',
    ],
    weaknesses : [
      'Tend to be taking action on a decision, adequately planning for what a choice will involve and follow-through.',
    ]
  },
  Behavioral: {
    briefDescription: 'Behavioral style decision making describes people who prefer structure and stability and are motivated to maintain harmony. If you are a behavioral style decision maker, your relationships are probably the most important thing in your life. You are likely to put the needs and opinions of family, friends, and colleagues above your own. It may seem difficult to balance the desire for structure and other people\'s thoughts and feelings, but behavioral style decision-makers accomplish this by seeking input and gauging reactions from people in the decision-making process. They use the information they gather to come up with solutions that they believe others will respond well to and typically ask for advice before moving forward with a decision.',
    strengths: [
      'Ability to make others feel included and important',
      'Getting buy-in from others ',
      'Communicating their decisions.'
    ],
    weaknesses: [
      'Not trusting themselves and difficulty dealing with conflict',
      'May easily lose themselves in the advice and opinions of others',
      'Conflict is challenging for them to manage. To avoid it, they sometimes take on unnecessary amounts of responsibility and stress. '
    ]
  },
  Analytical: {
    briefDescription: 'Analytical style decision making describes people who feel comfortable with ambiguity but are motivated to find the best or most comprehensive solution. If you are an analytical style decision maker, you likely take a long time to process big life decisions. Your comfort with ambiguity doesn\'t mean that you are a risk-taker or would be likely to decide without knowing how it would work out. That would stress you out a lot! Instead, your comfort with ambiguity means that you enjoy considering all options before making a decision. You think of creative solutions and are willing to give most prospects a chance. However, you only like to move forward once you are as close to certain as possible that that choice is best.',
    strengths: [
      'Responsible decisions',
    ],
    weaknesses: [
      'Making timely decisions',
      'Communicating with others',
      'Managing stress during the decision-making period.)'
    ]
  },
};

module.exports = {
  create: async function (req, res) {
    try {
      const userId = req.session.userId;
      const { question1, question2, question3, question4, question5, question6 } = req.body;

      if (!userId || !question1 || !question2 || !question3 || !question4 || !question5 || !question6) {
        console.log('All fields are required');
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Calculate the AMBIGUITY/STRUCTURE score
      const calculateAmbiguityStructureScore = (answers) => {
        return answers.reduce((score, answer) => {
          if (answer === 'A') {
            return score - 1;
          } else if (answer === 'B') {
            return score + 1;
          } else {
            return score;
          }
        }, 0);
      };

      const ambiguityStructureScore = calculateAmbiguityStructureScore([question1, question2, question3, question4, question5]);

      // Determine vertical matrix
      let verticalMatrix = 'structure';
      if (ambiguityStructureScore > 0) {
        verticalMatrix = 'ambiguity';
      }

      // Determine horizontal matrix
      const score = calculateAmbiguityStructureScore([question6]);
      let horizontalMatrix = 'peopleSocial';
      if (score > 0) {
        horizontalMatrix = 'taskTechnical';
      }

      // Determine profile
      let profile = 'teste'; // Default value
      if (verticalMatrix === 'ambiguity' && horizontalMatrix === 'taskTechnical') {
        profile = 'Analytical';
      } else if (verticalMatrix === 'ambiguity' && horizontalMatrix === 'peopleSocial') {
        profile = 'Conceptual';
      } else if (verticalMatrix === 'structure' && horizontalMatrix === 'taskTechnical') {
        profile = 'Directive';
      } else if (verticalMatrix === 'structure' && horizontalMatrix === 'peopleSocial') {
        profile = 'Behavioral';
      }

      // Create a new PreGameDm entry
      const newPreGameDm = await PreGameDm.create({
        userId,
        question1,
        question2,
        question3,
        question4,
        question5,
        question6,
        profileDM: profile
      }).fetch();


      // Redirects the user to the feedback pre-game collaboration page
      return res.redirect('/feedbackPreGameCollaboration');

    } catch (error) {
      // Logs an error if there is an issue creating the PreGameDm entry
      console.error('An error occurred while creating the PreGameDm entry:', error);
      // Returns a 500 Internal Server Error status with a JSON error message
      return res.status(500).json({ error: 'An error occurred while creating the PreGameDm entry' });
    }
  },

  // Controller action to display feedback for the user's decision-making profile
  showFeedback: async function (req, res) {
    try {
      // Retrieves the user ID from the session
      const userId = req.session.userId;

      // Redirects to the login page if no user ID is found in the session
      if (!userId) {
        return res.redirect('/login');
      }

      // Fetches decision making data for the user
      const preGameDm = await PreGameDm.findOne({ userId });

      // Returns a 404 Not Found status with a JSON error message if no decision making data is found
      if (!preGameDm) {
        return res.status(404).json({ error: 'No decision making data found for user' });
      }

      // Retrieves the user's decision making profile and the associated feedback
      const profile = preGameDm.profileDM;
      const feedback = decisionMakingProfiles[profile];

      // Renders a view with the user's decision making profile and feedback
      return res.view('pages/decision-making-style', { profile, feedback });
    } catch (error) {
      // Returns a 500 Internal Server Error status with a JSON error message if there is an error processing the request
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  }
};

