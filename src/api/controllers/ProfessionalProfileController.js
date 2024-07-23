const collaborationProfiles = {
  Director: {
    briefDescription: 'Every group can benefit from a Director. You’re often seen as the leader and decision maker and one who initiates discussions often (since you’re more than comfortable with voicing your thoughts). Because you’re motivated by tangible results and hitting milestones on time and on budget, you have a natural gift for taking charge and seeing responsibilities through.',
    strengths: [
      'Establishing order at the start of a project or during times of uncertainty',
      'Ability to be influential and motivating',
      'Delineating team roles and responsibilities and helping to structure the team’s tasks'
    ],
    environments: [
      'Fast-paced/agile (work happens quickly and continuously with minimal interruption in between)',
      'Structured (work is well-documented and scheduled)',
      'Efficient (team is able to do more in less time)'
    ],
    watchOutFor: [
      'Overshadowing your peers with speaking on behalf or over others',
      'Dominating a conversation',
      'Having requests come across as demanding'
    ]
  },
  Conformist: {
    briefDescription: 'You are a person, who likes to follow the rules and accepted procedures to avoid inner and outer conflict. You probably tend to be quite cooperative working within your immediate team, but you seem to be less cooperative in the bigger team environment. Because of the conflict avoidance feature, you don’t really like to receive feedback from your colleagues, try to avoid negativity and might have troubles expressing your disagreement openly.',
    strengths: [
      'Reliability in the matter of things running smoothly and according to plan',
      'Easily accept and agree on ideas suggested by others, no confrontation.',
      'Good in ‘getting things done’'
    ],
    environments: [
      'Small groups of people, who you already trust',
      'Stable and predictable(project with measurable outcome and steady progression)'
    ],
    watchOutFor: [
      'Problems with being flexible',
      'Dependence on the opinion of others',
      'Holding on and suppressing your disagreement'
    ]
  },
  Harmonizer: {
    briefDescription: 'You’re the people-person and the glue that keeps everyone together. You’re known for building great relationships and facilitating team interactions with grace and humility. Because you’re motivated by genuine cooperation, you go the extra mile to ensure everyone’s opinions are heard. You’re always available as a supportive resource for those who need an extra bit of help.',
    strengths: [
      'Ability to resolve conflict with patience and understanding',
      'Regularly encourages and motivates others to achieve their potential',
      'High emotional intelligence to tap into what others are feeling even when they’re not outwardly expressed'
    ],
    environments: [
      'Calm (space where deliberation can happen)',
      'Harmonious (team members demonstrate trust and respect through words and actions)',
      'Friendly (relationships with teammates don’t have to stop with work)'
    ],
    watchOutFor: [
      'Reluctance to say what’s on your mind at the risk of offending others',
      'Being overly accommodating to others’ needs and wants',
      'Being overly cautious of change and settling for status quo'
    ]
  },
  Initiator: {
    briefDescription: 'You bring variety to the table and can easily see the bigger picture in whatever you do. Others know you for often coming up with great ideas and opening up the discussion so everyone can explore new territory together. Because you’re motivated by novelty and new inventions, you’re no stranger to thinking outside the box by constantly seeking external means for inspiration or creativity.',
    strengths: [
      'Being a champion of change and making regular suggestions for team improvements',
      'Contributes thought provoking discussion by offering fresh perspectives regularly',
      'Limits groupthink by playing devil’s advocate to agreeable ideas'
    ],
    environments: [
      'Stimulating (positive encouragement to think differently)',
      'Freedom of expression (everyone can express themselves without judgement)',
      'Positive and creative (failures are seen as opportunities for learning)'
    ],
    watchOutFor: [
      'Acting impulsively, such as by blurting out unfinished ideas during meetings or interrupting discussion',
      'Being disorganized when it comes to prioritizing tasks or hitting deadlines',
      'Putting things on the back burner for too long (you might pick up tasks easily, but make sure to follow through!)'
    ]
  },
  Analyst: {
    briefDescription: 'You love to dive into a complex problem and pull it apart in every way until the answer’s found. You’re known for being extremely analytical and prefer to deal with work linearly, in sequential order—finishing one thing before starting another. Because you’re motivated by data and the accuracy of it, you are very process-oriented and prefer to take time to reflect on new ideas and thoughts.',
    strengths: [
      'Brings forth research driven information to better inform the team’s decision',
      'Meticulous for getting down to the hard facts of a situation, rather than rely on guesswork or assumptions',
      'Observant of details that others may overlook'
    ],
    environments: [
      'Autonomous (plenty of downtime to focus independently)',
      'Routine (meetings that happen the same day every week, tasks are made into habits, etc.)',
      'Quiet (ability to focus and hear one’s thoughts easier)'
    ],
    watchOutFor: [
      'Overanalyzing a situation and losing time because of it; difficulty getting into action (analysis paralysis!)',
      'Being overcritical of yourself, but also of others’ words and actions (especially if they fall out of your domain)',
      'Fearful of being wrong and ignoring any criticism as a result'
    ]
  }
};

module.exports = {
  feedbackPreGameCollaboration: async function (req, res) {
    try {
      const userId = req.session.userId;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const existingUser = await User.findOne({ id: userId });
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Fetch the previously saved questions
      const preGameCollaboration = await PreGameCollaboration.findOne({ userId });
      if (!preGameCollaboration) {
        return res.status(404).json({ error: 'No collaboration data found for user' });
      }

      const responses = [
        preGameCollaboration.question1,
        preGameCollaboration.question2,
        preGameCollaboration.question3,
        preGameCollaboration.question4,
        preGameCollaboration.question5,
        preGameCollaboration.question6
      ];

      // Count the occurrences of each response
      const responseCount = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0
      };

      responses.forEach(response => {
        if (responseCount[response] !== undefined) {
          responseCount[response]++;
        }
      });


      // Find the maximum value in responseCount
      const maxCount = Math.max(...Object.values(responseCount));

      // Filter keys with maxCount and apply priority
      const priority = ['A', 'D', 'C', 'E', 'B']; // Priority order
      const maxResponses = priority.filter(key => responseCount[key] === maxCount);

      // Use the first occurrence in the priority array that matches the maxCount
      const maxResponse = maxResponses[0];

      // Map response to profile
      const profileMap = {
        A: 'Director',
        B: 'Conformist',
        C: 'Harmonizer',
        D: 'Initiator',
        E: 'Analyst'
      };

      const profile = profileMap[maxResponse];
      const feedback = collaborationProfiles[profile];

      console.log('chegou ate a parte de salvar o profile do usuario');
      // Save feedback to the database
      await PreGameCollaboration.updateOne({ userId }).set({ profile });

      // Redirect to the feedback page
      return res.redirect('/assessment/self-assessment-confirmation');

    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while processing the feedback' });
    }
  },


/**
 * This controller method handles fetching and displaying collaboration feedback for a user.
 */
showFeedback: async function (req, res) {
  try {
    // Retrieves the user ID from the session
    const userId = req.session.userId;

    // Redirects to the login page if no user ID is found in the session
    if (!userId) {
      return res.redirect('/login');
    }

    // Fetches the user's collaboration data from the database
    const preGameCollaboration = await PreGameCollaboration.findOne({ userId });

    // Returns a 404 status with an error message if no collaboration data is found
    if (!preGameCollaboration) {
      return res.status(404).json({ error: 'No collaboration data found for user' });
    }

    // Retrieves the collaboration profile and feedback data
    const profile = preGameCollaboration.profile;
    const feedback = collaborationProfiles[profile];

    // Renders the collaboration style page with the profile and feedback data
    return res.view('pages/collaboration-style', { profile, feedback });
  } catch (error) {
    // Handles any exceptions by logging an error message and returning a server error status
    return res.status(500).json({ error: 'An error occurred while processing the request' });
  }
},

/**
 * This controller method handles displaying a graph of collaboration assessments for a user.
 */
graphCollaboration: async function (req, res) {
  try {
    // Retrieves the user ID from the session
    const userId = req.session.user.id;

    // Fetches the user's collaboration assessment data
    const selfAssessmentCollaboration = await PreGameCollaboration.findOne({ userId: userId });

      console.log('selfAssessmentCollaboration', selfAssessmentCollaboration);

      const profile = selfAssessmentCollaboration.profile;

    // Collects answers from the assessment
    const answers = [
      selfAssessmentCollaboration.question1,
      selfAssessmentCollaboration.question2,
      selfAssessmentCollaboration.question3,
      selfAssessmentCollaboration.question4,
      selfAssessmentCollaboration.question5,
      selfAssessmentCollaboration.question6
    ];

    // Logs the first question for debugging

    // Initializes a score object to count responses for different profiles
    const score = {
      A: 0, //Director
      B: 0, //Conformist
      C: 0, //Harmonizer
      D: 0, //Initiator
      E: 0 //Analyst
    };

      answers.forEach(answer => {
        if(score[answer] !== undefined){
          score[answer] ++;
        }
      });

      if(profile === 'Director') {score.A += 2;}
      if(profile === 'Conformist') {score.B += 2;}
      if(profile === 'Harmonizer') {score.C += 2;}
      if(profile === 'Initiator') {score.D += 2;}
      if(profile === 'Analyst') {score.E += 2;}



    // Logs the final scores for debugging

    // Returns the scores as JSON
    return res.json(score);

  } catch(error) {
    // Handles any exceptions by returning a server error status
    return res.status(500).json({error: 'Erro'});
  }
},

  graphDecisionMaking: async function (req, res) {
    console.log('graphDecisionMaking');
    try {
      const userId = req.session.user.id;
      const selfAssessmentDecisionMaking = await PreGameDm.findOne({userId: userId});
      const profileDM = selfAssessmentDecisionMaking.profileDM;
      console.log('selfAssessmentDecisionMaking', selfAssessmentDecisionMaking);

    // Initializes a score object to count responses for different decision-making styles
    const score = {
      Conceptual: 0,
      Directive: 0,
      Analytical: 0,
      Behavioral: 0
    };

      if (selfAssessmentDecisionMaking.question1 === 'B') {score.Conceptual++;}
      if (selfAssessmentDecisionMaking.question1 === 'A') {score.Directive++;}
      if (selfAssessmentDecisionMaking.question2 === 'B') {score.Behavioral++;}
      if (selfAssessmentDecisionMaking.question2 === 'A') {score.Analytical++;}
      if (selfAssessmentDecisionMaking.question3 === 'B') {score.Analytical++;}
      if (selfAssessmentDecisionMaking.question3 === 'A') {score.Directive++;}
      if (selfAssessmentDecisionMaking.question4 === 'B') {score.Conceptual++;}
      if (selfAssessmentDecisionMaking.question4 === 'A') {score.Analytical++;}
      if (selfAssessmentDecisionMaking.question5 === 'A') {score.Behavioral++;}
      if (selfAssessmentDecisionMaking.question5 === 'B') {score.Directive++;}
      if (selfAssessmentDecisionMaking.question6 === 'B') {score.Behavioral++;}
      if (selfAssessmentDecisionMaking.question6 === 'A') {score.Behavioral++;}
      if (profileDM in score) {score[profileDM]+= 3;}

    // Logs the final scores for debugging

    // Returns the scores as JSON
    return res.json(score);

  } catch (error) {
    // Handles any exceptions by returning a server error status
    return res.status(500).json({error});
  }
}
};
